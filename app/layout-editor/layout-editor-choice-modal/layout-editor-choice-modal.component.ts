import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { LayoutEditorService } from '../services/layout-editor.service';

declare var PR;
declare var $;
@Component({
    selector: 'layout-editor-choice-modal',
    templateUrl: 'app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.html',
    styleUrls: [`app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.css`]
})

export class LayoutEditorChoiceModal {

    constructor(private auth:AuthService,private le:LayoutEditorService){
        }
    modalActive:boolean;
    top:string;
    @Input() item:any
    @Input() itemList:any
    filteredItemList:any
    ngOnChanges(){
        if(this.itemList){
            if(!this.filteredItemList){
                this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.item.elementTmpType);
                console.log(this.filteredItemList);
            }
        }
        
    }
    
    change(element){
        if(element){
        console.log($(element).position());
        this.top = $(element).position().top + "px";
        }
        
        this.modalActive = !this.modalActive;
    }



    
    
    
    
        
}