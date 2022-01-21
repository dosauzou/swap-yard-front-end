import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ContentInterface } from 'src/app/classes/content';
import {AppService} from 'src/app/services/app-service.service';
import {ItemService} from 'src/app/services/item-service'
import { HttpClient, HttpHeaders } from '@angular/common/http';

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

  constructor(public dialog: MatDialog, private userService: UserServiceService, private app: AppService, private http: HttpClient, private itemS: ItemService) { 
    http.get('server/api/v1/token').subscribe(data => {
      const token = data['token'];
      // console.log(token);
      }, () => {});
  }

  openDialog():void{
    this.item = new Item()
    this.item.images = new Array()
    
    const dialogRef = this.dialog.open(
      ItemComponent,{
        width: '500px',
        height: '500px',
                data:{color: this.item.color, size: this.item.size, material: this.item.material, condition: this.item.condition, posts: this.item.formData},
      });
      // console.log()

      dialogRef.afterClosed().subscribe(result => {

        console.log(result)
        this.item.color=result.color
        this.item.size=result.size
        this.item.condition = result.condition
        this.item.material=result.material
        this.item.formData = result.posts
        // this.item.images.push(result.posts)
        if(result){
          this.itemS.createPost(this.item, this.id).subscribe(
            data => console.log(data), error => console.log(error))
          console.log("Created")
        }

      });


  }

  //this display method will retrieve
  //get by logged in user
  // display(){
  //   this.userService.getPosts(this.data).subscribe(
  //     data=>{

  //       //we might have to retireve item instead, have a nestsed slideshow
  //       this.mediaArray= new Array()
  //       console.log(data)



  //       for(let x in data){
        
  //         this.images = new ContentInterface
  //         this.images.fileName=data[x].fileName;
  //         this.images.fileType=data[x].fileType;
  //         this.images.data= 'data:image/jpeg;base64,'+ data[x].data;
       
        
  //         this.mediaArray.push(this.images)


  //       }
  //    } ,
  //     error => { 
  //       console.log("exception occured");
  //   })
  // }

  authenticated() { return this.app.authenticated; }


  //now it's retrieving posts from items
  //user.get items, retrieve the post

  //

  ngOnInit(): void {
    //sessionStorage works

    // this.display()

  }

}
