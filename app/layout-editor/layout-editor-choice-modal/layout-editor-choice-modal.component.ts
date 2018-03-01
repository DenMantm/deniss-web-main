import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../../user/auth.service';

declare var PR;
declare var $;
@Component({
    selector: 'layout-editor-choice-modal',
    templateUrl: 'app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.html',
    styleUrls: [`app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.css`]
})

export class LayoutEditorChoiceModal {

    constructor(private auth:AuthService){
        }
    modalActive:boolean;
    top:string;
        
    
    
    change(element){
        if(element){
        console.log($(element).position());
        this.top = $(element).position().top + "px";
        }
        
        this.modalActive = !this.modalActive;
    }



    
    
    
    
        
}