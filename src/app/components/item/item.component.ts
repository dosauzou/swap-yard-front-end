import { Component, Inject, OnInit } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { ContentInterface } from 'src/app/classes/content';

//use a popul dialog to create the item
export interface DialogData {
  size: Number
  color: String;
  material: String;
  condition: String;
  posts: FormData;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    form: String;

  constructor( public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) { }
   
    onNoClick(): void {
      this.dialogRef.close();
    }
    next(): void {
      this.form = 'switch';
    }
  ngOnInit(): void {
  }

}
