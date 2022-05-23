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



  //Using color-namer api


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
      
      image.src = await this.toBase64(file) as string
      var o = {path: image.src}

      this.images.push(o)
 

      this.getArray = true


      }

    }
    console.log(this.formData.get('files'))
    this.data.posts=this.formData


  }

  toBase64 = file => new Promise((resolve, reject) => {
    const reader = new FileReader();
     reader.readAsDataURL(file);
     reader.onload = () => resolve(reader.result);
     reader.onerror = error => reject(error);

   });

}




