import { ChangeDetectorRef, Component, Inject, Input, OnInit, AfterContentChecked } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Match } from 'src/app/classes/match';
import { DialogData } from '../item/item.component';
import { NotificationComponent } from '../notification/notification.component';

@Component({
  selector: 'app-match-header',
  templateUrl: './match-header.component.html',
  styleUrls: ['./match-header.component.scss']
})
export class MatchHeaderComponent implements OnInit  {
  username1: any;
  swapFalse: Array <any>= new Array<any>();
  swapUnscheduled: Array <any>= new Array<any>();
  swapTrue:Array <any>= new Array<any>();
  // username: any;



  constructor(@Inject(MAT_DIALOG_DATA) public dialogData: {itemArray: Array<Match>, allMatches: Array<Match>, username: any, matchItems: Array<any>, scheduled: any, complete: any, array: any},private cdRef : ChangeDetectorRef) {


   }
  ngAfterContentChecked(): void {
 

    this.cdRef.detectChanges();
  }

 method(){

  this.username1=this.dialogData.username;
this.swapTrue = this.dialogData.complete;
this.swapUnscheduled =this.dialogData.array;
this.swapFalse= this.dialogData.scheduled;
 }

  ngOnInit(): void {
    this.method()
   console.log(this.username1)
 


  }

}
