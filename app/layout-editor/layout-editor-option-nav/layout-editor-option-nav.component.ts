import { Component, Inject, Output, Input, EventEmitter } from '@angular/core';
import { AuthService } from '../../user/auth.service';

declare var PR;
declare var $;
@Component({
    selector: 'layout-editor-option-nav',
    templateUrl: 'app/layout-editor/layout-editor-option-nav/layout-editor-option-nav.component.html',
    styleUrls: [`app/layout-editor/layout-editor-option-nav/layout-editor-option-nav.component.css`]
})

export class LayoutEditorOptionNav {
        @Output() addClick = new EventEmitter();
        @Output() styleClick = new EventEmitter();
        @Output() backgroundClick = new EventEmitter();
        @Output() removeClick = new EventEmitter();
        
        @Output() changeItem = new EventEmitter();
        
        @Input() item:any;
        @Input() itemList:any;
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
        
        change(item){
            //a is the changed item with different structure, b is the current item...
            this.changeItem.emit({a:item,b:this.item});
        }
        
        
}