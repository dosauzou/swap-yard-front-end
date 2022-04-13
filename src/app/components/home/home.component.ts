import { ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { Item } from 'src/app/classes/item';
import { ItemComponent } from '../item/item.component';
import { ItemService} from 'src/app/services/item-service';
import { ContentInterface } from 'src/app/classes/content';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { moveItemInArray } from '@angular/cdk/drag-drop';
import { last } from 'rxjs/operators';
import { Swipe } from 'src/app/classes/swipe';
import { SwipesService } from 'src/app/services/swipes.service';
import { DomSanitizer } from '@angular/platform-browser';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  images: ContentInterface;
  itemArray:  Array<Item>
  item: Item;
  swipe: Swipe;
  id= sessionStorage.getItem('id');
  filteredList: any[];
  size: FormGroup;
  category: FormGroup;
  colour: FormGroup;
  colorFilter: String[];
  itemArray2: Array<Item>
  arrayCopy: Array<Item>
  public isCollapsed = false;


//call the backedn to populate an arraylist
  constructor(private itemService: ItemService, private http: HttpClient, private itemS: ItemService, public sanitizer: DomSanitizer,
    private swiped: SwipesService, fb: FormBuilder
    ) { 
      this.colorFilter = new Array()
      this.arrayCopy = new Array()


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

    filterByColour(selected:any){
      if(!this.colorFilter.includes(selected)){
        this.colorFilter.push(selected)
      }else for(var i=0; i<this.colorFilter.length; i++){
        if(this.colorFilter[i]===selected){
          this.colorFilter.splice(i,1)
          i--
        }
      }

        this.itemArray2 = this.itemArray.filter(item => item.color === this.colorFilter.find(e => e === item.color))
        console.log(this.itemArray2)
        this.arrayCopy=[...this.itemArray2]
        console.log(this.arrayCopy)
    }

    
//filter by size, condiition,  material

  display(){

    //retrieve the items 
console.log('huh')
    this.itemService.getItems().subscribe(
      data=>{
        this.itemArray= new Array()
        for(let x in data){
          this.item = new Item;
          this.item.images = new ContentInterface
          this.item.id = data[x].id;
          this.item.color = data[x].color;
          this.item.clothingCondition = data[x].clothingCondition;
          this.item.material = data[x].material;
          this.item.size = data[x].size;
          this.item.description = data[x].description
          this.item.images.fileName=data[x].images.fileName;
          this.item.images.fileType=data[x].images.fileType;
          this.item.images.data= this.sanitizer.bypassSecurityTrustUrl('data:image/jpeg;base64,'+ data[x].images.data);
          this.itemArray.push(this.item)
          console.log(this.itemArray)
          this.arrayCopy=[...this.itemArray]
        }
     } ,
      error => { 
        console.log("exception occured");
    })
  }




  onRight(){
    this.swipe = new Swipe()
    this.swipe.swipedItem = this.item
    //all i need is for the backend to persist the swipes to a user
    // this.itemService.findById(this.item.id).subscribe(
    //   data => {
    //     this.swipe.swipedItem
    console.log(this.swipe)
    this.arrayCopy.pop()
    this.swiped.createSwipe(this.swipe.swipedItem.id, this.id).subscribe(data=>{
      console.log(data)
    })
    
    //should we retrieve the item first and then post to swipe, fid

    this.item = this.arrayCopy[this.arrayCopy.length-1]
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
  onLeft(){
    this.arrayCopy.pop()
    this.item = this.arrayCopy[this.arrayCopy.length-1]
  }
  
  ngOnInit(): void {
    this.display();

  }

}
