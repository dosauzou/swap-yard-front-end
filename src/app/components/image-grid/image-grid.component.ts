import { Component, OnInit } from '@angular/core';
import { ContentInterface } from 'src/app/classes/content';
import { UserServiceService } from 'src/app/services/user-service.service';

@Component({
  selector: 'app-image-grid',
  templateUrl: './image-grid.component.html',
  styleUrls: ['./image-grid.component.scss']
})
export class ImageGridComponent implements OnInit {
  
  mediaArray: any[];
  blobData: any;
  retrievedImage: any;
  retrieveResonse: any;

  images: ContentInterface;

  public slides = [
    { src: "https://image1.com" },
    { src: "https://image2.com" },
    { src: "https://image3.com" },
    { src: "https://image4.com" }
  ];
  
  newArray: any[];
  
  imageObject: Array<object> ;
//     image: 'assets/img/slider/1.jpg',
//     thumbImage: 'assets/img/slider/1_min.jpeg',
//     alt: 'alt of image',
//     title: 'title of image'
// }, {
//     image: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     thumbImage: '.../iOe/xHHf4nf8AE75h3j1x64ZmZ//Z==', // Support base64 image
//     title: 'Image title', //Optional: You can use this key if want to show image with title
//     alt: 'Image alt', //Optional: You can use this key if want to show image with alt
//     order: 1 //Optional: if you pass this key then slider images will be arrange according @input: slideOrderType
// }
// ];

  // display(){
  //   this.userService.getPosts().subscribe(
  //     data=>{
  //       this.mediaArray = new Array
  //       this.newArray = new Array

  //       for(let x in data){
  //         this.images = new ContentInterface

  //         this.images.fileName=data[x].fileName;
  //         this.images.fileType=data[x].fileType;
  //         this.images.data= 'data:image/jpeg;base64,'+ data[x].data;
       
          
  //         this.mediaArray.push(this.images)


  //       }
  //    } ,
  //     error => { 
  //       console.log("exception occured");
  //   })
  // }
  slideConfig = {  
    "slidesToShow": 3,  
    "slidesToScroll": 3,  
    "dots": true,  
    "infinite": true  
  }; 


  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    // this.display()
  }

}
