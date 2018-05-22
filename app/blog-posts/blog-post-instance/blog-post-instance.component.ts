import { Component, HostListener, OnInit, Renderer, Inject,Input,ViewChild,ElementRef } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../user/auth.service';
import { IUser } from '../../user/user.model';
import { ChangeImages } from '../../change-images/index';
import { JQUERY_TOKEN,
         SaveObjectService,
         ArrayUtilityService,
         MediumEditorService,
} from '../../common/index';
import { ActivatedRoute } from '@angular/router';

declare var PR;
declare var swal;
@Component({
    templateUrl:'app/blog-posts/blog-post-instance/blog-post-instance.component.html',
    styleUrls:['app/blog-posts/blog-post-instance/blog-post-instance.component.css']
})


export class BlogPostInstanceComponent implements OnInit {
    currentUser:any;
    user:IUser;
    blogPost:any;
    lastStateBlogPost:any;
    showElementTools:boolean
    editor:any
    pageData:any;
    userImageList:any;
    
    combinedArray:any
    itemGroupList:any
     filteredItemList:any = {};
     itemList:any;
    @ViewChild('changeImg') changeImg:ChangeImages;
    @ViewChild('uploadImages') modal:any;
    
constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute,
			private objectService:SaveObjectService,
			private arrayUtil:ArrayUtilityService,
            private medium:MediumEditorService,
            private router:Router
			){}

//form
    ngOnInit(){
       this.currentUser = this.route.snapshot.data['User'];
       this.route.data.subscribe((res:any)=>{
           this.pageData = JSON.parse(res['titlePageModel']._body)
           this.userImageList = JSON.parse(res['userImageList']._body);
           this.blogPost =  JSON.parse(res['BlogPost']._body);
           this.lastStateBlogPost = JSON.parse(res['BlogPost']._body);
       })

       console.log(this.blogPost);
    //     this.route.params.subscribe(params => {

    //                 let blogId = params['blogId'];
    //                 this.objectService.loadBlogPost(blogId).subscribe( (res:any) => {
                       
    //                   this.blogPost = JSON.parse(res._body);
    //                     console.log(this.blogPost);
                        
                        
    //                 });

    // });
                           this.itemList = [{"itemName":"app/assets/bootstrap-templates/img-tmp1/header.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/header-bg.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/blog-template/about-bg.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/blog-template/contact-bg.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/blog-template/home-bg.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/blog-template/post-bg.jpg","itemGroup":"Backgrounds"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/1.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/2.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/3.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/4.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/5.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/6.jpg","itemGroup":"Small Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/1.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/2.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/3.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/4.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/1.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/2.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/3.jpg","itemGroup":"Icon Size"}
                      ];
                      
            
            
                this.combinedArray = this.itemList.concat(this.userImageList);
                
                this.itemGroupList = [];
            
                this.combinedArray.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
                
                this.filteredItemList.obj1 = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);
                this.filteredItemList.obj2 = this.itemGroupList;
                this.filteredItemList.obj3 = this.combinedArray;
                this.filteredItemList.obj4 = this;
       
       
       
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
        //setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementPre(list){
        this.arrayUtil.addNewElementPre(list);
        //setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   addElementImg(list){
        this.arrayUtil.addNewElementImg(list);
        //setTimeout(()=>{ this.editor = this.medium.createInstance() }, 500);
   }
   changeImage(image){
       this.changeImg.imgModalForBlog(image);
   }
   
   
   editClick(){
       //Extra variable here
       this.showElementTools = true;
        this.editor = this.medium.createInstance();
    //           this.$('.editable').mediumInsert({
    //     editor: this.editor
    // });
        }
        disableClick(){
            this.showElementTools = false;
            this.editor.destroy();
            
        }
        saveClick(){
            console.log(this.blogPost);
            this.objectService.editBlogPost(this.blogPost).subscribe(res => {
            
            //console.log(res)
            this.lastStateBlogPost =  this.arrayUtil.deepCopy(this.blogPost);
                
            }
            );
            //Save to be created here
            
            
            PR.prettyPrint();
        }
        
            canDeactivate():any {
                if (JSON.stringify(this.blogPost) !== JSON.stringify(this.lastStateBlogPost) ) {
                    
                //     let userResponse = window.confirm('Discard changes?');
                //         if(userResponse) this.showElementTools = false;
                    
                //   return userResponse
                    let obs;
        
        let promise = new Promise<any>( subsc => obs = subsc );
        
        // let userResponse = false;
        
        swal({
          title: "Are you sure?",
          text: "Discard changes?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        function(isConfirm){
          if (isConfirm) {
            obs(true);

          } else {
            obs(false);
          }
        });
        //console.log(userResponse);
        
        
        return promise.then(res => 
        { console.log('DEBUG: '+ res )
        return res
            
        }
        )
                }
                else{
                 this.showElementTools = false;
                 return true;
                }

}

    background(){
       this.modal.openModal();
   }
   add(){
       
   }
   removePost(){
       
       
       
        swal({
          title: "Are you sure?",
          text: "Remove Post?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        (isConfirm)=>{
          if (isConfirm) {
            //removing.....
            this.blogPost.isDeleted = true;
            
            
            this.objectService.editBlogPost(this.blogPost).subscribe(res => {
            
            
            this.lastStateBlogPost =  this.arrayUtil.deepCopy(this.blogPost);
            
            //console.log(res)
           this.router.navigate(['/blog-posts']);
                
            }
            );
            
            
            
            
          } else {
          }
        });
       
       
       
       
       
       
       console.log('remove clicked...');
       
       
       
       
   }

   

}

	
