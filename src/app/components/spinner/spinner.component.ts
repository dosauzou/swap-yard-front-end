import { Component, OnInit } from '@angular/core';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {


  loadingText: string =  'Looks like you viewed all items... check back later! ';

  constructor(private spinnerService: NgxSpinnerService) {
  }
  ngOnInit(): void {
    this.showSpinner()
  }

  public showSpinner(): void {
     this.spinnerService.show(undefined,
      {
        type: 'pacman',
        size: 'large',
        bdColor: 'rgba(0, 0, 0, 0)',
        color: 'white',
        fullScreen: false,
      }
    );

    // setTimeout(() => {
    //   this.spinnerService.hide();
    // }, 5000); // 5 seconds
  }

}
