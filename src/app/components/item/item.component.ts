import { Component, Inject, OnInit } from '@angular/core';
import { AbstractControl, FormControl, FormGroup, ValidatorFn, Validators } from '@angular/forms';
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
  category: string;
}

@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.scss']
})
export class ItemComponent implements OnInit {
    form: String;
    inputForm = new FormGroup({
description: new FormControl('', [Validators.required,, Validators.minLength(50) ,Validators.maxLength(100)]),
    color : new FormControl('', Validators.required),
    material : new FormControl('', Validators.required),
    size :new FormControl('', Validators.required),
    condition : new FormControl('', Validators.required)

    })
    filteredOptions: Observable<string[]>;
  filteredOptions1: Observable<string[]>;
  options1: string[]=[];
  options: any;
  submitted: boolean;


  constructor( public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
this.options = new Array()



     }
   
    onNoClick(): void {
      this.dialogRef.close();
    }
    next(): void {
      this.submitted = true;
      if (this.inputForm.invalid) {
        return;
      }else{
      this.data.color = this.inputForm.value.color
this.data.material = this.inputForm.value.material
this.data.description = this.inputForm.value.description
this.data.size= this.inputForm.value.size
this.data.condition = this.inputForm.value.condition
      this.form = 'switch';
      }
      console.log(this.data)

    }
    analyser(): void {
      //posibiliies

      this.form = 'analyse';
    }

    previous(){
      this.form ='form'
    }
  ngOnInit(): void {

      for(var i in namer('#2e3645').basic ){
        console.log(namer('#2e3645'))
        this.options.push(namer('#2e3645').basic[i].name as string)
  
      }
      this.options1.push('Cotton', 'Leather', 'Rayon', 'Polyester', 'Silk',
       'Wool', 'Satin', 'Suede', 'Terry Cotton', 'Velvet', 'Spandex/Viscose','Acrylic','Muslin','Denim')

    

    this.filteredOptions = this.inputForm.controls['color'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter(value as string)),
    );

    this.filteredOptions1 = this.inputForm.controls['material'].valueChanges.pipe(
      startWith(''),
      map(value => this._filter1(value as string)),
    );
  }
  private _filter(value: string): string[] {
    const filterValue = value.toLowerCase();
    console.log(this.filteredOptions)

    return this.options.filter(option => option.toLowerCase().includes(filterValue));
  }
  private _filter1(value: string): string[] {
    const filterValue = value.toLowerCase();
    return this.options1.filter(option => option.toLowerCase().includes(filterValue));
  }
}

function color(): ValidatorFn {  
  return (control: AbstractControl): { [key: string]: any } | null =>  

      control.value?.toLowerCase() === 'blue' 
          ? null : {wrongColor: control.value};
}
