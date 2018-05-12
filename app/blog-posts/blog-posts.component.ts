import { Component, HostListener, OnInit, Renderer, Inject, } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { AuthService } from '../user/auth.service';
import { IUser } from '../user/user.model';
import { JQUERY_TOKEN,SaveObjectService,MediumEditorService } from '../common/index';
import { ActivatedRoute, Router } from '@angular/router';

declare var PR;
declare var swal;
// declare var CKEDITOR;

@Component({
    templateUrl:'app/blog-posts/blog-posts.component.html',
    styleUrls:['app/blog-posts/blog-posts.component.css']
})


export class BlogPostsComponent implements OnInit {
    currentUser:any;
    user:IUser;
    blogPostList:any;
    createBlPost:FormGroup;
    blogPostName:FormControl;
    blogPostDescription:FormControl;
    pageData:any;
    
	menuIsSelected:boolean;
    showElementTools:boolean;
    editor:any;
    lastStateTitlePageModel:any;
    clonedPageData:any;
    userImageList:any
    

      itemList:any;
      combinedArray:any;
      itemGroupList:any;
      filteredItemList:any = {};
      
constructor(private auth:AuthService,
			@Inject(JQUERY_TOKEN) private $,
			private route:ActivatedRoute,
			private objectService:SaveObjectService,
			private router:Router,
			private medium:MediumEditorService,
			
			){}

//form
    ngOnInit(){
       this.currentUser = this.route.snapshot.data['User'];
       this.blogPostList = this.route.snapshot.data['BlogPostList'];
       		   this.route.data.subscribe((res:any)=>{
           
           this.pageData =  JSON.parse(res['titlePageModel']._body);
           this.lastStateTitlePageModel = JSON.parse(res['titlePageModel']._body);
           this.clonedPageData = JSON.parse(res['titlePageModel']._body);
           
           this.userImageList = JSON.parse(res['userImageList']._body);
           
       })
       
       this.blogPostName = new FormControl('',Validators.required)
        this.blogPostDescription = new FormControl('',Validators.required)
        this.createBlPost = new FormGroup({
            blogPostName:this.blogPostName,
            blogPostDescription:this.blogPostDescription
        })
       
       
       
       
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
    	   
    	   
    	   
    	   
    	   
    	   
    	   
//     	   if ( CKEDITOR.env.ie && CKEDITOR.env.version < 9 )
// 	CKEDITOR.tools.enableHtml5Elements( document );

// // The trick to keep the editor in the sample quite small
// // unless user specified own height.
// CKEDITOR.config.height = 'auto';
// CKEDITOR.config.width = 'auto';

// 	var wysiwygareaAvailable = isWysiwygareaAvailable(),
// 		isBBCodeBuiltIn = !!CKEDITOR.plugins.get( 'bbcode' );

	
// 		var editorElement = CKEDITOR.document.getById( 'editor' );

// 		// :(((
// 		if ( isBBCodeBuiltIn ) {
// 			editorElement.setHtml(
// 				'Hello world!\n\n' +
// 				'I\'m an instance of [url=https://ckeditor.com]CKEditor[/url].'
// 			);
// 		}

// 		// Depending on the wysiwygare plugin availability initialize classic or inline editor.
// 		if ( wysiwygareaAvailable ) {
// 			CKEDITOR.replace( 'editor' );
// 		} else {
// 			editorElement.setAttribute( 'contenteditable', 'true' );
// 			CKEDITOR.inline( 'editor' );

// 			// TODO we can consider displaying some info box that
// 			// without wysiwygarea the classic editor may not work.
// 		}


// 	function isWysiwygareaAvailable() {
// 		// If in development mode, then the wysiwygarea must be available.
// 		// Split REV into two strings so builder does not replace it :D.
// 		if ( CKEDITOR.revision == ( '%RE' + 'V%' ) ) {
// 			return true;
// 		}

// 		return !!CKEDITOR.plugins.get( 'wysiwygarea' );
// 	}

    	   
    	   
    	   
    	   
    	   
    	   
    	   
    	   
    }

   loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
   editClick(){
          
        console.log('edit click')
       //Extra variable here
       this.showElementTools = true;
        this.editor = this.medium.createInstance()
        }
        disableClick(){
            this.showElementTools = false;
            this.editor.destroy();
            
        }
        saveClick(){
        	
        	//same as the current model
        	
        	if (JSON.stringify(this.pageData) !== JSON.stringify(this.lastStateTitlePageModel) ) {
        	    
        	    this.lastStateTitlePageModel =  JSON.parse(JSON.stringify(this.pageData));
            
                    swal({
                      title: "Are you sure?",
                      text: "Save changes?",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Yes",
                      cancelButtonText: "Cancel",
                      closeOnConfirm: true,
                      closeOnCancel: true
                    },
                    (isConfirm) => {
                      if (isConfirm) {
                        //swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        //userResponse = true;

                        
                        this.objectService.saveBlogSection(this.pageData.blog).subscribe((res:any)=>{
                                                
                        });
                        
                        //notify user that everything was saved here...

                      } else {
                        //swal("Cancelled", "Your imaginary file is safe :)", "error");
                        //userResponse = false;
                      }
                    });
        	    
        	    
        	}
        	else{
        	    swal("There is nothin to save, no schema changes made", "error");
        	}

            
        }
    createBlogPost(fValues){
        
        let tmpPost = {title:fValues.blogPostName,
                       description:fValues.blogPostDescription,
                       //Leaving this to support template functionality after
                       blogElements:[{
                        "id": 0,
                        "type": 'div',
                        "style": null,
                        "text": "Type in the content here..."
                    }]};
        
        this.objectService.newBlogPost(tmpPost).subscribe( (res:any) => {
            //console.log(res)
                let newEntity = JSON.parse(res._body);
                this.router.navigate(['/blog-posts',newEntity._id]);
        });
    }
           //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
   
   


}

	
