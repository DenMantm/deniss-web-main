import { Component, Inject,Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'agency-amazing-team',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-amazing-team/agency-amazing-team.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-amazing-team/agency-amazing-team.component.css',
                 'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyAmazingTeam {
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