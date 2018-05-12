import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../../user/auth.service';
import { LayoutEditorService } from '../services/layout-editor.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

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
    ngOnInit(){
        
        
        
    
            
        
        this.navName = new FormControl('',Validators.required)
        this.isInNav = new FormControl(false)
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
            console.log('Item List Structure...');
            console.log(this.itemList)
            
        }
        
    }
    
    changeItemGroup(group){
        
                        this.filteredItemList = this.itemList.filter(i=>i.itemGroup == group);
                //initialize the selected element...

                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemList[0];
                        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';

                console.log(this.filteredItemList);
                this.navForm.value.navName = this.currentElement.itemGroup;
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
        
        this.navForm.value.navName = this.currentElement.itemGroup;
        
    }
    forward(){
        this.selectedIndex++;
        this.currentElement = this.filteredItemList[this.selectedIndex];
        console.log('Debug, forward');
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
        
        this.navForm.value.navName = this.currentElement.itemGroup;
        
    }
    
    change(value){
        
        
                //check if the maximum allowed value of elements is reached...
        let counter = 0;
        this.pageData.forEach(ele => {
            if(ele.includeInNav) counter++ ;
        })
        
        if (counter > 10){
            alert("Maximum ammount of elements in nav is reached, please unselect the include checkbox");
            return;
        }
        
        let tmpObject = {obj1:this.currentElement,obj2:value}
        
        this.addItem.emit(tmpObject);
        this.toggleModal(null);
        
        
    }
    changeTroughPicture(item){
        this.selectedIndex = this.filteredItemList.indexOf(item);
        this.currentElement = item;
        this.currentImage = 'app/assets/images/templates/Page-elements/'+this.currentElement.itemName+'.PNG';
        
        this.navForm.value.navName = this.currentElement.itemGroup;
        
    }
    
        
}