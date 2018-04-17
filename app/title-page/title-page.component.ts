import {HostListener, Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject,ComponentRef, ComponentFactory, ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
import { AuthService } from '../user/auth.service';
import { ActivatedRoute } from '@angular/router';
import {JQUERY_TOKEN,
        SaveObjectService,
        ArrayUtilityService,
        ContenteditableModelText,
        ContenteditableModelHtml,
        MediumEditorService
        } from '../common/index';
        
        
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
        } from './index';

declare var PR;
declare var swal;

//configuration with the templates..
import {componentData} from './templates/configuration';
//var componentData = require('json!./templates/configuration.json');

@Component(componentData)


export class TitlePageComponent implements OnInit {
    
        
        @HostListener("window:scroll", ['$event'])
onWindowScroll(event) {
   let scrollPos = document.body.scrollTop;
    console.log(scrollPos);
}

      @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
      private componentFactory: ComponentFactory<any>;
      pageData:any;
      clonedPageData:any

    
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
			
		   this.route.data.subscribe((res:any)=>{
		       
           this.pageData =  JSON.parse(res['titlePageModel']._body);
           this.lastStateTitlePageModel = JSON.parse(res['titlePageModel']._body);
           this.clonedPageData = JSON.parse(res['titlePageModel']._body);
            console.log('checkThis');
            console.log(this.pageData);

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
  
	ngOnChanges(){
		this.user = this.auth.getCurrentUser();
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
                        
                        this.objectService.savePageModel(this.pageData.pageData).subscribe((res:any)=>{
                                                
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