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

    
		ngOnInit(): void {
			this.user = this.route.snapshot.data['user'];
			
		   this.route.data.subscribe((res:any)=>{
		       
           this.pageData =  JSON.parse(res['titlePageModel']._body);
           this.lastStateTitlePageModel = JSON.parse(res['titlePageModel']._body);
           console.log(this.pageData);
           
        // let dataAgencyService = [{sequence:0,
        //              icon:'fa-shopping-cart',
        //              heading:'E-Commerce',
        //              text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        // },{sequence:1,
        //              icon:'fa-laptop',
        //              heading:'Responsive Design',
        //              text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. '
        // },
        // {sequence:2,
        //              icon:'fa-lock',
        //              heading:'Web Security',
        //              text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
        // }];
        
        // let dataCreativeHeadder = {"title":"Your Favorite Source of Free Bootstrap Themes",
        //                           "subtitle":"Start Bootstrap can help you build better websites using the Bootstrap CSS framework! Just download your template and start going, no strings attached!"};
        
        // let dataCreativeService =  [{sequence:0,
        //                          icon:'fa-diamond',
        //                          heading:'Sturdy Templates',
        //                          text:'Our templates are updated regularly so they dont break.'},
        //                          {sequence:1,
        //                          icon:'fa-paper-plane',
        //                          heading:'Ready to Ship',
        //                          text:'You can use this theme as is, or you can make changes!'},
        //                         {sequence:2,
        //                          icon:'fa-newspaper-o',
        //                          heading:'Up to Date',
        //                          text:'We update dependencies to keep things fresh.'},
        //                         {sequence:3,
        //                          icon:'fa-heart',
        //                          heading:'Made with Love',
        //                          text:'You have to make your websites with love these days!'
        //                         }];
                                
        // let dataCreativePortfolio = [{sequence:0,
        //                          icon:'fa-diamond',
        //                          heading:'Sturdy Templates',
        //                          text:'Our templates are updated regularly so they dont break.'},
        //                          {sequence:1,
        //                          icon:'fa-paper-plane',
        //                          heading:'Ready to Ship',
        //                          text:'You can use this theme as is, or you can make changes!'},
        //                         {sequence:2,
        //                          icon:'fa-newspaper-o',
        //                          heading:'Up to Date',
        //                          text:'We update dependencies to keep things fresh.'},
        //                         {sequence:3,
        //                          icon:'fa-heart',
        //                          heading:'Made with Love',
        //                          text:'You have to make your websites with love these days!'
        //                         }];
        
        // let dataAgencyHeadder = "";
        // let dataAgencyPortfolio = "";
        // let dataAgencyAmazingTeam = "";
        // let dataAgencyAbout =  "";
        // let dataAgencyFooter  = "";
        
           
        // //     <layout-editor *ngIf="loginCheck() && showElementTools" ></layout-editor>
        // //     <agency-nav></agency-nav>
        // //     <creative-headder [showElementTools]="showElementTools"></creative-headder>
        // //     <agency-service [showElementTools]="showElementTools"></agency-service>
        // //     <creative-service [showElementTools]="showElementTools"></creative-service>
        // //     <creative-portfolio [showElementTools]="showElementTools"></creative-portfolio>
        // //     <agency-headder [showElementTools]="showElementTools" ></agency-headder>
        // //     <agency-portfolio [showElementTools]="showElementTools" ></agency-portfolio>
        // //     <agency-amazing-team [showElementTools]="showElementTools" ></agency-amazing-team>
        // //     <agency-about [showElementTools]="showElementTools"></agency-about>
        // //     <footer-component></footer-component>
           
           
        //   this.pageData = {"pageName":"Title Page",
        //                     "navbarElement":{"elementTmpName":"agency-nav",
        //                                   "elementTmpType":"nav",
        //                                   "elementSequence":null,
        //                                   "title":null,
        //                                   "data":dataAgencyFooter},
        //                     "footer": {"elementTmpName":"agency-footer",
        //                                   "elementTmpType":"footer",
        //                                   "elementSequence":null,
        //                                   "title":null,
        //                                   "data":dataAgencyFooter},
        //                     "pageType":"titlepage",
        //                     "pageData":[{"elementTmpName":"creative-headder",
        //                                   "elementTmpType":"headder",
        //                                   "elementSequence":0,
        //                                   "title":dataCreativeHeadder,
        //                                   "data":null},
        //                                  {"elementTmpName":"agency-service",
        //                                   "elementTmpType":"service",
        //                                   "elementSequence":1,
        //                                   "title":{"title":"Services",
        //                                             "subtitle":"Lorem ipsum dolor sit amet consectetur."},
        //                                   "data":dataAgencyService},
        //                                  {"elementTmpName":"creative-service",
        //                                   "elementTmpType":"service",
        //                                   "title":{"title":"servicex"},
        //                                   "elementSequence":2,
        //                                   "data":dataCreativeService},
        //                                 {"elementTmpName":"creative-portfolio",
        //                                   "elementTmpType":"portfolio",
        //                                   "elementSequence":3,
        //                                   "title":null,
        //                                   "data":dataCreativePortfolio},
        //                                 {"elementTmpName":"agency-headder",
        //                                   "elementTmpType":"headder",
        //                                   "elementSequence":4,
        //                                   "title":{"title":"titlex","subtitle":"saddsaew"},
        //                                   "data":dataAgencyHeadder},
        //                                 {"elementTmpName":"agency-portfolio",
        //                                   "elementTmpType":"portfolio",
        //                                   "elementSequence":5,
        //                                   "title":null,
        //                                   "data":dataAgencyPortfolio},
        //                                 {"elementTmpName":"agency-amazing-team",
        //                                   "elementTmpType":"team",
        //                                   "elementSequence":6,
        //                                   "title":null,
        //                                   "data":dataAgencyAmazingTeam},
        //                                 {"elementTmpName":"agency-about",
        //                                   "elementTmpType":"about",
        //                                   "elementSequence":7,
        //                                   "title":null,
        //                                   "data":dataAgencyAbout}
        //                                   ]};
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