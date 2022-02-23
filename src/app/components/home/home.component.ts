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

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],

})
export class HomeComponent implements OnInit {
  images: ContentInterface;
  itemArray: any[];
  item: Item;
  swipe: Swipe;
  id= sessionStorage.getItem('id');

//call the backedn to populate an arraylist
  constructor(private itemService: ItemService, private http: HttpClient, private itemS: ItemService, public sanitizer: DomSanitizer,
    private swiped: SwipesService
    ) { }
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
    this.itemArray.pop()
    this.swiped.createSwipe(this.swipe.swipedItem.id, this.id).subscribe(data=>{
      console.log(data)
    })
    
    //should we retrieve the item first and then post to swipe, fid

    this.item = this.itemArray[this.itemArray.length-1]
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
    this.itemArray.pop()
    this.item = this.itemArray[this.itemArray.length-1]

  }
  
  ngOnInit(): void {
    this.display();
  }

}
