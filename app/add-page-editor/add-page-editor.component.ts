import { Component, Inject, Output, Input, EventEmitter,HostListener } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveObjectService } from '../common/index'

declare var PR;
declare var $;
declare var swal:any;
@Component({
    selector: 'add-page-editor',
    templateUrl: 'app/add-page-editor/add-page-editor.component.html',
    styleUrls: ['app/add-page-editor/add-page-editor.component.css']
})

export class AddPageEditor {
    
    
    top:string;
    modalActive:boolean
    
    
    newPageForm:FormGroup;
    navbarName:FormControl;
    pageType:FormControl;
    
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
        
        this.saveObject.generateNewPage(values).subscribe( res => {
            console.log(res);
        });
        
        
    }
    
    hint(title,text){
        swal(title, text)
    }
                //universal validator
    validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
    
        
}



