import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { LayoutEditorService } from '../services/layout-editor.service';

declare var PR;
declare var $;
@Component({
    selector: 'layout-editor-add-new-item',
    templateUrl: 'app/layout-editor/layout-editor-add-new-item/layout-editor-add-new-item.component.html',
    styleUrls: ['app/layout-editor/layout-editor-add-new-item/layout-editor-add-new-item.component.css']
})

export class LayoutEditorAddNewItem {

    constructor(private auth:AuthService,private le:LayoutEditorService){
            this.prefix = "app/assets/images/templates/Page-elements/";
            this.sufix = ".PNG"
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    modalActive:boolean;
    top:string;
    @Input() item:any
    @Input() itemList:any
    @Output() addItem = new EventEmitter();
    filteredItemList:any
    itemGroupList:any
    prefix:any
    sufix:any
    
    currentElement:any
    currentImage:string
    
    selectedIndex:any
    
    ngOnChanges(){
        if(this.itemList){
            
            //create list of the item groups here...
            console.log(this.itemList);
            this.itemGroupList = [];
            
            this.itemList.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
            
            console.log(this.itemGroupList);
            
            if(!this.filteredItemList){
                
                this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);

                
                //initialize the selected element...
                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemList[0];
                        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';

                //console.log(this.filteredItemList);
            }
            //console.log(this.item);
        }
        
    }
    
    changeItemGroup(group){
                        this.filteredItemList = this.itemList.filter(i=>i.itemGroup == group);
                //initialize the selected element...

                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemList[0];
                        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';

                console.log(this.filteredItemList);
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
        this.addItem.emit(this.currentElement);
        this.toggleModal(null);
    }
    changeTroughPicture(item){
        this.selectedIndex = this.filteredItemList.indexOf(item);
        this.currentElement = item;
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
    }
    
        
}