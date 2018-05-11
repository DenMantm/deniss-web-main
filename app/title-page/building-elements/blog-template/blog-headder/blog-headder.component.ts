import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'blog-headder',
    templateUrl: 'app/title-page/building-elements/blog-template/blog-headder/blog-headder.component.html',
    styleUrls: ['app/title-page/building-elements/blog-template/blog-headder/blog-headder.component.css']
})

export class BlogHeadder {
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

       loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
}