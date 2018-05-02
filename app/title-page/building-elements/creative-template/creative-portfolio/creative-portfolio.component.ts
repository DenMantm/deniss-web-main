import { Component, Inject,Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';


@Component({
    selector: 'creative-portfolio',
    templateUrl: 'app/title-page/building-elements/creative-template/creative-portfolio/creative-portfolio.component.html',
    styleUrls: ['app/title-page/building-elements/creative-template/creative-portfolio/creative-portfolio.component.css',
                'app/title-page/building-elements/creative-template/combined.css']
})

export class CreativePortfolio {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    
    @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
    }
        loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
}