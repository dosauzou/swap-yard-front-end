import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { throws } from 'assert';
import { truncateSync } from 'fs';
import { Item } from 'src/app/classes/item';
import { Match } from 'src/app/classes/match';
import { Swap } from 'src/app/classes/swap';
declare var gapi: any;

@Component({
  selector: 'app-scheduler',
  templateUrl: './scheduler.component.html',
  styleUrls: ['./scheduler.component.scss']
})
export class SchedulerComponent implements OnInit {
  @Input() itemArray = new Array<any>();
  @Input() username;

  swap: any
  status: boolean = false;
  itemList: any[];
  date: string;
  time: string;
  location: string;
  name = sessionStorage.getItem('id')
  @Input() swapList = new Array<Item>();


  //check if swap is already in the database

  getSwapStatus() {
    if(this.swap)
    if (this.swap.swapStatus) {
      if (this.swap.swapStatus = "false" || "true") {
        this.status = true;

      } else this.status = false

    } else this.status = false

    return this.status

  }

  constructor(public sanitizer: DomSanitizer,) { }

  ngOnInit(): void {
    this.swap = this.username.swap;
    if(this.swap){
    this.swap.swapItems.map(p => p.images.map(x => x.data = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + x.data)))
  }
}

}
