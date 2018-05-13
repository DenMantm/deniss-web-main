import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN, ArrayUtilityService,
         MediumEditorService, } from '../../../../common/index';
import { AuthService } from '../../../../user/index';
import { ChangeImages } from '../../../../change-images/index';

declare var PR;

@Component({
    selector: 'blog-body',
    templateUrl: 'app/title-page/building-elements/blog-template/blog-body/blog-body.component.html',
    styleUrls: ['app/title-page/building-elements/blog-template/blog-body/blog-body.component.css']
})

export class BlogBody {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    
        @ViewChild('uploadImages') modal:any;
        @ViewChild('changeImg') changeImg:ChangeImages;
    blogPost:any
    editor:any
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService,private arrayUtil:ArrayUtilityService,
            private medium:MediumEditorService){
    }
    ngOnInit(){
        this.blogPost = this.pageData.data;
        }

        add(){
            console.log('add');
        }
        
            ngAfterViewInit(){
    	   PR.prettyPrint();
    }

       loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
    remove(item,itemList){
        this.arrayUtil.removeItem(item,itemList);
   }
   moveDown(item,itemList){
       
      this.arrayUtil.moveItemDown(item,itemList); 
   }
   moveUp(item,itemList){
       
       this.arrayUtil.moveItemUp(item,itemList); 
   }
   addElementDiv(list){
        this.arrayUtil.addNewElementDiv(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementPre(list){
        this.arrayUtil.addNewElementPre(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementImg(list){
        this.arrayUtil.addNewElementImg(list);
        setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   changeImage(image){
       this.changeImg.imgModalForBlog(image);
   }
   
   
   
   
   
}