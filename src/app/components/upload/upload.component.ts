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

  //Classifications and colours

  constructor(private http: HttpClient, private userService: UserServiceService, public domSanitizationService: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _sanitizer: DomSanitizer) { }

  async ngOnInit(): Promise<void> {
    this.loading = true;
    this.model = await mobilenet.load();
    this.loading = false;
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
      //Compare to clour list api 
      // this.list.sort((a, b) => (a.population < b.population) ? 1 : -1)
      // console.log(this.list)
      // var names = namer(this.list[0].hex)
      // //posibiliies
      // console.log(names.basic)
      // console.log(names.roygbiv)
      // console.log(names.html)
      // console.log(names.x11)
      // console.log(names.pantone)
      // console.log(names.ntc)


    }

    )
    return image


  }


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

    const file: File = event.target.files[0];

    if (file) {
      this.fileName = file.name;
      const formData = new FormData();
      formData.append("file", file);
      this.data.posts=formData;

      const reader = new FileReader();
      reader.readAsDataURL(file);
      const toBase64 = file => new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = error => reject(error);
      });

      this.retrieveDetails(await toBase64(file))
    }
  }

}




