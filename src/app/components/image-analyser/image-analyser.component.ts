import { Component, Inject, OnInit } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemComponent, DialogData } from '../item/item.component';
import { Swatch } from 'node-vibrant/lib/color';
const Vibrant = require('node-vibrant');
var namer = require('color-namer')
import * as mobilenet from '@tensorflow-models/mobilenet';
import { async } from 'rxjs';
import { Image } from 'node-vibrant/lib/typing';
import { FormGroup, FormBuilder } from '@angular/forms';
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
  predictions: any;
  model: any;
  item: any;
  possibleColours: any[];
  possibleCategory: any[];
  loading: boolean;
  myFiles: any[];
  categories: any;
  b: { category: any ; image: HTMLImageElement; };
  colors: any;
  colorlist: Colorlist

  constructor(public dialogRef: MatDialogRef<ItemComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData) {
      this.item = data as unknown as any;

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

      this.b = this.getCategories(image)
      console.log(this.b)
      })



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
      this.categories = new Array()
      setTimeout(async () => {
        this.predictions = await this.model.classify(image);
        for (var i in this.predictions) {
          console.log(this.predictions[i])
          if (this.predictions[i].probability > 0.5) {
            this.categories.push(this.predictions[i])
  
          }
        }
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
        while(b<=info.length-1){
          var data = await this.toBase64(info[b])
          console.log(data)

      this.retrieveDetails(data)
      b++;
        
        }

   
  }

}
