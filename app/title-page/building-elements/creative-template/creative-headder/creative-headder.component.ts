import { Component, Inject, Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';
import { ViewUploadedImages } from '../../../../view-uploaded-images/index';

@Component({
    selector: 'creative-headder',
    templateUrl: 'app/title-page/building-elements/creative-template/creative-headder/creative-headder.component.html',
    styleUrls: ['app/title-page/building-elements/creative-template/creative-headder/creative-headder.component.css',
                'app/title-page/building-elements/creative-template/combined.css']
})

export class CreativeHeadder {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    
    @ViewChild('uploadImages') modal:ViewUploadedImages;
    background(){
       this.modal.openModal();
   }
    
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        console.log(this.pageData);
        }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
           add(){
            console.log('add');
        }

    
}