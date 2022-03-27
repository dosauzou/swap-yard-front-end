import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { Item } from 'src/app/classes/item';
import { Match } from 'src/app/classes/match';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @Input() itemArray = new Array<Match>();
  @Input() username = '';

  itemList: any [];

  sortArray(){

    console.log(this.itemArray)
    for (let x in this.itemArray){
      if(this.itemArray[x].user.username == this.username){
        // this.itemList = new Array();
        this.itemList=new Array()
        for(let b in this.itemArray[x].itemList){
          this.itemArray[x].itemList[b].images.data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+this.itemArray[x].itemList[b].images.data);
          console.log(this.itemArray[x].itemList[b].images.data)
        }
        console.log(this.itemArray[x].itemList)
        this.itemList = this.itemArray[x].itemList

        // for(let x in this.itemList){
        //   this.itemList[x].images.data =this.sanitizer.bypassSecurityTrustResourceUrl(this.itemList[x].images.data);
        // }

      }

    }
  }

  constructor(public sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.sortArray()
    console.log(this.itemList)

  }

}
