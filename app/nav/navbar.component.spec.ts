import { NavbarComponent } from './navbar.component';
 
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { By }           from '@angular/platform-browser';
import { DebugElement } from '@angular/core';


declare let jQuery:Object;

describe('NavbarComponent', function () {
  let de: DebugElement;
  let comp: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;
 
  beforeEach(async(() => {
   TestBed.configureTestingModule({
      declarations: [NavbarComponent],
      providers:[]
    })
    .compileComponents();
  }));
 
  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    comp = fixture.componentInstance;
    de = fixture.debugElement.query(By.css('nav'));
  });
 
  it('should create component', () => expect(comp).toBeDefined() );
 
  it('should create navbar with elements', () => {
    fixture.detectChanges();
    const nav = de.nativeElement;
    expect(nav.innerText).toContain('Menu');
  });
});