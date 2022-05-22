import { Component, Inject, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';
import { ContentInterface } from 'src/app/classes/content';
var namer = require('color-namer')

//use a popul dialog to create the item
export interface DialogData {
  size: Number
  color: String;
  material: String;
  condition: String;
  description: String;
  posts: FormData;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    form: String;
    myControl = new FormControl();
    myControl1 = new FormControl();

    filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  options1: string[]=[];
  options: any;


  constructor( public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
this.options = new Array()
     }
   
    onNoClick(): void {
      this.dialogRef.close();
    }
    next(): void {
      this.form = 'switch';
    }
    analyser(): void {
      //posibiliies

      this.form = 'analyse';
    }
  ngOnInit(): void {

      for(var i in namer('#F9F6EE').basic ){
        console.log(namer('#F9F6EE').basic[i].name)
        this.options.push(namer('#F9F6EE').basic[i].name as string)
        console.log(this.options)
  
      }
    

    this.filteredOptions = this.myControl.valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value)),
    );

    this.filteredOptions1 = this.myControl1.valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
}
