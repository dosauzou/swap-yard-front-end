import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { UserServiceService } from 'src/app/services/user-service.service';
import { ContentInterface } from 'src/app/classes/content';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  item: Item
  images: ContentInterface;
  mediaArray: any[];

  constructor(public dialog: MatDialog, private userService: UserServiceService) { }

  openDialog():void{
    this.item = new Item()
    this.item.images = new Array()
    

    const dialogRef = this.dialog.open(
      ItemComponent,{
        width: '500px',
        height: '500px',
                data:{color: this.item.color, size: this.item.size, material: this.item.material, condition: this.item.condition, posts: this.item.images},
      });

      dialogRef.afterClosed().subscribe(result => {
        this.item.color=result.color
        this.item.size=result.size
        this.item.condition = result.condition
        this.item.material=result.material
        this.item.images.push(result.posts)
        console.log(this.item.images[0].data)
        console.log(this.item);

      });
  }

  //this display method will retrieve
  //get by logged in user
  display(){
    this.userService.getPosts().subscribe(
      data=>{

        //we might have to retireve item instead, have a nestsed slideshow
        this.mediaArray= new Array()
        console.log(data)



        for(let x in data){
        
          this.images = new ContentInterface
          this.images.fileName=data[x].fileName;
          this.images.fileType=data[x].fileType;
          this.images.data= 'data:image/jpeg;base64,'+ data[x].data;
       
        
          this.mediaArray.push(this.images)


        }
     } ,
      error => { 
        console.log("exception occured");
    })
  }

  //now it's retrieving posts from items
  //user.get items, retrieve the post

  //

  ngOnInit(): void {
    this.display()

  }

}
