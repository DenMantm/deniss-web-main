import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { LayoutEditorService } from '../services/layout-editor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var PR;
declare var $;
@Component({
    selector: 'layout-editor-choice-modal',
    templateUrl: 'app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.html',
    styleUrls: [`app/layout-editor/layout-editor-choice-modal/layout-editor-choice-modal.component.css`]
})

export class LayoutEditorChoiceModal {

    constructor(private auth:AuthService,private le:LayoutEditorService){
            this.prefix = "app/assets/images/templates/Page-elements/";
            this.sufix = ".PNG"
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    
    ngOnInit(){
        this.navName = new FormControl('',Validators.required)
        this.isInNav = new FormControl(true)
        this.navForm = new FormGroup({
            navName:this.navName,
            isInNav:this.isInNav
        })
        
    }
    navForm:FormGroup;
    navName:FormControl;
    isInNav:FormControl;     
        

    modalActive:boolean;
    top:string;
    @Input() item:any
    @Input() itemList:any
    @Input() pageData:any
    @Output() changeItem = new EventEmitter();
    @Output() removeItem = new EventEmitter();
    filteredItemList:any
    prefix:any
    sufix:any
    
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
                
                    this.navName = new FormControl(this.item.navName,Validators.required)
                    this.isInNav = new FormControl(this.item.includeInNav)
                    this.navForm = new FormGroup({
                        navName:this.navName,
                        isInNav:this.isInNav
                    });
                
                

                console.log(this.filteredItemList);
                            console.log("Displaying the current item here...");
            console.log(this.item);
            }
        }
    }
    
    toggleModal(element){
        if(element){
        console.log($(element).position());
        this.top = $(element).position().top-150 + "px";
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
    
    change(values){
        
        //check if the maximum allowed value of elements is reached...
        let counter = 0;
        this.pageData.forEach(ele => {
            if(ele.includeInNav) counter++ ;
        })
        
        if (counter > 10){
            alert("Maximum ammount of elements in nav is reached, please unselect the include checkbox");
            return;
        }
        
        this.item.includeInNav = values.isInNav;
        this.item.navName = values.navName;
        
        
        this.changeItem.emit({a:this.currentElement,b:this.item});
        //this.changeItem.emit(this.currentElement);
        this.toggleModal(null);
    }
    changeTroughPicture(item){
        console.log("WOrking here");
        this.selectedIndex = this.filteredItemList.indexOf(item);
        this.currentElement = item;
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
    }
    remove(){
        this.removeItem.emit(this.item);
    }
    
        
}