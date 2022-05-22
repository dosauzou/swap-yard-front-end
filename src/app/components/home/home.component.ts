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
import { FormBuilder, FormGroup } from '@angular/forms';
import { Overlay } from '@angular/cdk/overlay';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
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

  lastitem: boolean = true;
  arrayProxy: any;

  isOpen = false;
  colours: Set<String>;
  conditions: Set<String>;
  sizings: Set<Number>;
  categoryFilter: any;
  conditionFilter: any;
  sizeFilter: any;


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
    private swiped: SwipesService, fb: FormBuilder, private overlay: Overlay
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

    //retrieve the items 
    console.log('huh')
    this.itemService.getItems().subscribe(
      data => {
        this.itemArray = new Array()
        for (let x in data) {
          console.log(data)
          this.item = new Item;
          this.item.images = new Array()
          this.item.id = data[x].id;
          this.item.color = data[x].color;
          this.item.clothingCondition = data[x].clothingCondition;
          this.item.material = data[x].material;
          this.item.size = data[x].size;
          this.item.description = data[x].description
          // this.item.images.fileName = data[x].images[0].fileName;
          // this.item.images.fileType = data[x].images.fileType;
          // this.item.images.data = this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,' + data[x].images.data);
          this.itemArray.push(this.item)
          console.log(this.itemArray)
          this.arrayCopy = [...this.itemArray]
        }
        this.arrayProxy = new Proxy(this.itemArray, this.setHandler());
        this.colours = new Set(this.arrayCopy.map(o => o.color))
        this.conditions = new Set(this.arrayCopy.map(o => o.clothingCondition))
        this.sizings = new Set(this.arrayCopy.map(o => o.size))


      },
      error => {
        console.log("exception occured");
      })
  }




  onRight() {
    this.swipe = new Swipe()
    this.swipe.swipedItem = this.item
    //all i need is for the backend to persist the swipes to a user
    // this.itemService.findById(this.item.id).subscribe(
    //   data => {
    //     this.swipe.swipedItem
    console.log(this.swipe)
    this.arrayCopy.pop()
    this.arrayProxy.pop()

    this.swiped.createSwipe(this.swipe.swipedItem.id, this.id).subscribe(data => {
      console.log(data)
    })

    //should we retrieve the item first and then post to swipe, fid

    this.item = this.arrayCopy[this.arrayCopy.length - 1]
    //users swipe plus the users id, so
    //post request to store the users swipes, then amethod that doesnt allow swipes to popup again
    //store the stuff, when you reach the end change the sceen to annimation
  }
  // onRight(){
  //   this.swipe = new Swipe()
  //   this.swipe.s   this.itemArray.pop()
  //   wipedItem = this.item
  //   this.item = this.itemArray[this.itemArray.length-1]

  //   //all i need is for the backend to persist the swipes to a user
  //   this.swiped.createSwipe(this.item.id, this.id).subscribe(
  //     data => {
  //   console.log(data)
  //   //should we retrieve the item first and then post to swipe, fid

  //   //users swipe plus the users id, so
  //   //post request to store the users swipes, then amethod that doesnt allow swipes to popup again
  //   //store the stuff, when you reach the end change the sceen to annimation
  // }
  onLeft() {

    if (this.arrayCopy.length > 1) {
      this.arrayCopy.pop()
      this.arrayProxy.pop()
      this.item = this.arrayCopy[this.arrayCopy.length - 1]
    } else {
      this.lastitem = false
    }

  }

  ngOnInit(): void {
    this.display();

  }

}
