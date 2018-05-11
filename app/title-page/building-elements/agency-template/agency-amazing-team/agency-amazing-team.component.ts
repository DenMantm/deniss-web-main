import { Component, Inject,Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'agency-amazing-team',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-amazing-team/agency-amazing-team.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-amazing-team/agency-amazing-team.component.css',
                 'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyAmazingTeam {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    template:any;
        @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        this.template = {
            "title": "Kay Garland",
            "subtitle": "Lead Designer",
            "img": "app/assets/bootstrap-templates/img-tmp2/team/1.jpg"
        }
        }
            ngAfterViewInit(){
            this.$('.sortable-amazing-team').sortable({
                cancel: ':input,button,.editable',
                update: (event, ui) => {
                            let linkOrderData = this.$(".sortable-amazing-team").sortable("toArray",{attribute:'data'});
                            let tmpArray = []
                            linkOrderData.forEach( item =>{tmpArray.push(this.pageData.data[item])});
                            this.pageData.data = tmpArray;
                            }
            });
            this.$('.sortable-amazing-team').sortable("disable");
        }
        ngOnChanges(){
            if(this.showElementTools != undefined){
                if(this.showElementTools){
                    this.$('.sortable-amazing-team').sortable('enable');
                }
                    
                else
                    this.$('.sortable-amazing-team').sortable("disable");
            }
        }
    
    
        add(){
            this.pageData.data.push(JSON.parse(JSON.stringify(this.template)))
        }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
    }
   }