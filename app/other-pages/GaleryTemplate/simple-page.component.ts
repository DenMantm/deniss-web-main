import {HostListener, Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject,ComponentRef, ComponentFactory, ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { ActivatedRoute } from '@angular/router';
import {JQUERY_TOKEN,
        SaveObjectService,
        ArrayUtilityService,
        ContenteditableModelText,
        ContenteditableModelHtml,
        MediumEditorService
        } from '../../common/index';
        
        
//components to import here....
import {
        AgencyService,
        AgencyPortfolio,
        AgencyHeadder,
        AgencyAmazingTeam,
        AgencyAbout,
        CreativeHeadder,
        CreativeService,
        CreativePortfolio
        } from '../../title-page/index';

declare var PR;
declare var swal;

//configuration with the templates..
import {componentData} from './configuration';
//var componentData = require('json!./templates/configuration.json');

@Component(componentData)


export class GaleryTemplate implements OnInit {
    
        
        @HostListener("window:scroll", ['$event'])
onWindowScroll(event) {
   let scrollPos = document.body.scrollTop;
    console.log(scrollPos);
}

      @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
      private componentFactory: ComponentFactory<any>;
      pageData:any;
      clonedPageData:any
      userImageList:any
      itemList:any;
      combinedArray:any;
      itemGroupList:any;
      filteredItemList:any = {};
      titleNav:any;
      titleFooter:any;
    
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
			
		   this.route.data.subscribe((res:any)=>{
		              //loading custom navbar here...
           this.titleNav = JSON.parse(res['titleNav']._body);
           this.titleFooter = JSON.parse(res['titleFooter']._body);
		   
           this.pageData =  JSON.parse(res['pageModel']._body);
           this.pageData.navbarElement = this.titleNav;
           this.pageData.footer = this.titleFooter;
           this.lastStateTitlePageModel = JSON.parse(res['pageModel']._body);
           this.lastStateTitlePageModel.navbarElement = this.titleNav;
           this.lastStateTitlePageModel.footer = this.titleFooter;
           this.clonedPageData = JSON.parse(res['pageModel']._body);
           this.clonedPageData.navbarElement = this.titleNav;
           this.clonedPageData.footer = this.titleFooter;
           
            console.log(this.pageData);
           
           
           
           
           
           
           this.userImageList = JSON.parse(res['userImageList']._body);
           
            console.log('checkThis');
            console.log(this.userImageList);
            
            //generating the list of sorted images
            
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
            
            

      })

		}
	user:any;
	menuIsSelected:boolean;
    showElementTools:boolean;
    editor:any;
    lastStateTitlePageModel:any;
    
	constructor(
				private route:ActivatedRoute,	
				private auth:AuthService,
				@Inject(JQUERY_TOKEN) private $,
	            private objectService:SaveObjectService,
                private arrayUtil:ArrayUtilityService,
                private medium:MediumEditorService){
	}
  ngAfterViewInit() {
    
  }
  
// 	ngOnChanges(){
// 		this.user = this.auth.getCurrentUser();
// 	}
	
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
                        
                        this.objectService.savePageModel(this.pageData.pageType,this.pageData.pageData).subscribe((res:any)=>{
                                                
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

        
    canDeactivate():any {
         	
    //perform if statement to compare two data structures...            	
    if (JSON.stringify(this.pageData) !== JSON.stringify(this.lastStateTitlePageModel) ) {
        
        // let userResponse = false;
        let can;
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
        (isConfirm)=> {
          if (isConfirm) {
            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
            can = true;
            //userResponse = true;
          } else {
            //swal("Cancelled", "Your imaginary file is safe :)", "error");
            //userResponse = false;
            can = false;
          }
        });
        //console.log(userResponse);
        
        
        return can
        
           // if(userResponse) this.showElementTools = false;
        
     // return userResponse
      
      
    }
    else{
        this.showElementTools = false;
        return true;
    }

}
   
   
   
   
	
	

}