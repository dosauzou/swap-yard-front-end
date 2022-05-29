import { Component, Input, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Item } from 'src/app/classes/item';
import { Match } from 'src/app/classes/match';
import { SwapService } from 'src/app/services/swap.service';

@Component({
  selector: 'app-carousel',
  templateUrl: './carousel.component.html',
  styleUrls: ['./carousel.component.scss']
})
export class CarouselComponent implements OnInit {
  
  @Input() itemArray = new Array<any>();
  @Input() username = new Match();
  @Input() matchItems = new Array<any>();


  itemList: any [];
  closeResult: string;
  itemTodelete: Item;
  swapList: any[]  = new Array();
  panelOpenState = false;

  itemToAdd: any;
  _lazyContent: string;
  containsAll: boolean =false;
  pushed: boolean =false;
  chatId: any;
  userEditMade: boolean = false;
get lazyContent() {
    if (!this._lazyContent) {
        this._lazyContent = fetchContent();
    }
    return this._lazyContent;
}
  
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
    console.log(item)
    this.itemToAdd = item;
    this.swapList.push(this.itemToAdd)
    this.swapList = [...this.swapList]
    this.itemList = this.itemList.filter(p=> p.id != item.id)

  }
pushItems(){
  this.swapService.postDetails(sessionStorage.getItem('id'),{items: this.swapList.map(p=>p.id), user: this.username.user.username, chatId: this.chatId}).subscribe(data=> console.log(data))
  this.swapList = new Array()
  this.pushed=true;

}
  removeItem(item: Item){
    this.swapList = this.swapList.filter(p=> p.id != item.id)
    this.itemList.push(item);
    this.itemList =[...this.itemList]
  }

  deleteItem(){
    console.log(this.itemToAdd)
  }

modifySwap(){
  this.swapList
  //once the items are swapped they are removed from circulation
}
  sortArray(){

    for (let x in this.itemArray){
  //if the swap items contains the other users items then u can schedule
      
      if(this.itemArray[x].user.username == this.username.user.username){
        this.chatId = this.itemArray[x].chatId;
        

        console.log(this.itemArray[x])
        for(var j in this.matchItems){
          console.log(this.matchItems.map(p=>p.id))
          console.log(this.matchItems[j].id)
if(this.itemArray[x].swap){
  if(this.itemArray[x].swap.swapItems)


          if(this.itemArray[x].swap.swapItems.map(p=>p.id).includes(this.matchItems[j].id))
          this.userEditMade = true;
        }
      }
      //   if(this.itemArray[x].items.swap){
      //   if(this.itemArray[x].items.map(p=> p.id).every(p =>{

      //     return this.itemArray[x].swap.swapItems.map(p=> p.id).includes(p)
      //   }))  {
      //     this.containsAll = true;
      //     console.log(this.containsAll)
      //   }
      // }


        // }
        console.log(this.itemArray[x].items)

        console.log(this.itemArray[x].swap)

        // this.itemList = new Array();
        this.itemList=new Array()
        for(let b in this.itemArray[x].items){
          this.itemArray[x].items[b].images[0].data = this.sanitizer.bypassSecurityTrustResourceUrl('data:image/jpeg;base64,'+this.itemArray[x].items[b].images[0].data);
          console.log(this.itemArray[x].items[b].images[0].data)
        }
        this.itemList = this.itemArray[x].items

        // for(let x in this.itemList){
        //   this.itemList[x].images.data =this.sanitizer.bypassSecurityTrustResourceUrl(this.itemList[x].images.data);
        // }

      }

    }
  }

  constructor(public sanitizer: DomSanitizer, private modalService: NgbModal, private swapService :SwapService) { }

  ngOnInit(): void {

    console.log(this.itemArray, 'item array')

    this.sortArray()
    console.log(this.itemList)

  }

}
function fetchContent(): string {
  throw new Error('Function not implemented.');
}

