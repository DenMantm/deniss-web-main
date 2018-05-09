import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'agency-headder',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-headder/agency-headder.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-headder/agency-headder.component.css',
                'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyHeadder {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
        @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        
        }
        
        add(){
            console.log('add');
        }
        style(){
            console.log('style');
        }
        remove(){
            console.log('remove');
        }
       loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
}