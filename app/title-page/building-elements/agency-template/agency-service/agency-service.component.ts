import { Component, Inject,Input,ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';


@Component({
    selector: 'agency-service',
    templateUrl: 'app/title-page/building-elements/agency-template/agency-service/agency-service.component.html',
    styleUrls: ['app/title-page/building-elements/agency-template/agency-service/agency-service.component.css',
                'app/title-page/building-elements/agency-template/combined.css']
})

export class AgencyService {
    data:any;
    template:any;
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    @Input() pageData:any;
    @Input() showElementTools:boolean;
    @Input() filteredItemList:any;
        @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    ngOnInit(){
        
        console.log(this.pageData);
        
        this.data = this.pageData.data;
        // [{sequence:0,
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
        
        this.template = {sequence:0,
                     icon:'fa-shopping-cart',
                     heading:'E-Commerce',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        };

        }
        ngAfterViewInit(){

                this.$('.sortable-agency-service').sortable({
                cancel: ':input,button,.editable',
                update: (event, ui) => {
                            let linkOrderData = this.$(".sortable-agency-service").sortable("toArray",{attribute:'data'});
                            let tmpArray = []
                            linkOrderData.forEach( item =>{tmpArray.push(this.pageData.data[item])});
                            this.pageData.data = tmpArray;
                            }
            });
            this.$('.sortable-agency-service').sortable("disable");
        }
        ngOnChanges(){
            console.log('DEBUG..');
            console.log(this.showElementTools);
            if(this.showElementTools != undefined){
                if(this.showElementTools){
                    this.$('.sortable-agency-service').sortable('enable');
                                    let linkOrderData = this.$('.sortable-creative-service').sortable('serialize');
                console.log('Sortable here...');
                console.log(linkOrderData);
                }
                else{
                    this.$('.sortable-agency-service').sortable("disable");
                    console.log('dis');
                }
            }
            
            
        }
        
        add(){
            this.data.push(this.template)
        }
        style(){
            console.log('style');
        }
        remove(){
            console.log('remove');
        }
        
        loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    
}