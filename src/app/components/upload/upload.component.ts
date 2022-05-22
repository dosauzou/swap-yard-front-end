import {HttpClient, HttpParams, HttpRequest, HttpEvent} from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import {Input, Output, EventEmitter, OnChanges} from '@angular/core'
import { UserServiceService } from 'src/app/services/user-service.service';
import {DomSanitizer} from '@angular/platform-browser';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ItemComponent, DialogData } from '../item/item.component';
import { Swatch } from 'node-vibrant/lib/color';
const Vibrant = require('node-vibrant') ;
var namer = require('color-namer')
const vision = require('@google-cloud/vision');


@Component({
  selector: 'app-upload',
  templateUrl: './upload.component.html',
  styleUrls: ['./upload.component.scss']
})
export class UploadComponent implements OnInit {

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

  constructor(private http: HttpClient, private userService: UserServiceService, public domSanitizationService: DomSanitizer,
    @Inject(MAT_DIALOG_DATA) public data: DialogData, private _sanitizer: DomSanitizer) { }
   
  ngOnInit(): void {
  }
  
  onNoClick(){
    
  };
  async getColours(data){

  const client = new vision.ImageAnnotatorClient();





  var image = new Image()
  image.src = data
  console.log(image.height)
  console.log(image.width)
this.list = new Array()
  console.log(image)
var img = document.createElement('img');
img.append(image)
console.log(img)


const request = {
  image: {content: data},
};
const [result] = await client.objectLocalization(request);
const objects = result.localizedObjectAnnotations;
objects.forEach(object => {
  console.log(`Name: ${object.name}`);
  console.log(`Confidence: ${object.score}`);
  const vertices = object.boundingPoly.normalizedVertices;
  vertices.forEach(v => console.log(`x: ${v.x}, y:${v.y}`));
});

let v = new Vibrant(image, 64, 1)
// v.getPalette((err, palette) => console.log(palette))
v.getPalette().then((palette) => {
var list = palette
  for (var i in palette){
    var swatch = palette[i] as Swatch
    this.list.push(swatch)
      // this.list.push(palette[i])
  }
this.list.sort((a, b) => (a.population < b.population) ? 1 : -1)
console.log(this.list)
var names = namer(this.list[0].hex)
console.log(this.list[0].hex)
console.log(names.basic)
console.log(names.roygbiv)
console.log(names.html)
console.log(names.x11)
  console.log( names.pantone)
  console.log(names.ntc)


}
  )

//  img.addEventListener('load', function() {
// //     var vibrant = new Vibrant(img);
// // console.log(vibrant)
// //     var swatches = vibrant.result.palettes
// //     for (var swatch in swatches)
// //         if (swatches.hasOwnProperty(swatch) && swatches[swatch])
// //             console.log(swatch)

//     /*
//      * Results into:
//      * Vibrant #7a4426
//      * Muted #7b9eae
//      * DarkVibrant #348945
//      * DarkMuted #141414
//      * LightVibrant #f3ccb4
//      */
// });
    
}
  async onFileSelected(event){

    const file:File = event.target.files[0];

    if (file) {
        this.fileName = file.name;
        const formData = new FormData();
        formData.append("file", file);
        var blob = new Blob([file])
        file.type
       console.log(file)

        this.data.posts=formData;

   
        
        const toBase64 = file => new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.readAsDataURL(file);
          reader.onload = () => resolve(reader.result);
          reader.onerror = error => reject(error);
      });
      
      // async function Main() {
      //    console.log(await toBase64(file));
      // }
      
      // Main();

      //   this.getColours(await convertBlobToBase64(blob))

        this.getColours(await toBase64(file))
        // const upload$ = this.http.post("/api/thumbnail-upload", formData);

        // upload$.subscribe();
    //     this.userService.uploadFile(formData).subscribe(
    //       data=>{
    //         console.log("response recieved");
    
    //      } ,
    //       error => { 
    //         console.log("exception occured");
    // console.log(file);
    //       })
        }
      }

      selectFiles(event) {
        this.progressInfos = [];
        this.selectedFiles = event.target.files;
      }
      // getImage() {

      //       this.userService.getFile(this.imageName).subscribe(
      //         res=>{
      //           this.retrieveResonse = res;
      //           this.blobData = this.retrieveResonse.data;
      //           this.retrievedImage = 'data:image/jpeg;base64,' + this.blobData;
      //           console.log(this.retrievedImage);

      //         });
      //       }

          
    }




