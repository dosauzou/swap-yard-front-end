import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ContentInterface } from 'src/app/classes/content';
import { AppService } from 'src/app/services/app-service.service';
import { ItemService } from 'src/app/services/item-service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { UploadService } from 'src/app/services/upload-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { NotificationsService } from 'src/app/services/notifications.service';
import { SwPush } from '@angular/service-worker';
import { EditProfileComponent } from '../edit-profile/edit-profile.component';
import { EditComponent } from '../edit/edit.component';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { User } from 'src/app/classes/user';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss'],

})
export class ProfileComponent implements OnInit {
  item: Item
  mediaArray: any[];
  greeting = {};
  id = sessionStorage.getItem('id');
  images: ContentInterface;
  VAPID_PUBLIC_KEY: string = process.env.publicVapidKey!;
  itemArray: any[] = new Array();
  itemtozoom: Item;
  closeResult: string;
  user: any =new User();
  totalSwaps: any;
  loaded: boolean = false;
  // readonly VAPID_PUBLIC_KEY = 'BB_WkKNOcmJQSAub5Q_A_Cg3e4_qSSgkwZ6IouAitsX59ulO6DdE3s8Ihaz2lk9WCoPuwnDMYkOEF1HVpW0yZuM';

  constructor(public sanitizer: DomSanitizer, public dialog: MatDialog, private userService: UserServiceService, private app: AppService, private http: HttpClient, private itemS: ItemService, private upload: UploadService, public domSanitizationService: DomSanitizer, private swPush: SwPush,
    private notifications: NotificationsService, private modalService: NgbModal, private items: ItemService, private spinner: NgxSpinnerService) {
     

    http.get('api/v1/token').subscribe(data => {
      const token = data['token'];
    }, () => { });
  }

  //overlay item if swapped
  //swaps to date 

  editProfile(): void {
    console.log(this.VAPID_PUBLIC_KEY)
    const dialogRef = this.dialog.open(
      EditProfileComponent, {
      // panelClass: 'my-outlined-dialog',
      width: '500px',
      height: '500px',
      panelClass: 'custom-modalbox',
      data: {user: this.user},

    });
    dialogRef.afterClosed().subscribe(result=>{
       console.log(result),

      this.user.profilepic.data=result.profilepic.data
    }
     
      // this.user.p
    )
  }
  openXl(content) {
    this.modalService.open(content, { centered: true, windowClass: 'dark-modal', modalDialogClass: 'dark-modal' });
  }

  openDialog(): void {
    this.item = new Item()
    this.item.images = new Array()

    const dialogRef = this.dialog.open(
      ItemComponent, {
      width: '500px',
      height: '500px',
      data: { color: this.item.color, size: this.item.size, material: this.item.material, condition: this.item.clothingCondition, posts: this.item.formData, description: this.item.description },
    });
    dialogRef.afterClosed().subscribe(result => {

      this.item.color = result.color
      this.item.size = result.size
      console.log(result.condition)
      this.item.clothingCondition = result.condition
      this.item.material = result.material
      this.item.formData = result.posts
      this.item.description = result.description
      if (result) {
        this.upload.uploadFile(this.item.formData)
          .subscribe(data => {
            console.log(data)
            this.item.images = data
            this.itemS.createPost(this.item, this.id)
              .subscribe(
                data => console.log(data),
                error => console.log(error))
          })

      }

    });
  }
  zoomIn(item: Item) {
    this.itemtozoom = item;
    for (var b in this.itemtozoom) {
      console.log(this.itemtozoom)

      // this.itemtozoom.images.map(p=> 'data:image/jpeg;base64,'+p.data)
      console.log(this.itemtozoom.images)

    }
    return true

  }

  deleteItem(){
    this.itemArray=this.itemArray.filter(p=>p !=this.itemtozoom)
    console.log(this.itemtozoom)
    this.modalService.dismissAll();
    this.itemS.deleteItem(this.itemtozoom.id).subscribe(data=> console.log(data))
  }

  display() {
    this.userService.getPosts(this.id).subscribe(
      data => {
        console.log(data)
        this.itemArray = data as Array<Item>;
        for (var j in this.itemArray) {
          for (var o in this.itemArray[j].images) {
            const b = this.domSanitizationService.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.itemArray[j].images[o].data)
            this.itemArray[j].images[o].data = b


          }
        }
        this.itemArray = this.itemArray.reverse()

      },
      error => {
        console.log("exception occured");
      })

      return this.itemArray
  }

  subscribeToNotifications = () => {

    console.log(this.VAPID_PUBLIC_KEY, 'this is the key')
    if (this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: 'BL1P9L_Pf9Ml70GJjcV9vDXXKAlOrLp-jtlTvMZ-V0Zxc1q6jDaF_tnd8e6jdpOE0Dmx3-uhFhwYOXuRcgWz4BU',
      })
        .then(sub => this.notifications.addPushSubscriber(sub, this.id).subscribe())
        .catch(err => console.error("Could not subscribe to notifications", err));
    }
  }

  returnUser(){
    
  }

  ngOnInit(): void {
    this.spinner.show();

    this.itemArray = this.display()
    this.userService.getUser(this.id).subscribe(data => {
      this.user = data ;
      sessionStorage.setItem('userId',this.user.id)
      console.log(this.user)
      if(data['matches']){
        this.totalSwaps=data['matches'].filter(p=>p.swap !==null && p.swap.swapStatus==='true').length
      }
      var img = new Image()
      if(this.user.profilepic)
      this.user.profilepic.data = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + this.user.profilepic.data)
      this.loaded=true;

    })
    
    this.subscribeToNotifications();

  }

}
