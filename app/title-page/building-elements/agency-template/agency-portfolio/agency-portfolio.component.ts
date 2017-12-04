import { Component, Inject,Input } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'agency-portfolio',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-portfolio/agency-portfolio.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-portfolio/agency-portfolio.component.css',
                 'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyPortfolio {
    @Input() showElementTools:boolean;
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        }
            loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
}