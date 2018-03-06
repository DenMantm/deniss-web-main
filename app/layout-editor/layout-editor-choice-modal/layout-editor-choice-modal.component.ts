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
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    modalActive:boolean;
    top:string;
    @Input() item:any
    @Input() itemList:any
    @Output() changeItem = new EventEmitter();
    filteredItemList:any
    
    currentElement:any
    currentImage:string
    
    selectedIndex:any
    
    
    ngOnChanges(){
        if(this.itemList){
            if(!this.filteredItemList){
                this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.item.elementTmpType);
                
                
                //initialize the selected element...
                for(let i = 0; i < this.filteredItemList.length;i++){
                    if(this.filteredItemList[i].itemName==this.item.elementTmpName){
                        this.selectedIndex = i;
                        this.currentElement = this.filteredItemList[i];
                        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
                        break;
                    }
                    
                }

                console.log(this.filteredItemList);
            }
            console.log(this.item);
        }
        
    }
    
    toggleModal(element){
        if(element){
        console.log($(element).position());
        this.top = $(element).position().top + "px";
        }
        this.modalActive = !this.modalActive;
    }
    
    back(){
        this.selectedIndex--;
        this.currentElement = this.filteredItemList[this.selectedIndex];
        console.log('Debug, backwards');
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
    }
    forward(){
        this.selectedIndex++;
        this.currentElement = this.filteredItemList[this.selectedIndex];
        console.log('Debug, forward');
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
    }
    
    change(){
        this.changeItem.emit(this.currentElement);
        this.toggleModal(null);
    }
    
        
}