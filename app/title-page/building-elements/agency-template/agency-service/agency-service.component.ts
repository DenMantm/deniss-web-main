import { Component, Inject,Input } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';


@Component({
    selector: 'agency-service',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-service/agency-service.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-service/agency-service.component.css',
                'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyService {
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    @Input() showElementTools:boolean;
    ngOnInit(){
        }

        loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    
}