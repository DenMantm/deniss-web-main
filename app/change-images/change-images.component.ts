import { Component, Inject, Output, Input, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var PR;
declare var $;
declare var swal;
@Component({
    selector: 'change-images',
    templateUrl: 'app/change-images/change-images.component.html',
    styleUrls: ['app/change-images/change-images.component.css']
})

export class ChangeImages {

    modalActive:boolean;
    top:string;
    item:any
    itemList:any
    @Output() changeImage = new EventEmitter();
    itemGroupList:any;
    prefix:any;
    sufix:any;
    @Input() image:any;
    @Input() filteredItemList:any;
    
    @Input() pageData:any;
    @Input() removableItem:any;
    @Input() toggleIcons:any;
    @Input() removeIcon:any;
    @Input() noIcons:any
    
    imageOption:boolean=true;
    filteredItemListObj:any;
    
    @ViewChild('uploadModal') el:ElementRef;
    @ViewChild('iconModal') icoel:ElementRef;
    @ViewChild('previewImage') imgEle:ElementRef;
    @ViewChild('cp2') cp:ElementRef;
    
    uploadForm:FormGroup;
    fileName:FormControl;
    
    
    currentElement:any
    currentImage:string
    
    selectedIndex:any
    
        constructor(private auth:AuthService){
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
    
    imgModalForBlog(img){
        this.image = img;
        $(this.el.nativeElement).modal('show');

    }
    
    openIconModal(){
         $(this.icoel.nativeElement).modal('show'); 
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
        console.log('change in the image.....')
        console.log(this.image);
        this.image.img = this.currentElement.itemName;
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
  remove(){
      
              swal({
          title: "Are you sure?",
          text: "Remove element?",
          type: "warning",
          showCancelButton: true,
          confirmButtonColor: "#DD6B55",
          confirmButtonText: "Yes",
          cancelButtonText: "Cancel",
          closeOnConfirm: true,
          closeOnCancel: true
        },
        (isConfirm)=> {
          if (isConfirm) 
            this.pageData.data.splice(this.pageData.data.indexOf(this.removableItem), 1);
          
        });
      
      
  }
  changeIcon(element){
      
      console.log(element.srcElement.parentNode.parentNode.firstElementChild.firstElementChild.attributes.class.nodeValue.slice(3))
      this.removableItem.icon = element.srcElement.parentNode.parentNode.firstElementChild.firstElementChild.attributes.class.nodeValue.slice(3);
      $(this.icoel.nativeElement).modal('hide');
  }
  
        
    
        
}



