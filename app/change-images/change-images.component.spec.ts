import { ChangeImages } from './change-images.component';
import { AuthService } from '../user/auth.service';
import { Component, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { IUser } from '../user/user.model';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

 
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JQUERY_TOKEN } from '../common/index';

import { Base64UploadComponent } from '../view-uploaded-images/index';


declare let jQuery:Object;

describe('ChangeImages', function () {
  let de: DebugElement;
  let comp: ChangeImages;
  let fixture: ComponentFixture<ChangeImages>;
 
  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[
            FormsModule,
            ReactiveFormsModule,
            HttpModule],
      declarations: [ChangeImages,Base64UploadComponent],
      providers:[AuthService,    { 
        provide: Router, 
        useClass: class { navigate = jasmine.createSpy("navigate");}
    },
    {provide:JQUERY_TOKEN,useValue:jQuery}
    ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeImages);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('.modal'));
  });
 
  it('should create component', () => expect(comp).toBeDefined() );
 
  it('should create Change images with elements', () => {
    fixture.detectChanges();
    const nav = de.nativeElement;
    expect(nav.innerText).toContain(``);
  });
});