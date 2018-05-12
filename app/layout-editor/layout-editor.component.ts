import { Component, Inject,Input } from '@angular/core';
import { JQUERY_TOKEN, SaveObjectService } from '../common/index';
import { AuthService } from '../user/index';
import { LayoutEditorService } from './services/layout-editor.service';
import { HtmlToCanvasService } from './services/html-to-canvas.service';
import { SortablejsOptions, SortablejsModule } from 'angular-sortablejs';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators } from '@angular/forms';


declare var imagify
declare var window
declare var swal;
@Component({
    selector: 'layout-editor',
    templateUrl: 'app/layout-editor/layout-editor.component.html',
    styleUrls: ['app/layout-editor/layout-editor.component.css']
})

export class LayoutEditor {
    @Input() showElementTools:boolean;
    @Input() pageData:any;
    imageStructure:any;
    itemList:any;
    removedItemList:any = [];
    
    
    navForm:FormGroup;
    navName:FormControl;
    isInNav:FormControl;
    
    constructor(@Inject(JQUERY_TOKEN) private $,
                private auth:AuthService,
                private ls:LayoutEditorService,
                private img:HtmlToCanvasService,
                private sv:SaveObjectService,
                private router:Router,
                ){
    }
    // ngOnInit(){
    //     this.imageStructure = [
    //     {id:1,img:'app/assets/images/templates/Page-elements/agency-nav.PNG', class :"disabled"},
    //     {id:2,img:'app/assets/images/templates/Page-elements/agency-headder.PNG',class :""},
    //     {id:3,img:'app/assets/images/templates/Page-elements/agency-about.PNG',class :""},
    //     {id:4,img:'app/assets/images/templates/Page-elements/agency-amazing-team.PNG',class :""},
    //     {id:5,img:'app/assets/images/templates/Page-elements/agency-portfolio.PNG',class :""},
    //     {id:6,img:'app/assets/images/templates/Page-elements/agency-service.PNG',class :""},
    //     {id:7,img:'app/assets/images/templates/Page-elements/creative-headder.PNG',class :""},
    //     {id:8,img:'app/assets/images/templates/Page-elements/creative-portfolio.PNG',class :""},
    //     {id:9,img:'app/assets/images/templates/Page-elements/creative-service.PNG',class :""}];
        
        
    //     }
        
        
    ngOnInit(){
        
            this.ls.getTemplateItemList().subscribe((e:any)=>{
            console.log(e._body);
            
            this.itemList = JSON.parse(e._body)
            //console.log(this.itemList)
            console.log("Debug Page Data");
            console.log(this.pageData);
            
        })
        
        
        this.navName = new FormControl(this.pageData.title,Validators.required)
        this.isInNav = new FormControl(this.pageData.includeInNav)
        this.navForm = new FormGroup({
            navName:this.navName,
            isInNav:this.isInNav
        })
        
        //Add some sort of the loading symbol here after....
        //create image representation of the page here.....
        //load navbar separatley
        this.img.getScreenshotOfElement(this.$("#mainNav").get(0), 0, 0,
        this.$("#mainNav").get(0).clientWidth, 
        this.$("#mainNav").get(0).clientHeight,
        (data) => {
            this.$("#img-mainNav").attr("src", "data:image/png;base64,"+data);
        });
        //load footer separatley
        this.img.getScreenshotOfElement(this.$("#"+this.pageData.footer.elementTmpName).get(0), 0, 0, 
        this.$("#"+this.pageData.footer.elementTmpName).get(0).clientWidth, 
        this.$("#"+this.pageData.footer.elementTmpName).get(0).clientHeight,
        (data) => {
            this.$("#img-"+this.pageData.footer.elementTmpName).attr("src", "data:image/png;base64,"+data);
        });
        
        
        //slows down everything this one..
        
        // this.pageData.pageData.forEach(i => {
        //     this.img.getScreenshotOfElement(this.$("#"+i.elementTmpName+i.elementSequence).get(0), 0, 0, 
        //     this.$("#"+i.elementTmpName+i.elementSequence).get(0).clientWidth, 
        //     this.$("#"+i.elementTmpName+i.elementSequence).get(0).clientHeight,
        //     (data) => {
        //         this.$("#img-"+i.elementTmpName+i.elementSequence).attr("src", "data:image/png;base64,"+data);
        //     });
        // })
        
        
        
        
        //load all elements from the current title page
        // this.ls.getCurrentLayout().subscribe(res=>{
            
        // });
        
        //take snapshot of the image here for testing purposes...

        
        // imagify(this.$('#about')[0], (base64) => {
        //               this.$('#testimage').attr('src', base64);
        //             });
        
        
        this.$('.sortable').sortable();
        this.$('.exclude').sortable({
				items: ':not(.disabled)'
			});
    }
    loginCheck(){
       //console.log(this.auth.isAuthenticated());
       return this.auth.isAuthenticated();
   }
   
   
   
