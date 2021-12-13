import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit {
  item: Item
  
  constructor(public dialog: MatDialog) { }

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

  ngOnInit(): void {
  }

}
