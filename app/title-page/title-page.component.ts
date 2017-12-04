import {Component, ViewChild, ElementRef, AfterViewInit,OnInit, Inject,ComponentRef, ComponentFactory, ComponentFactoryResolver,ViewContainerRef} from '@angular/core';
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
    
      @ViewChild('placeholder', {read: ViewContainerRef}) viewContainerRef;
      private componentFactory: ComponentFactory<any>;
    
    
    
    
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
			
		   this.route.data.subscribe((res:any)=>{ 
           this.titlePageModel =  JSON.parse(res['titlePageModel']._body);
           this.lastStateTitlePageModel = JSON.parse(res['titlePageModel']._body);
           
       })

		}
	user:any;
	menuIsSelected:boolean;
    showElementTools:boolean;
    editor:any;
    titlePageModel:any;
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
        	this.lastStateTitlePageModel =  this.arrayUtil.deepCopy(this.titlePageModel);
             
            PR.prettyPrint();
        }

        
    canDeactivate():any {
         	
    //perform if statement to compare two data structures...            	
    if (JSON.stringify(this.titlePageModel) !== JSON.stringify(this.lastStateTitlePageModel) ) {
        
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
            //swal("Deleted!", "Your imaginary file has been deleted.", "success");
            obs(true);
            //userResponse = true;
          } else {
            //swal("Cancelled", "Your imaginary file is safe :)", "error");
            //userResponse = false;
            obs(false);
          }
        });
        //console.log(userResponse);
        
        
        return promise.then(res => res)
        
           // if(userResponse) this.showElementTools = false;
        
     // return userResponse
      
      
    }
    else{
        this.showElementTools = false;
        return true;
    }

}
   
   
   
   
	
	

}