import { Component, OnInit } from '@angular/core';
import {WebcamImage} from 'ngx-webcam';
import {Subject, Observable} from 'rxjs';
import { ContentInterface } from 'src/app/classes/content';
import { UserServiceService } from 'src/app/services/user-service.service';


@Component({
  selector: 'app-webcam-capture',
  templateUrl: './webcam-capture.component.html',
  styleUrls: ['./webcam-capture.component.scss']
})
export class WebcamCaptureComponent implements OnInit {
  images: ContentInterface = new ContentInterface();

  title = 'angularwebcam'

  public webcamImage: WebcamImage;
  private trigger: Subject<void> = new Subject<void>();
  yes: any;
  triggerSnapshot(): void {
   this.trigger.next();
  }
  handleImage(webcamImage: WebcamImage): void {
   console.info('Saved webcam image', webcamImage);
   this.webcamImage = webcamImage;
   this.yes = webcamImage.imageAsDataUrl
   const formData = new FormData();
   formData.append('file', this.yes);
   this.newImage()




  }

  newImage(){
    this.images= new  ContentInterface()
    this.images.fileName = '';
    this.images.fileType='image/jpeg'
    this.images.data=this.webcamImage.imageAsBase64;
    this.save();
    
  }
  save() {
    this.userService.createPost(this.images).subscribe(
      data => console.log(data), error => console.log(error))
    console.log(this.images) }
   
  public get triggerObservable(): Observable<void> {
   return this.trigger.asObservable();
  }

  constructor(private userService: UserServiceService) { }

  ngOnInit(): void {
  }

}
