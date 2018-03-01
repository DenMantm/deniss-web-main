import { Component, Inject, Input } from '@angular/core';
import { JQUERY_TOKEN } from '../common/index';
import { AuthService } from '../user/auth.service';


@Component({
    selector: 'agency-footer',
    templateUrl: 'app/footer/footer.component.html',
    styles: [``]
    //     styles: [`.nav.navbar-nav {font-size:15px;}
    // #searchForm {margin-right: 100px;}
    // @media (max-width:1200px){#searchForm {display:none} }
    // li > a.active{color:red;}`]
})

export class FooterComponent {
    @Input() pageData:any;
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService){
    }
    ngOnInit(){
    }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
    logout(){
            this.auth.logout();
    }
}