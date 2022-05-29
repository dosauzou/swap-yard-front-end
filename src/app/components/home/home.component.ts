import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { ItemService } from 'src/app/services/item-service';
import { ContentInterface } from 'src/app/classes/content';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { last } from 'rxjs/operators';
import { Swipe } from 'src/app/classes/swipe';
import { SwipesService } from 'src/app/services/swipes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormArray, FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';
import { DislikesService } from 'src/app/services/dislikes.service';
import { NgxSpinnerService } from 'ngx-spinner';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})

//swap items are added with the plus button, then the swap is scheduled

export class HomeComponent implements OnInit {
  images: ContentInterface;
  itemArray: Array<Item>
  item: Item;
  swipe: Swipe;
  id = sessionStorage.getItem('id');
  filteredList: any[];
  size: FormGroup;
  category: FormGroup;
  colour: FormGroup;
  colorFilter: String[];
  itemArray2: Array<Item>
  arrayCopy: Array<Item>
  public isCollapsed = true;
  public isCollapsed1 = true;
  public isCollapsed2 = true;

  lastitem: boolean;
  arrayProxy: any;

  isOpen = false;
  colours: Set<String>;
  conditions: Set<String>;
  sizings: Set<Number>;
  categoryFilter: any;
  conditionFilter: any;
  sizeFilter: any;
  seen: any[];
  itemtozoom: Item;

  // itemForm = new FormGroup ({
  //   firstName: new FormControl(),
  //   lastName: new FormControl(),
  //   alias: new FormArray([ new FormControl("")])
  // });
  click(){
    this.isOpen = !this.isOpen

  }
  setHandler() {
    const handler = {
      get(target: any, property: any) {
        return target[property];
      }
    }
    return handler
  }
  //call the backedn to populate an arraylist
  constructor(private itemService: ItemService, private http: HttpClient, private itemS: ItemService, public sanitizer: DomSanitizer,
    private swiped: SwipesService, fb: FormBuilder, private overlay: Overlay, private dislike: DislikesService, private spinnerService: NgxSpinnerService, private modalService: NgbModal
  ) {
    this.colorFilter = new Array()
    this.arrayCopy = new Array()
    this.conditionFilter = new Array()
    this.sizeFilter = new Array()

    this.size = fb.group({
      6: 6,
      8: 8,
      10: 10,
      12: 12,
      14: 14,
      16: 16,
      18: 18
    });

    this.colour = fb.group({
      green: false,
      blue: false,
      black: false,
      orange: false,
      yellow: false,
    });
  }
  openXl(content) {
    this.modalService.open(content, { centered: true, windowClass: 'dark-modal', modalDialogClass: 'dark-modal' });
  }
  zoomIn(item: Item) {
    this.itemtozoom = item;
    for (var b in this.itemtozoom) {
      console.log(this.itemtozoom)

      // this.itemtozoom.images.map(p=> 'data:image/jpeg;base64,'+p.data)
      console.log(this.itemtozoom.images)

    }
    return true

  }
  filterByColour(selected: any) {
    if (!this.colorFilter.includes(selected)) {
      this.colorFilter.push(selected)
      // this.arrayCopy = this.arrayProxy.filter(item => item.color === this.colorFilter.find(e => e === item.color))
      this.filterByAll()
    }
    else {
      for (var i = 0; i < this.colorFilter.length; i++) {
        if (this.colorFilter[i] === selected) {
          this.colorFilter.splice(i, 1)
          i--
        }
      }
      this.filterByAll()


      // }
    }
  }

  // FILTER BY CONDITIONS
  filterByAll() {

    if (this.colorFilter.length != 0 && this.conditionFilter.length != 0 && this.sizeFilter != 0) {
      this.arrayCopy = this.arrayProxy.filter(item =>

        item.clothingCondition === this.conditionFilter.find(e => e === item.clothingCondition)

        &&
        item.size === this.sizeFilter.find(e => e === item.size)
        &&

        item.color === this.colorFilter.find(e => e === item.color)

      )
    } else
      if (this.conditionFilter.length != 0 && this.sizeFilter != 0) {
        this.arrayCopy = this.arrayProxy.filter(item =>

          item.clothingCondition === this.conditionFilter.find(e => e === item.clothingCondition)

          &&
          item.size === this.sizeFilter.find(e => e === item.size)

        )
      } else
        if (this.colorFilter.length != 0 && this.sizeFilter != 0) {
          this.arrayCopy = this.arrayProxy.filter(item =>



            item.size === this.sizeFilter.find(e => e === item.size)
            &&

            item.color === this.colorFilter.find(e => e === item.color)

          )
        } else
          if (this.colorFilter.length != 0 && this.conditionFilter != 0) {
            this.arrayCopy = this.arrayProxy.filter(item =>

              item.clothingCondition === this.conditionFilter.find(e => e === item.clothingCondition)

              &&


              item.color === this.colorFilter.find(e => e === item.color)

            )
          } else if (this.colorFilter.length == 0 && this.conditionFilter.length == 0 && this.sizeFilter == 0) {
            this.arrayCopy = [...this.arrayProxy]
          }


          else {
            this.arrayCopy = this.arrayProxy.filter(item =>

              item.clothingCondition === this.conditionFilter.find(e => e === item.clothingCondition)

              ||
              item.size === this.sizeFilter.find(e => e === item.size)
              ||

              item.color === this.colorFilter.find(e => e === item.color)

            )

           

          } if(this.arrayCopy.length==0){
            this.lastitem = false
          }else
          this.lastitem = true



    console.log(this.arrayCopy)

  }