      removeSimplePage(){
                           swal({
                      title: "Are you sure?",
                      text: "Save changes?",
                      type: "warning",
                      showCancelButton: true,
                      confirmButtonColor: "#DD6B55",
                      confirmButtonText: "Yes",
                      cancelButtonText: "Cancel",
                      closeOnConfirm: true,
                      closeOnCancel: true
                    },
                    (isConfirm) => {
                      if (isConfirm) {
                        //swal("Deleted!", "Your imaginary file has been deleted.", "success");
                        //userResponse = true;
                        
                        this.sv.removeSimplePage(this.pageData.pageType).subscribe((res:any)=>{
                            this.router.navigate(['title-page']);
                        });
                        //notify user that everything was saved here...

                      } else {
                        //swal("Cancelled", "Your imaginary file is safe :)", "error");
                        //userResponse = false;
                      }
                    });
       
   }
   
   
   
   
   
   
   
   
   reorder(){
       
       
       
       
       let sortedIDs = this.$( ".sortable" ).sortable( "toArray" );
       //algorithm to rearrange items here...
       let tmpArray=[];

       for(let i =0; i < sortedIDs.length;i++){
           tmpArray.push(this.pageData.pageData[sortedIDs[i]])
           this.pageData.pageData[sortedIDs[i]].elementSequence = i;
       }
       
       
       
       //save and regenerate navbar here...
       
                                           //step to generate navbar
            let navItemList = this.pageData.pageData.filter(i => i.includeInNav == true);
            
            let searchCondition;
            
            // if(this.pageData.pageType == 'titlepage'){
                
            // }
            // else{
                
            // }
            
            this.pageData.pageType == 'titlepage'? searchCondition = '/title-page' : searchCondition = '/pages/'+this.pageData.pageType;
            
            let tmpRef;
            
            for (let i = 0; i < this.pageData.navbarElement.data.additionalElements.length; i++) {
                if (this.pageData.navbarElement.data.additionalElements[i].page == searchCondition) {
                    
                    this.pageData.navbarElement.data.additionalElements[i].elements = [];
                    
                    if(this.pageData.includeInNav){
                        this.pageData.navbarElement.data.additionalElements[i].elements.push({"navName":this.pageData.title,"slideTo":'#top_of_page'})
                    }
                    
                    
                    
                    navItemList.forEach(ele => {
                        this.pageData.navbarElement.data.additionalElements[i].elements.push({"navName":ele.navName,"slideTo":"#"+ele.elementTmpName+ele.elementSequence})

                    })
                    tmpRef = this.pageData.navbarElement.data.additionalElements[i].elements.length;
                }
            }
            
            
            //checking if there are enough items left referenced in NavBar... 
            
            
            
            if(this.navForm.value.navName==''){
                swal('Error','Nav reference of page cannot be empty')
                return;
            }
            
            if(this.pageData.pageType !== 'titlepage'){
                if(tmpRef==0){
                    swal('Error','Please select at least one element of entire page in navbar')
                    return;
                }
            }
            
            
            this.pageData.title = this.navForm.value.navName;
            this.pageData.includeInNav = this.navForm.value.isInNav;
            
            
            console.log('VERIFYING IF IT IS WORKING PROPERLY....')
            console.log(this.pageData.navbarElement);
                        
                        
                        this.sv.saveNavBar(this.pageData.navbarElement).subscribe((res:any)=>{
                                                
                        });
       
       
      this.sv.changePageAlignment(this.pageData.pageType,tmpArray).subscribe(s => {
         // console.log(s);
          //refresh page logic...
          window.location.reload();
      });
       //console.log(tmpArray);
   }
   change(item){
       console.log("Item to be changed...");

       this.pageData.pageData[this.pageData.pageData.indexOf(item.b)].elementTmpName = item.a.itemName;
       
       this.$("#"+'img-'+item.b.elementTmpName+item.b.elementSequence).attr("src", 'app/assets/images/templates/Page-elements/'+item.a.itemName+'.PNG');
      
       //console.log(item);
   }
   
   addItem(item):void{
       //adding new item...
       let newItem = this.generateItem(item);
       this.pageData.pageData.push(newItem);
       console.log(newItem);
       console.log("Item to be added...");
   }
   generateItem(item):any{
       
        // this.item.includeInNav = item.obj2.isInNav;
        // this.item.navName = item.obj2.navName;

       return {"elementTmpName":item.obj1.itemName,
                "includeInNav":item.obj2.isInNav,
                "navName": item.obj2.navName,
                    "elementTmpType":item.obj1.itemGroup,
                    "title":{"subtitle":"This is the subtitle","title":"This is the title"},
                    "data":item.obj1.tempData,
                    "elementSequence":this.pageData.pageData.length,
                    "background":item.obj1.background
       }
       
   }
   removeItem(item){
       //add item to the remove list...
       
       let index = this.pageData.pageData.indexOf(item);
       
       this.removedItemList.push(item);
       
       this.pageData.pageData.splice(index, 1);
       
      //rearrange indexes...
      for (let i = 0;i<this.pageData.pageData.length;i++){
          this.pageData.pageData[i].elementSequence = i;
      }
       
   }
   
   //checking the sorta ble allignment
   
   

   
    
}