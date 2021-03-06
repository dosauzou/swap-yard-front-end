import { CUSTOM_ELEMENTS_SCHEMA, Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NgxSpinnerModule } from 'ngx-spinner';

import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { UserServiceService } from './services/user-service.service';
import { HeaderComponent } from './components/header/header.component';
import { HomeComponent } from './components/home/home.component';
import { RouterModule } from '@angular/router';
import {MatIconModule} from '@angular/material/icon';
import { UploadComponent } from './components/upload/upload.component';
import { FormsModule } from '@angular/forms';
import {MatGridListModule} from '@angular/material/grid-list';
import { ProfileComponent } from './components/profile/profile.component';
import { WebcamComponent, WebcamModule } from 'ngx-webcam';
import { WebcamCaptureComponent } from './components/webcam-capture/webcam-capture.component';
import { ItemComponent } from './components/item/item.component';
import { SlickCarouselModule } from 'ngx-slick-carousel';  
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {IvyCarouselModule} from 'angular-responsive-carousel';
import { NgImageSliderModule } from 'ng-image-slider';
import {MatDialogModule, MAT_DIALOG_DEFAULT_OPTIONS} from '@angular/material/dialog';
import { MaterialModule } from './material.module';
import { AppService } from './services/app-service.service';
import { Observable } from 'rxjs';
import {MatListModule} from '@angular/material/list';
import {UserHeaderComponent} from 'src/app/components/user-header/user-header.component';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';
import { CarouselComponent } from './components/carousel/carousel.component';
import { MatchComponent } from './components/match/match.component';
import { MatchHeaderComponent } from './components/match-header/match-header.component';
import { EditProfileComponent } from './components/edit-profile/edit-profile.component';
import { MatchProfileComponent } from './components/match-profile/match-profile.component';
import { UnaryOperator } from '@angular/compiler';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SettingsComponent } from './components/settings/settings.component';
import { EditComponent } from './components/edit/edit.component';
import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
import { ChannelComponent } from './components/channel/channel.component';
import { SpinnerComponent } from './components/spinner/spinner.component';
import { MatNativeDateModule } from '@angular/material/core';
import { ImageAnalyserComponent } from './components/image-analyser/image-analyser.component';
@Injectable()
export class XhrInterceptor implements HttpInterceptor {

  intercept(req: HttpRequest<any>, next: HttpHandler):
  Observable<HttpEvent<any>> {
    console.log('Intercepted request' + req.url);
    const xhr = req.clone({
      headers: req.headers.set('X-Requested-With', 'XMLHttpRequest')
    });
    return next.handle(xhr);
  }
}

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent,
    HeaderComponent,
    HomeComponent,
    UploadComponent,
    ProfileComponent,
    WebcamCaptureComponent,
    ImageAnalyserComponent,
    ItemComponent,
    UserHeaderComponent,
    SpinnerComponent,
    NotificationComponent,
    CarouselComponent,
    MatchComponent,
    MatchHeaderComponent,
    EditProfileComponent,
    MatchProfileComponent,

    SettingsComponent,
    EditComponent,

    CalendarComponent,
    SchedulerComponent,
    ChannelComponent
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    RouterModule,
    FormsModule,
    MatGridListModule,
    WebcamModule,
    NgbModule,
    CommonModule,
    MatCardModule,
    MatIconModule,
    NgxSpinnerModule,
    MatButtonModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    NgImageSliderModule,
    MaterialModule,
    MatListModule,
    BrowserAnimationsModule,
    BrowserModule,
    FormsModule,
    HttpClientModule,
    MatNativeDateModule,
    MaterialModule,
    ReactiveFormsModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

 
    
  ],

  schemas:[CUSTOM_ELEMENTS_SCHEMA], // This is new to version 13 as well,

  providers: [
    UserServiceService, AppService, 
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    //interceptor works fine
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

