import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/classes/item';
import { Match } from 'src/app/classes/match';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @Input() itemArray = new Array<Match>();
  @Input() username = new Match();

  itemList: any [];
  closeResult: string;
  itemTodelete: Item;
  
  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }
  setItem(item: Item){
    this.itemTodelete = item;
  }

  deleteItem(){
    console.log(this.itemTodelete)
  }
  sortArray(){

    for (let x in this.itemArray){
      if(this.itemArray[x].user.username == this.username.user.username){
        // this.itemList = new Array();
        this.itemList=new Array()
        for(let b in this.itemArray[x].items){
          this.itemArray[x].items[b].images[0].data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+this.itemArray[x].items[b].images[0].data);
          console.log(this.itemArray[x].items[b].images[0].data)
        }
        console.log(this.itemArray[x].items, 'itemslkist')
        this.itemList = this.itemArray[x].items

        // for(let x in this.itemList){
        //   this.itemList[x].images.data =this.sanitizer.bypassSecurityTrustResourceUrl(this.itemList[x].images.data);
        // }

      }

    }
  }

  constructor(public sanitizer: DomSanitizer, private modalService: NgbModal) { }

  ngOnInit(): void {

    console.log(this.itemArray, 'item array')

    this.sortArray()
    console.log(this.itemList)

  }

}
