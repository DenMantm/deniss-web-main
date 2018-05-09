import { FooterComponent } from './footer.component';
import { AuthService } from '../user/auth.service';
import { LoginSignupComponent } from './loginSignup/login-signup.component';
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


declare let jQuery:Object;

describe('FooterComponent', function () {
  let de: DebugElement;
  let comp: FooterComponent;
  let fixture: ComponentFixture<FooterComponent>;
 
  beforeEach(async(() => {
   TestBed.configureTestingModule({
     imports:[
            FormsModule,
            ReactiveFormsModule,
            HttpModule],
      declarations: [FooterComponent,LoginSignupComponent],
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
    fixture = TestBed.createComponent(FooterComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('footer'));
  });
 
  it('should create component', () => expect(comp).toBeDefined() );
 
  it('should create footer with elements', () => {
    fixture.detectChanges();
    const nav = de.nativeElement;
    expect(nav.innerText).toContain('Login');
  });
});