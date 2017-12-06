import { Component, Inject, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../user/auth.service';

declare var PR;
@Component({
    selector: 'content-edit-option-nav',
    templateUrl: 'app/content-edit-option-nav/content-edit-option-nav.component.html',
    styleUrls: [`app/content-edit-option-nav/content-edit-option-nav.component.css`]
})

export class ContentEditOptionNav {
        @Output() addClick = new EventEmitter();
        @Output() styleClick = new EventEmitter();
        @Output() backgroundClick = new EventEmitter();
        @Output() removeClick = new EventEmitter();
    
    
        constructor(private auth:AuthService){
        }
        add(){
            this.addClick.emit();
        }
        style(){
            this.styleClick.emit();
        }
        background(){
            this.backgroundClick.emit();
        }
        remove(){
            this.removeClick.emit();
        }
        
}