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

  display(){
    this.userService.getPosts().subscribe(
      data=>{
        this.mediaArray = new Array
        for(let x in data){
          this.images = new ContentInterface

          this.images.fileName=data[x].fileName;
          this.images.fileType=data[x].fileType;
          this.images.data= 'data:image/jpeg;base64,'+ data[x].data;
          
          this.mediaArray.push(this.images)
        }
     } ,
      error => { 
        console.log("exception occured");
    })
  }

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
    this.display()
  }

}
