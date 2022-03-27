import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ContentInterface } from 'src/app/classes/content';
import { Item } from 'src/app/classes/item';
import { ItemService } from 'src/app/services/item-service';
import { UploadService } from 'src/app/services/upload-service.service';
import { ItemComponent } from '../item/item.component';
// import {ProfileComponent} from 'src/app/components/profile/profile.component'
@Component({
  selector: 'app-user-header',
  templateUrl: './user-header.component.html',
  styleUrls: ['./user-header.component.scss']
})
export class UserHeaderComponent implements OnInit {
  title = 'Swapyard';
  navbarCollapsed = true; 
  item: Item
  mediaArray: any[];
  greeting = {};
  id= sessionStorage.getItem('id');
  images: ContentInterface;
  constructor(public dialog: MatDialog,private upload: UploadService,private itemS: ItemService) { }
// openDialog(){
//   this.u.openDialog();

// }
openDialog():void{
  this.item = new Item()
  this.item.images = new ContentInterface
  
  const dialogRef = this.dialog.open(
    ItemComponent,{
      panelClass: 'my-outlined-dialog',
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
  ngOnInit(): void {
  }

}
