import { Component, HostListener, Inject, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { any } from '@tensorflow/tfjs-core';
import { UserServiceService } from 'src/app/services/user-service.service';
import {MatSnackBar, MatSnackBarModule, _SnackBarContainer} from '@angular/material/snack-bar';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DialogData, ItemComponent } from '../item/item.component';
import { ProfileComponent } from '../profile/profile.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent implements OnInit {
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


  submitted: boolean = false;
  editForm: any;
  bioForm: any;
  get f() { return this.editForm.controls; }


  onSubmit(){
    this.submitted = true;
console.log('this is submitting')

        // this.formData: FormData = new FormData();

    
   var details = {bio: this.editForm.value['bio'], profile:  this.formData}
   console.log(details.profile)
if(details.profile){
  this.us.createProfiler(this.formData, sessionStorage.getItem('id')).subscribe(data=>
    console.log(data))
    this.snackbar.open('Profile picture changed successfully',null, {
      duration: 3000
    });
    this.dialogRef.close()
    setTimeout(function() {
      location.reload();
    }, 1000);}



}
async onFileSelected(event) {
  if (event.target.files && event.target.files[0]) {
    let file = event.target.files[0];
    console.log(file.type);
      if(file.type == "image/jpeg" || file.type == "image/png" ) {
        this.formData = new FormData()
       
          // this.formData: FormData = new FormData();
      
          this.formData.append('files', file);   
    
      }
      else {
        this.snackbar.open('That is not a valid file type',null, {
          duration: 3000
        });
        this.formData = new FormData()

        //call validation
        this.editForm.reset();
        this.editForm.controls["profilepic"].setValidators([Validators.required]);
        this.editForm.get('profilepic').updateValueAndValidity();
      
  }
  // const file: File = event.target.files[0]




    }



}
onSubmitBio(){
  var details =  this.bioForm.controls['bio']?.value;
console.log(details)
  if(details){
    this.us.editProfile(details, sessionStorage.getItem('id')).subscribe(data=>console.log(data))
    
    this.snackbar.open('Bio changed successfully',null, {
      duration: 3000
      
    });
    this.dialogRef.close()
    setTimeout(function() {
      location.reload();
    }, 1000);
  }
 
}
      

  constructor( private fb: FormBuilder, private us: UserServiceService, private snackbar: MatSnackBar,   public dialogRef: MatDialogRef<ProfileComponent>) { }

  ngOnInit(): void {
    this.editForm = this.fb.group({
      profilepic: [null, [Validators.required]],
  
    })
    this.bioForm = this.fb.group({
      bio: ['', Validators.required, Validators.minLength(10)]

    })
  }

}
