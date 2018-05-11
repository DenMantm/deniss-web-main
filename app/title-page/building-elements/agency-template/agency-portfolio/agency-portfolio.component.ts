import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'agency-portfolio',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-portfolio/agency-portfolio.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-portfolio/agency-portfolio.component.css',
                 'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyPortfolio {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    template:any;
        @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
                this.template =         {
            "title": "Threads",
            "subtitle": "Illustration",
            "smallImage": {
                "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-thumbnail.jpg"
            },
            "modal": {
                "title": "PROJECT NAME",
                "subtitle": "Lorem ipsum dolor sit amet consectetur.",
                "bigImage": {
                    "img": "app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg"
                },
                "text": "Use this area to describe your project. Lorem ipsum dolor sit amet, consectetur adipisicing elit. Est blanditiis dolorem culpa incidunt minus dignissimos deserunt repellat aperiam quasi sunt officia expedita beatae cupiditate, maiores repudiandae, nostrum, reiciendis facere nemo!"
            }
        };
    }
            add(){
           this.pageData.data.push(JSON.parse(JSON.stringify(this.template)))
        }
            ngAfterViewInit(){
                
            this.$('.sortable-agency-portfolio').sortable({
                cancel: ':input,button,.editable',
                update: (event, ui) => {
                            let linkOrderData = this.$(".sortable-agency-portfolio").sortable("toArray",{attribute:'data'});
                            let tmpArray = []
                            linkOrderData.forEach( item =>{tmpArray.push(this.pageData.data[item])});
                            this.pageData.data = tmpArray;
                            }
            });
            
            this.$('.sortable-agency-portfolio').sortable("disable");
        }
        ngOnChanges(){
            if(this.showElementTools != undefined){
                if(this.showElementTools){
                    this.$('.sortable-agency-portfolio').sortable('enable');
                }
                    
                else
                    this.$('.sortable-agency-portfolio').sortable("disable");
            }
        }
    ngOnInit(){
        }
            loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
}