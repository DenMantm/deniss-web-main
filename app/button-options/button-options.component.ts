import { Component, Inject, Output, Input, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var PR;
declare var $;
declare var swal;
@Component({
    selector: 'button-options',
    templateUrl: 'app/button-options/button-options.component.html',
    styleUrls: ['app/button-options/button-options.component.css']
})

export class ButtonOptions {

    // @Input() image:any;
    // @Input() filteredItemList:any;
    
    // @Input() pageData:any;
    // @Input() removableItem:any;
    // @Input() toggleIcons:any;
    
    
    @ViewChild('buttonModal') el:ElementRef;


        constructor(private auth:AuthService){
        }
    ngAfterViewInit(){
        
    
        
    }
    
    ngOnInit(){

        
    }
    openModal(){
        $(this.el.nativeElement).modal('show');
    }
    
    
        
}



