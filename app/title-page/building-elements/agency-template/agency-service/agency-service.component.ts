import { Component, Inject,Input } from '@angular/core';
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
    @Input() showElementTools:boolean;
    ngOnInit(){
        this.data = [{sequence:0,
                     icon:'fa-shopping-cart',
                     heading:'E-Commerce',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        },{sequence:1,
                     icon:'fa-laptop',
                     heading:'Responsive Design',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit. '
        },
        {sequence:2,
                     icon:'fa-lock',
                     heading:'Web Security',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Minima maxime quam architecto quo inventore harum ex magni, dicta impedit.'
        }];
        
        this.template = {sequence:0,
                     icon:'fa-shopping-cart',
                     heading:'E-Commerce',
                     text:'Lorem ipsum dolor sit amet, consectetur adipisicing elit. '
        };

        }
        
        add(){
            this.template.source = this.data.length;
            this.data.push(this.template)
        }
        style(){
            console.log('style');
        }
        background(){
            console.log('background');
        }
        remove(){
            console.log('remove');
        }
        
        loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    
}