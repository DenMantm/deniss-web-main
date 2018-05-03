import { Component, Inject, Output, Input, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

declare var PR;
declare var $;
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
    filteredItemList:any;
    itemGroupList:any;
    prefix:any;
    sufix:any;
    @Input() image:any;
    imageOption:boolean=true;
    
    @ViewChild('uploadModal') el:ElementRef;
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
                        this.itemList = [{"itemName":"app/assets/bootstrap-templates/img-tmp1/header.jpg","itemGroup":"Backgrounds"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/header-bg.jpg","itemGroup":"Backgrounds"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/1.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/2.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/3.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/4.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/5.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp1/portfolio/thumbnails/6.jpg","itemGroup":"Small Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/01-full.jpg","itemGroup":"Big Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/02-full.jpg","itemGroup":"Big Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/03-full.jpg","itemGroup":"Big Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/04-full.jpg","itemGroup":"Big Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/05-full.jpg","itemGroup":"Big Items"},
                                        {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg","itemGroup":"Big Items"}
                                        ];
                        
        this.item = this.itemList[0];
            
            
            
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    ngAfterViewInit(){
        $(this.cp.nativeElement).colorpicker();
    }
    
    ngOnInit(){

        this.fileName = new FormControl('',Validators.required)
        this.uploadForm = new FormGroup({
            fileName:this.fileName
        })

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
        }
        
    }
    openModal(){
        $(this.el.nativeElement).modal('show');
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
        console.log('change in the image.....')
        console.log(this.image);
        this.image.img = this.currentElement.itemName;
        //this.changeImage.emit(this.currentElement.itemName);
        $(this.el.nativeElement).modal('hide');
    }
    changeTroughPicture(item){
        this.selectedIndex = this.filteredItemList.indexOf(item);
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
//   changeColor(color){
//         this.pageData.background.image = "";
//         this.pageData.background.color = color;
//         //this.changeImage.emit(this.currentElement.itemName);
//         $(this.el.nativeElement).modal('hide');
      
      
//   }
        
    
        
}



