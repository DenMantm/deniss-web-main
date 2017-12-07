import { Component, Inject,Input } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';
import { AuthService } from '../user/index';


@Component({
    selector: 'layout-editor',
    templateUrl: 'app/layout-editor/layout-editor.component.html',
    styleUrls: ['app/layout-editor/layout-editor.component.css']
})

export class LayoutEditor {
    @Input() showElementTools:boolean;
    imageStructure:any;
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
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
        this.$('.sortable').sortable();
        this.$('.exclude').sortable({
				items: ':not(.disabled)'
			});
    }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    
    
}