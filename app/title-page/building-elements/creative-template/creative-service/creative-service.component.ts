import { Component, Inject,Input, ViewChild } from '@angular/core';
import { JQUERY_TOKEN } from '../../../../common/index';
import { AuthService } from '../../../../user/index';

@Component({
    selector: 'creative-service',
    templateUrl: 'app/title-page/building-elements/creative-template/creative-service/creative-service.component.html',
    styleUrls: ['app/title-page/building-elements/creative-template/creative-service/creative-service.component.css',
                'app/title-page/building-elements/creative-template/combined.css']
})

export class CreativeService {
    data:any
    template:any
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    @Input() filteredItemList:any;
        @ViewChild('uploadImages') modal:any;
    background(){
       this.modal.openModal();
   }
    constructor(@Inject(JQUERY_TOKEN) private $,private auth:AuthService){
    }
    ngOnInit(){
        
        this.data = this.pageData.data;
        //         this.data = [{sequence:0,
        //              icon:'fa-diamond',
        //              heading:'Sturdy Templates',
        //              text:'Our templates are updated regularly so they dont break.'
        // },{sequence:1,
        //              icon:'fa-paper-plane',
        //              heading:'Ready to Ship',
        //              text:'You can use this theme as is, or you can make changes!'
        // },
        // {sequence:2,
        //              icon:'fa-newspaper-o',
        //              heading:'Up to Date',
        //              text:'We update dependencies to keep things fresh.'
        // },
        //         {sequence:3,
        //              icon:'fa-heart',
        //              heading:'Made with Love',
        //              text:'You have to make your websites with love these days!'
        // }];
        
        this.template = {sequence:0,
                     icon:'fa-shopping-cart',
                     heading:'E-Commerce',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        };

        }
        
        ngAfterViewInit(){
            this.$('.sortable-creative-service').sortable({cancel: ':input,button,.editable'});
            this.$('.sortable-creative-service').sortable("disable");
        }
        ngOnChanges(){
            if(this.showElementTools != undefined){
                if(this.showElementTools)
                    this.$('.sortable-creative-service').sortable('enable');
                else
                    this.$('.sortable-creative-service').sortable("disable");
            }
        }
    
    
            add(){
            this.template.source = this.data.length;
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