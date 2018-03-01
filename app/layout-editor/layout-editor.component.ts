import { Component, Inject,Input } from '@angular/core';
import { JQUERY_TOKEN, SaveObjectService } from '../common/index';
import { AuthService } from '../user/index';
import { LayoutEditorService } from './services/layout-editor.service';
import { HtmlToCanvasService } from './services/html-to-canvas.service';
import { SortablejsOptions, SortablejsModule } from 'angular-sortablejs';


declare var imagify
declare var window
@Component({
    selector: 'layout-editor',
    templateUrl: 'app/layout-editor/layout-editor.component.html',
    styleUrls: ['app/layout-editor/layout-editor.component.css']
})

export class LayoutEditor {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    imageStructure:any;
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService,
                private ls:LayoutEditorService,
                private img:HtmlToCanvasService,
                private sv:SaveObjectService
                ){
    }
    ngOnInit(){
        
        this.imageStructure = [
        {id:1,img:'app/assets/images/templates/Page-elements/agency-nav.PNG', class :"disabled"},
        {id:2,img:'app/assets/images/templates/Page-elements/agency-headder.PNG',class :""},
        {id:3,img:'app/assets/images/templates/Page-elements/agency-about.PNG',class :""},
        {id:4,img:'app/assets/images/templates/Page-elements/agency-amazing-team.PNG',class :""},
        {id:5,img:'app/assets/images/templates/Page-elements/agency-portfolio.PNG',class :""},
        {id:6,img:'app/assets/images/templates/Page-elements/agency-service.PNG',class :""},
        {id:7,img:'app/assets/images/templates/Page-elements/creative-headder.PNG',class :""},
        {id:8,img:'app/assets/images/templates/Page-elements/creative-portfolio.PNG',class :""},
        {id:9,img:'app/assets/images/templates/Page-elements/creative-service.PNG',class :""}];
        }
        
    ngAfterViewInit(){
        
        //Add some sort of the loading symbol here after....
        //create image representation of the page here.....
        //load navbar separatley
        this.img.getScreenshotOfElement(this.$("#mainNav").get(0), 0, 0,
        this.$("#mainNav").get(0).clientWidth, 
        this.$("#mainNav").get(0).clientHeight,
        (data) => {
            this.$("#img-mainNav").attr("src", "data:image/png;base64,"+data);
        });
        //load footer separatley
        this.img.getScreenshotOfElement(this.$("#"+this.pageData.footer.elementTmpName).get(0), 0, 0, 
        this.$("#"+this.pageData.footer.elementTmpName).get(0).clientWidth, 
        this.$("#"+this.pageData.footer.elementTmpName).get(0).clientHeight,
        (data) => {
            this.$("#img-"+this.pageData.footer.elementTmpName).attr("src", "data:image/png;base64,"+data);
        });
        
        this.pageData.pageData.forEach(i => {
            this.img.getScreenshotOfElement(this.$("#"+i.elementTmpName+i.elementSequence).get(0), 0, 0, 
            this.$("#"+i.elementTmpName+i.elementSequence).get(0).clientWidth, 
            this.$("#"+i.elementTmpName+i.elementSequence).get(0).clientHeight,
            (data) => {
                this.$("#img-"+i.elementTmpName+i.elementSequence).attr("src", "data:image/png;base64,"+data);
            });
        })
        
        
        
        
        //load all elements from the current title page
        // this.ls.getCurrentLayout().subscribe(res=>{
            
        // });
        
        //take snapshot of the image here for testing purposes...

        
        // imagify(this.$('#about')[0], (base64) => {
        //               this.$('#testimage').attr('src', base64);
        //             });
        
        
        this.$('.sortable').sortable();
        this.$('.exclude').sortable({
				items: ':not(.disabled)'
			});
    }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   reorder(){
       let sortedIDs = this.$( ".sortable" ).sortable( "toArray" );
       //algorithm to rearrange items here...
       let tmpArray=[];

       for(let i =0; i < sortedIDs.length;i++){
           tmpArray.push(this.pageData.pageData[sortedIDs[i]])
           this.pageData.pageData[sortedIDs[i]].elementSequence = i;
       }
       
      this.sv.changeTitlePageAlignment(tmpArray).subscribe(s => {
          console.log(s);
          //refresh page logic...
          window.location.reload();
      });
       console.log(tmpArray);
   }
   
   //checking the sorta ble allignment
   
   

   
    
}