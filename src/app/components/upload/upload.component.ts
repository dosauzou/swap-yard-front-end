import { HttpClient, HttpParams, HttpRequest, HttpEvent } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { Input, Output, EventEmitter, OnChanges } from '@angular/core'
import { UserServiceService } from 'src/app/services/user-service.service';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemComponent, DialogData } from '../item/item.component';
import { Swatch } from 'node-vibrant/lib/color';
const Vibrant = require('node-vibrant');
var namer = require('color-namer')
import * as mobilenet from '@tensorflow-models/mobilenet';
import { async } from 'rxjs';
import { Image } from 'node-vibrant/lib/typing';
import { FormGroup, FormBuilder } from '@angular/forms';

@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {
  model: any;
  loading: boolean;
  fileName = '';
  retrieveResonse: any;
  blobData: any;
  retrievedImage: any;
  imageName: any;
  contentArray: any[];
  selectedFiles: FileList;
  progressInfos: never[];
  base64data: any;
  list: any[];
  imgSrc: any;
  predictions: any;
  myFiles: any;
images: Array<any>;
  getArray: boolean = false;
  fileLists: any;
  formData: FormData;

  //Classifications and colours

  constructor(private http: HttpClient, private userService: UserServiceService, public domSanitizationService: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _sanitizer: DomSanitizer,private formBuilder: FormBuilder) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
        this.myFiles=new Array()
        this.images= new Array()
        // this.formData = this.formBuilder.group({
        //   files   : []
        // });
  }

  onNoClick() {

  };

  async retrieveDetails(data) {
    var image: any
    image = this.getColours(data)
    console.log(image)
    this.getCategories(image)
  }
  //Retrieve the possible colours from the image
  //using vibrant js a
  getColours(data): any {
    var image = new Image()
    image.src = data
    this.list = new Array()
    var img = document.createElement('img');
    img.append(image)

    //Acquires colour palette
    let v = new Vibrant(image, 64, 1)
    v.getPalette().then((palette) => {
      for (var i in palette) {
        var swatch = palette[i] as Swatch
        this.list.push(swatch)
      }
  

    }

    )
    return image


  }

  //Using color-namer api
  matchPossibleColours(){
    //compares to colour list api
      this.list.sort((a, b) => (a.population < b.population) ? 1 : -1)
      console.log(this.list)
      var names = namer(this.list[0].hex)
      //posibiliies
      console.log(names.basic)
      console.log(names.roygbiv)
      console.log(names.html)
      console.log(names.x11)
      console.log(names.pantone)
      console.log(names.ntc)
  }

//using tensorflow js
  getCategories(image) {
    setTimeout(async () => {
      this.predictions = await this.model.classify(image);
      for (var i in this.predictions) {
        if (this.predictions[i].probability > 0.5) {
          console.log(this.predictions[i])

        }
      }
    });
  }

  async onFileSelected(event) {
    for (var i = 0; i < event.target.files.length; i++) { 
      this.myFiles.push(event.target.files[i]);
  }
  this.formData = new FormData()
  console.log(this.myFiles)
this.fileLists = new Array()
for(var a in this.myFiles){
  var image = new Image()
    const file: File = event.target.files[a];
    if (file) {
      // this.formData: FormData = new FormData();

      this.formData.append('files', file);

      this.fileName = file.name;
       this.fileLists.push(file)
      const reader = new FileReader();
      reader.readAsDataURL(file);
      
      const toBase64 = file => new Promise((resolve, reject) => {
       const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);

      });

      image.src = await toBase64(file) as string
      var o = {path: image.src}

      this.images.push(o)
      console.log(this.images)

      this.getArray = true

      }

      // this.retrieveDetails(await toBase64(file))
    }
    console.log(this.formData)
    this.data.posts=this.formData


  }

}




