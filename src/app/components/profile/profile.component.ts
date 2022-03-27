import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ContentInterface } from 'src/app/classes/content';
import {AppService} from 'src/app/services/app-service.service';
import {ItemService} from 'src/app/services/item-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import {UploadService} from 'src/app/services/upload-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SwPush } from '@angular/service-worker';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditComponent } from '../edit/edit.component';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  item: Item
  mediaArray: any[];
  greeting = {};
  id= sessionStorage.getItem('id');
  images: ContentInterface;
  readonly VAPID_PUBLIC_KEY = 'BI1hXbInwBYDsij14G5aCAXxn4IxcuI4jeOrUFTFIfVfVr6TCgvOCSgjLyuh1Who00G4QsdggDkOTGiF2VM1I1s';


  constructor(public dialog: MatDialog, private userService: UserServiceService, private app: AppService, private http: HttpClient, private itemS: ItemService, private upload: UploadService, public domSanitizationService: DomSanitizer,   private swPush: SwPush,
    private notifications: NotificationsService) { 
    http.get('api/v1/token').subscribe(data => {
      const token = data['token'];
      }, () => {});
  }

  editProfile():void{
    const dialogRef = this.dialog.open(
      EditComponent,{
        panelClass: 'my-outlined-dialog',
        width: '500px',
        height: '500px',
      });
  }

  openDialog():void{
    this.item = new Item()
    this.item.images = new ContentInterface
    
    const dialogRef = this.dialog.open(
      ItemComponent,{
        width: '500px',
        height: '500px',
                data:{color: this.item.color, size: this.item.size, material: this.item.material, condition: this.item.clothingCondition, posts: this.item.formData, description: this.item.description},
      });
      dialogRef.afterClosed().subscribe(result => {

        this.item.color=result.color
        this.item.size=result.size
        console.log(result.condition)
        this.item.clothingCondition = result.condition
        this.item.material=result.material
        this.item.formData = result.posts
        this.item.description = result.description
        if(result){
          this.upload.uploadFile(this.item.formData)
          .subscribe(data => 
             {
              this.item.images = data
              this.itemS.createPost(this.item, this.id)
              .subscribe(
              data => console.log(data), 
              error => console.log(error))
            })
           
          }

      });
  }

  display(){
    this.userService.getPosts(this.id).subscribe(
      data=>{
        this.mediaArray= new Array()
        console.log(data)
        for(let x in data){
          this.images = new ContentInterface
          
          this.images.fileName=data[x].fileName;
          this.images.fileType=data[x].fileType;
          this.images.data= this.domSanitizationService.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ data[x].data);
          // this.images.data= 'data:image/jpeg;base64,'+ data[x].data;
          this.mediaArray.push(this.images)
          console.log(this.images.data)
        }
     } ,
      error => { 
        console.log("exception occured");
    })
  }
  subscribeToNotifications=() => {
    if(this.swPush.isEnabled){
    
    this.swPush.requestSubscription({
        serverPublicKey: this.VAPID_PUBLIC_KEY
    })
    .then(sub => this.notifications.addPushSubscriber(sub, this.id).subscribe())
    .catch(err => console.error("Could not subscribe to notifications", err));
    }
  }
  authenticated() { return this.app.authenticated; }

  ngOnInit(): void {
    this.subscribeToNotifications();
    this.display()
  }

}
