import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ImageAnalyserComponent } from './image-analyser.component';

describe('ImageAnalyserComponent', () => {
  let component: ImageAnalyserComponent;
  let fixture: ComponentFixture<ImageAnalyserComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ImageAnalyserComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ImageAnalyserComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
