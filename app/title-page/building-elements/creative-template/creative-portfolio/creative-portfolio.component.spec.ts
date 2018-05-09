import { CreativePortfolio } from './creative-portfolio.component';
import { Component, Inject } from '@angular/core';

import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { HttpModule } from '@angular/http';

 
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { JQUERY_TOKEN,
         ContenteditableModelText,
         ContenteditableModelHtml
    
} from '../../../../common/index';
import { AuthService } from '../../../../user/index';
import {ContentEditOptionNav} from '../../../../content-edit-option-nav/content-edit-option-nav.component';
import {ChangeImages} from '../../../../change-images/change-images.component';



import {ViewUploadedImages,Base64UploadComponent} from '../../../../view-uploaded-images/index';



declare let jQuery:Object;

describe('CreativePortfolio', function () {
  let de: DebugElement;
  let comp: CreativePortfolio;
  let fixture: ComponentFixture<CreativePortfolio>;
 
  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[
            FormsModule,
            ReactiveFormsModule,
            HttpModule],
      declarations: [CreativePortfolio,ContentEditOptionNav,ViewUploadedImages,Base64UploadComponent,
                          ContenteditableModelText, //directive
                    ContenteditableModelHtml, //directive
                    ChangeImages
      ],
      providers:[AuthService, { 
        provide: Router, 
        useClass: class { navigate = jasmine.createSpy("navigate");}
    },
    {provide:JQUERY_TOKEN,useValue:jQuery}
    ]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(CreativePortfolio);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('section'));
  });
 
  it('should create component', () => expect(comp).toBeDefined() );
 
//   it('should create Change Agency About with elements', () => {
//     fixture.detectChanges();
//     const nav = de.nativeElement;
//     expect(nav.innerText).toContain(``);
//   });
});