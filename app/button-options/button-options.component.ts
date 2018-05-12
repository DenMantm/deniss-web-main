import { Component, Inject, Output, Input, EventEmitter,HostListener,ElementRef,ViewChild } from '@angular/core';
import { AuthService } from '../user/auth.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { SaveObjectService } from '../common/index';

declare var PR;
declare var $;
declare var swal;
@Component({
    selector: 'button-options',
    templateUrl: 'app/button-options/button-options.component.html',
    styleUrls: ['app/button-options/button-options.component.css']
})

export class ButtonOptions {

    // @Input() image:any;
    // @Input() filteredItemList:any;
    
     @Input() pageData:any;
    // @Input() removableItem:any;
    // @Input() toggleIcons:any;
    
    changeButtonForm:FormGroup;
    buttonText:FormControl;
    link:FormControl;
    
    
    changeButtonFormCustom:FormGroup;
    buttonTextCustom:FormControl;
    linkCustom:FormControl;
    
    
    internalLink:boolean = true;
    navigationList:any;
    reorderedNavList:Array<any>=[];
    
    @ViewChild('buttonModal') el:ElementRef;


        constructor(private auth:AuthService,private objectService:SaveObjectService,){
        }
    ngAfterViewInit(){
        
    
        
    }
    
    ngOnInit(){
        
        this.buttonText = new FormControl(this.pageData.data.buttonLink.buttonText,Validators.required);
        this.link = new FormControl('',Validators.required);
        this.changeButtonForm = new FormGroup({
            buttonText:this.buttonText,
            link:this.link
        })
        
        
        this.buttonTextCustom = new FormControl(this.pageData.data.buttonLink.buttonText,Validators.required);
        this.linkCustom = new FormControl('',Validators.required);
        this.changeButtonFormCustom = new FormGroup({
            buttonTextCustom:this.buttonTextCustom,
            linkCustom:this.linkCustom
        })
        
        

        this.objectService.getNavBar().subscribe((res:any) => {
            this.navigationList = JSON.parse(res._body)
            console.log(this.navigationList);
            
            
            this.navigationList.data.additionalElements.forEach(page => {
                page.elements.forEach(ele =>{
                    
                    this.reorderedNavList.push({navName:ele.navName,page:page.page,slideTo:ele.slideTo});
                    
                    
                })
            })
                
            console.log(this.reorderedNavList);
            
               // let navigateTo of 
            
            
            
        });
    }
    
    changeLink(values){
                this.pageData.data.buttonLink.buttonText = values.buttonText;
                this.pageData.data.buttonLink.isExternam = false;
                this.pageData.data.buttonLink.link.page = this.reorderedNavList[values.link].page;
                this.pageData.data.buttonLink.link.slideTo = this.reorderedNavList[values.link].slideTo;

        $(this.el.nativeElement).modal('hide');
    }
    changeLinkCustom(values){
                this.pageData.data.buttonLink.buttonText = values.buttonTextCustom;
                this.pageData.data.buttonLink.isExternam = true;
                this.pageData.data.buttonLink.link.page = "//"+values.linkCustom;
                this.pageData.data.buttonLink.link.slideTo = ""
                $(this.el.nativeElement).modal('hide');
    }
    
    
    
    openModal(){
        $(this.el.nativeElement).modal('show');
    }
        validInputField(fieldRef){
        return (!fieldRef.hasError('required') || fieldRef.pristine);
    }
        hint(title,text){
        swal(title, text)
    }
        
}



