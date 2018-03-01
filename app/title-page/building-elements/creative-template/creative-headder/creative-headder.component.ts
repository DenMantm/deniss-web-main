import { Component, Inject, Input } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';


@Component({
    selector: 'creative-headder',
    templateUrl: 'app/title-page/building-elements/creative-template/creative-headder/creative-headder.component.html',
    styleUrls: ['app/title-page/building-elements/creative-template/creative-headder/creative-headder.component.css',
                'app/title-page/building-elements/creative-template/combined.css']
})

export class CreativeHeadder {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    
    
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    
}