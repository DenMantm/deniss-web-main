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
        {img:'app/assets/images/templates/Page-elements/agency-nav.PNG', class :"disabled"},    
        {img:'app/assets/images/templates/Page-elements/agency-headder.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/agency-about.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/agency-amazing-team.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/agency-portfolio.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/agency-service.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/creative-headder.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/creative-portfolio.PNG',class :""},
        {img:'app/assets/images/templates/Page-elements/creative-service.PNG',class :""}];
        
        
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