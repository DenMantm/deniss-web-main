import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../user/auth.service';

declare var PR;
declare var $;
@Component({
    selector: 'add-page-editor',
    templateUrl: 'app/add-page-editor/add-page-editor.component.html',
    styleUrls: ['app/add-page-editor/add-page-editor.component.css']
})

export class AddPageEditor {

    modalActive:boolean;
    top:string;
    item:any
    itemList:any
    @Output() addItem = new EventEmitter();
    filteredItemList:any
    itemGroupList:any
    prefix:any
    sufix:any
    
    currentElement:any
    currentImage:string
    
    selectedIndex:any
    
        constructor(private auth:AuthService){
            this.prefix = "app/assets/images/templates/Page-elements/";
            this.sufix = ".PNG"
            
            
                        this.itemList = [{itemName:'layout_1',itemGroup:'pages'},
                        {itemName:'layout_2',itemGroup:'pages'},
                        {itemName:'blog',itemGroup:'components'},
                        {itemName:'library',itemGroup:'components'}];
                        
        this.item = this.itemList[0];
            
            
            
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    
    
    ngOnInit(){
        if(this.itemList){
            console.log('Excecuting some additional logic here...')
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
                        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;

                //console.log(this.filteredItemList);
            }
            //console.log(this.item);
            console.log('Item List Structure...');
            
        }
        
    }
    
    changeItemGroup(group){
                        this.filteredItemList = this.itemList.filter(i=>i.itemGroup == group);
                //initialize the selected element...

                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemList[0];
                        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;

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
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    forward(){
        this.selectedIndex++;
        this.currentElement = this.filteredItemList[this.selectedIndex];
        console.log('Debug, forward');
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    
    change(){
        this.addItem.emit(this.currentElement);
        this.toggleModal(null);
    }
    changeTroughPicture(item){
        this.selectedIndex = this.filteredItemList.indexOf(item);
        this.currentElement = item;
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    
        
}



