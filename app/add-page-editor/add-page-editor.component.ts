import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveObjectService } from '../common/index'

declare var PR;
declare var $;
declare var swal:any;
declare var window
@Component({
    selector: 'add-page-editor',
    templateUrl: 'app/add-page-editor/add-page-editor.component.html',
    styleUrls: ['app/add-page-editor/add-page-editor.component.css']
})

export class AddPageEditor {
    
    @Input() pageData:any;
    top:string;
    modalActive:boolean
    newPageOption:boolean = true;
    
    newPageForm:FormGroup;
    navbarName:FormControl;
    pageType:FormControl;
    
    navForm:FormGroup;
    isInNav:FormControl;
    
        constructor(private auth:AuthService,private saveObject:SaveObjectService){
        //this.currentImage = 'app/assets/images/templates/Page-elements/agency-about.PNG';
        }
    
    
    ngOnInit(){
        this.navbarName = new FormControl('',Validators.required);
        this.pageType = new FormControl('',Validators.required);
        this.newPageForm = new FormGroup({
            navbarName:this.navbarName,
            pageType:this.pageType
        })
        
        
        this.isInNav = new FormControl(this.pageData.navbarElement.enableBlog)
        this.navForm = new FormGroup({
            isInNav:this.isInNav
        })
        
        
        
        
    }
    
    toggleModal(element){
        if(element){
        console.log($(element).position());
        this.top = $(element).position().top + "px";
        }
        this.modalActive = !this.modalActive;
    }
    createNewPage(values){
        
        console.log(values);
        
        this.saveObject.generateNewPage(values).subscribe( (res:any) => {
   
                            //in case if there is an error and there is no title page..

        });
        
        
    }
    
    hint(title,text){
        swal(title, text)
    }
                //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
    
    change(values){
        
        
        this.pageData.navbarElement.enableBlog = values.isInNav;
        
                        this.saveObject.saveNavBar(this.pageData.navbarElement).subscribe((res:any)=>{
                                    window.location.reload();            
                        });
    }
    
        
}



