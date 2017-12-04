import { Component, HostListener, ElementRef, HostBinding,enableProdMode } from '@angular/core';


//enableProdMode();

@Component({
    selector:'body',
    template:`
              <router-outlet></router-outlet>
              
              `
})

export class MyAppComponent {
         
constructor(){

}


}