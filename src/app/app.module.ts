import { Injectable, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { NotificationComponent } from './components/notification/notification.component';
import { ReactiveFormsModule } from '@angular/forms';
import {HttpClientModule, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest, HTTP_INTERCEPTORS} from '@angular/common/http'
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
import { ChatComponent } from './components/chat/chat.component';
import { UnmatchComponent } from './components/unmatch/unmatch.component';
import { UnaryOperator } from '@angular/compiler';
import { DisplayItemComponent } from './components/display-item/display-item.component';
import { CommonModule } from '@angular/common';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SettingsComponent } from './components/settings/settings.component';
import { EditComponent } from './components/edit/edit.component';
import {FooterComponent} from 'src/app/components/footer/footer.component'
import {NgbCollapse, NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { StatusComponent } from './components/status/status.component';
import { CalendarComponent } from './components/calendar/calendar.component';
import { SchedulerComponent } from './components/scheduler/scheduler.component';
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
    ImageGridComponent,
    ProfileComponent,
    WebcamCaptureComponent,
    ItemComponent,
    UserHeaderComponent,
    NotificationComponent,
    CarouselComponent,
    MatchComponent,
    MatchHeaderComponent,
    EditProfileComponent,
    MatchProfileComponent,
    ChatComponent,
    UnmatchComponent,
    DisplayItemComponent,
    SettingsComponent,
    EditComponent,
    FooterComponent,
    StatusComponent,
    CalendarComponent,
    SchedulerComponent
    
    
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
    MatButtonModule,
    SlickCarouselModule,
    BrowserAnimationsModule,
    IvyCarouselModule,
    NgImageSliderModule,
    MaterialModule,
    MatListModule,
    ServiceWorkerModule.register('ngsw-worker.js', {
      enabled: environment.production,
      // Register the ServiceWorker as soon as the application is stable
      // or after 30 seconds (whichever comes first).
      registrationStrategy: 'registerWhenStable:30000'
    })

 
    
  ],

  providers: [
    UserServiceService, AppService, 
    {provide: MAT_DIALOG_DEFAULT_OPTIONS, useValue: {hasBackdrop: true}},
    //interceptor works fine
    { provide: HTTP_INTERCEPTORS, useClass: XhrInterceptor, multi: true }

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }

