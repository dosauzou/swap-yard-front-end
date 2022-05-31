import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemComponent, DialogData } from '../item/item.component';
import { Swatch } from 'node-vibrant/lib/color';
const Vibrant = require('node-vibrant');
var namer = require('color-namer')
import * as mobilenet from '@tensorflow-models/mobilenet';
import { async } from 'rxjs';
import { Image } from 'node-vibrant/lib/typing';
import { FormGroup, FormBuilder, FormControl } from '@angular/forms';
import { getArrayFromDType } from '@tensorflow/tfjs-core/dist/util_base';
import { connectableObservableDescriptor } from 'rxjs/internal/observable/ConnectableObservable';
import { normalizePassiveListenerOptions } from '@angular/cdk/platform';
export interface Colorlist {basic: any; roygbiv: any; pantone: any; ntc: any; html:any; x11:any; }

@Component({
  selector: 'app-image-analyser',
  templateUrl: './image-analyser.component.html',
  styleUrls: ['./image-analyser.component.scss']
})


export class ImageAnalyserComponent implements OnInit {
  list: any[];
  disableSelect = new FormControl(false);
  predictions: any;
  model: any;
  item: any;
  possibleColours: any[];
  possibleCategory: any[];
  loading: boolean;
  myFiles: any[];
  categories: Set<any> = new Set();
  b: { category: any ; image: HTMLImageElement; };
  colors: any;
  colorlist: Colorlist
  predicted: boolean;
  
 cat = new FormControl();
  categor: any;

  constructor(public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.item = data as unknown as any;
      data.category = this.cat.value
     }

    
     getColours(data): any {
       
      var b: { category: any; image: HTMLImageElement; };
      var image = new Image()
      image.src = data
      //Acquires colour palette
      let v = new Vibrant(image, 64, 3)
      this.b = v.getPalette().then((palette) =>  {
        
        for (var i in palette) {
          var swatch = palette[i] as Swatch
          this.list.push(swatch)

        }

        var category = this.matchPossibleColours()
       return  b = {category, image}
      },
      )
     
      return this.b

  
    }
      retrieveDetails(data) {
      var image: any
       this.getColours(data).then((x)=>{
      image = x.image
      this.colors = x.category
      console.log(this.colors)

       this.getCategories(image)
      })

    
    }
    getCategory(){
      var x;
        if(!this.categor){
          x= this.cat.value;
          
        }else{
          x = this.categor
        }
        this.data.category = x;
        console.log(x)
    }

    setItem(any){
      if(!this.categor){
        this.categor = any
      }else this.categor=null
    }

     toBase64 = file => new Promise((resolve, reject) => {
      const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result);
       reader.onerror = error => reject(error);
  
     });

     matchPossibleColours(){

      var data = new Object() as Colorlist;

      var namelist = new Array()

      //compares to colour list api
       this.list = this.list.sort((a, b) => (a.population < b.population) ? 1 : -1)
        this.list = this.list.filter(a=> a.population>0)
        console.log(this.list)
        for(var x in this.list){
          var names = namer(this.list[x].hex) 
          console.log(this.list[x].hex, names)
          // namelist.push(names)       
          // var b = new Array()
          // for(var x in names[key]){
    }

    console.log(namelist)
    for(var key in names){
      data[key] = new Array()
      for(var o in names[key])
      data[key].push(names[key][o])
      // for(var o in data[key]){
      //   data[key][o] = data[key][o].sort((a, b) => (a.distance > b.distance) ? 1 : -1)

      // }

  }
  console.log(data)
          // var list = namer.splice()
          // console.log(list)
       
        // return colorlist
        //get first three
        //posibiliies
    }
  
  //using tensorflow js
    getCategories(image) {
      setTimeout(async () => {
        this.predictions = await this.model.classify(image);
        this.predictions = this.predictions.sort((a, b) => (a.probability < b.probability) ? 1 : -1)
        console.log(this.predictions[0])
        if(this.predictions[0].probability>0.5){
          console.log(this.predictions[0])
          this.categories.add(this.predictions[0].className)
          this.predicted=true
        }else this.predicted=false

        // for (var i in this.predictions) {

        //   console.log(this.predictions[i])
        //   this.categories.push(this.predictions[i])

          
        // }
        // this.categories = this.categories.sort((a, b) => (a.probability < b.probability) ? 1 : -1)
       
      });
      return this.categories
    }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
    this.list = new Array()

        
        var info = [...this.item.posts.getAll('files')]
        var b =0;
        while(b<info.length){
          var data = await this.toBase64(info[b])
          console.log(data)

      this.retrieveDetails(data)
      b++;
        
        }

   
  }

}
