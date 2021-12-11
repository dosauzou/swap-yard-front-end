import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserServiceService } from './services/user-service.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule } from '@angular/forms';
import { ImageGridComponent } from './components/image-grid/image-grid.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './components/profile/profile.component';
import { WebcamComponent, WebcamModule } from 'ngx-webcam';
import { WebcamCaptureComponent } from './components/webcam-capture/webcam-capture.component';



@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    UploadComponent,
    ImageGridComponent,
    ProfileComponent,
    WebcamCaptureComponent,
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    MatIconModule,
    FormsModule,
    MatGridListModule,
    WebcamModule
    


  ],
  providers: [UserServiceService],
  bootstrap: [AppComponent]
})
export class AppModule { }