  filterByCondition(selected: any) {
    if (!this.conditionFilter.includes(selected)) {
      this.conditionFilter.push(selected)
      // this.itemArray  = this.arrayProxy.filter(item => item.clothingCondition === this.conditionFilter.find(e => e === item.clothingCondition))
      this.filterByAll()      //filter the
    }
    else {
      for (var i = 0; i < this.conditionFilter.length; i++) {
        if (this.conditionFilter[i] === selected) {
          this.conditionFilter.splice(i, 1)
          i--
        }
      }

      this.filterByAll()      //filter the
    }
  }

  filterBySize(selected: any) {
    if (!this.sizeFilter.includes(selected)) {
      this.sizeFilter.push(selected)
      // this.arrayCopy = this.arrayProxy.filter(item => item.size === this.sizeFilter.find(e => e === item.size))
      this.filterByAll()
    }
    else {
      for (var i = 0; i < this.sizeFilter.length; i++) {
        if (this.sizeFilter[i] === selected) {
          this.sizeFilter.splice(i, 1)
          i--
        }

      }
      this.filterByAll()      //filter the

    }
  }


  //filter by size, condiition,  material

  display() {

    this.seen = new Array()
    this.dislike.getDislikeLikes(this.id).subscribe(data => {
      this.seen = data as Array<number>
      this.itemService.getItems().subscribe(
        data => {
          this.itemArray = data as Array<Item>
          this.itemArray= this.itemArray.filter( ( p ) => {
            return !this.seen.includes( p.id );
          } );
          console.log(this.itemArray)
  
          if(this.itemArray.length>0){
          for(var j in this.itemArray){
            for(var o in this.itemArray[j].images){
                  const b = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ this.itemArray[j].images[o].data)
              this.itemArray[j].images[o].data = b
            
            }}
          this.arrayCopy = [...this.itemArray]
          console.log(this.arrayCopy)
          this.arrayProxy = new Proxy(this.itemArray, this.setHandler());
          this.colours = new Set(this.arrayCopy.map(o => o.color))
          this.conditions = new Set(this.arrayCopy.map(o => o.clothingCondition))
          this.sizings = new Set(this.arrayCopy.map(o => o.size))
          this.lastitem = true;
          }else{
            this.lastitem = false
          }
      
    })})
    //retrieve the items 
    //get user likes and dislikeds
 ,
      error => {
        console.log("exception occured");
      }

  }




  onRight() {
    this.swipe = new Swipe()
    this.item = this.arrayCopy[this.arrayCopy.length - 1]
    this.swipe.swipedItem = this.item
    this.swiped.createSwipe(this.swipe.swipedItem.id, this.id).subscribe(data => {
      console.log(data)
    })
    this.arrayCopy.pop()
    this.arrayProxy.pop()

    if (this.arrayCopy.length > 0) {

      this.item = this.arrayCopy[this.arrayCopy.length - 1]
    } else {
      this.lastitem = false
    }



  }

  onLeft() {
    this.swipe = new Swipe()
    this.item = this.arrayCopy[this.arrayCopy.length - 1]
    this.swipe.swipedItem = this.item
    this.dislike.sendDislike(this.swipe.swipedItem.id, this.id).subscribe(data => {
      console.log(data)
    })
    this.arrayCopy.pop()
    this.arrayProxy.pop()
    if (this.arrayCopy.length > 0) {

      this.item = this.arrayCopy[this.arrayCopy.length - 1]
    } else {
      this.lastitem = false
    }

  }

  ngOnInit(): void {
    this.display()

  }


}
