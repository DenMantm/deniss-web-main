import { Component, Inject, Output, Input, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ImageObjectService } from '../common/index';

declare var PR;
declare var $;
@Component({
    selector: 'view-uploaded-images',
    templateUrl: 'app/view-uploaded-images/view-uploaded-images.component.html',
    styleUrls: ['app/view-uploaded-images/view-uploaded-images.component.css']
})

export class ViewUploadedImages {

    modalActive:boolean;
    top:string;
    item:any
    itemList:any
    @Output() changeImage = new EventEmitter();
    itemGroupList:any;
    prefix:any;
    sufix:any;
    @Input() pageData:any;
    @Input() filteredItemList:any;
    imageOption:boolean=true;
    filteredItemListObj:any;
    
    @ViewChild('uploadModal') el:ElementRef;
    @ViewChild('previewImage') imgEle:ElementRef;
    @ViewChild('cp2') cp:ElementRef;
    
    uploadForm:FormGroup;
    fileName:FormControl;
    
    
    currentElement:any
    currentImage:string
    
    selectedIndex:any
    
        constructor(private auth:AuthService,private imgService:ImageObjectService){
            this.prefix = "";
            this.sufix = ""
                        
                    
        }
    ngAfterViewInit(){
        $(this.cp.nativeElement).colorpicker();
    }
    
    ngOnInit(){

        this.fileName = new FormControl('',Validators.required)
        this.uploadForm = new FormGroup({
            fileName:this.fileName
        })

        // if(this.itemList){
        //     console.log('Excecuting some additional logic here...')
        //     //create list of the item groups here...
        //     console.log(this.itemList);
        //     this.itemGroupList = [];
            
        //     this.itemList.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
            
        //     console.log(this.itemGroupList);
            
        //     if(!this.filteredItemListObj){
                
        //         this.filteredItemListObj = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);

                
        //         //initialize the selected element...
        //                 this.selectedIndex = 0;
        //                 this.currentElement = this.filteredItemListObj[0];
        //                 this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;

        //         //console.log(this.filteredItemListObj);
        //     }
        //     //console.log(this.item);
        // }
                this.filteredItemListObj = this.filteredItemList.obj1;
                this.itemGroupList = this.filteredItemList.obj2;
                this.itemList = this.filteredItemList.obj3;
        this.item = this.itemList[0];
                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemListObj[0];
                        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
        

        
        
    }
    openModal(){
        $(this.el.nativeElement).modal('show');
    }
    
    changeItemGroup(group){
                        this.filteredItemListObj = this.itemList.filter(i=>i.itemGroup == group);
                //initialize the selected element...

                        this.selectedIndex = 0;
                        this.currentElement = this.filteredItemListObj[0];
                        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;

                console.log(this.filteredItemListObj);
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
        this.currentElement = this.filteredItemListObj[this.selectedIndex];
        console.log('Debug, backwards');
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    forward(){
        this.selectedIndex++;
        this.currentElement = this.filteredItemListObj[this.selectedIndex];
        console.log('Debug, forward');
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    
    change(){
        this.pageData.background.color = "";
        this.pageData.background.image = this.currentElement.itemName;
        console.log(this.currentElement.itemName);
        //this.changeImage.emit(this.currentElement.itemName);
        $(this.el.nativeElement).modal('hide');
    }
    changeFromUpload(img){
        
        this.pageData.background.color = "";
        this.pageData.background.image = img.itemName;
        this.itemList.push(img);
        console.log(this.currentElement.itemName);
        //this.changeImage.emit(this.currentElement.itemName);
        $(this.el.nativeElement).modal('hide');
        
        
    }
    
    changeTroughPicture(item){
        this.selectedIndex = this.filteredItemListObj.indexOf(item);
        this.currentElement = item;
        this.currentImage = this.prefix+this.currentElement.itemName+this.sufix;
    }
    
    onFileChange(event) {
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.uploadForm.get('fileName').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }
  
  //changing the color here...
  changeColor(color){
        this.pageData.background.image = "";
        this.pageData.background.color = color;
        //this.changeImage.emit(this.currentElement.itemName);
        $(this.el.nativeElement).modal('hide');
      
      
  }
        
    
        
}



