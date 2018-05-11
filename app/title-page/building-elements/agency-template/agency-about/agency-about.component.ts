import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';


@Component({
    selector: 'agency-about',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-about/agency-about.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-about/agency-about.component.css',
                'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyAbout {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    @ViewChild('uploadImages') modal:any;
    template:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
                this.template =  {
            "title": "2009-2011 Our Humble Beginnings",
            "subtitle": "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Sunt ut voluptatum eius sapiente, totam reiciendis temporibus qui quibusdam, recusandae sit vero unde, sed, incidunt et ea quo dolore laudantium consectetur!",
            "img": "app/assets/bootstrap-templates/img-tmp2/about/1.jpg"
        };
        }
                    ngAfterViewInit(){
            this.$('.sortable-about').sortable({
                cancel: ':input,button,.editable',
                update: (event, ui) => {
                            let linkOrderData = this.$(".sortable-about").sortable("toArray",{attribute:'data'});
                            let tmpArray = []
                            linkOrderData.forEach( item =>{tmpArray.push(this.pageData.data[item])});
                            this.pageData.data = tmpArray;
                            }
            });
            this.$('.sortable-about').sortable("disable");
        }
        ngOnChanges(){
            if(this.showElementTools != undefined){
                if(this.showElementTools){
                    this.$('.sortable-about').sortable('enable');
                }
                    
                else
                    this.$('.sortable-about').sortable("disable");
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