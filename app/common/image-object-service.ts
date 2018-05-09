import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { ToastrNotifyService } from './toastr-notify.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class ImageObjectService{
    
    itemList:any;
    itemGroupList:any;
    filteredItemList:any;
    combinedArray:any;
    
  constructor(  private auth: AuthService,
                private router:Router,
                private http:Http,
                private notify:ToastrNotifyService) {
                    
                    this.filteredItemList = [];
                    
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
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/portfolio/06-full.jpg","itemGroup":"Big Items"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/1.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/2.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/3.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/about/4.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/1.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/2.jpg","itemGroup":"Icon Size"},
                      {"itemName":"app/assets/bootstrap-templates/img-tmp2/team/3.jpg","itemGroup":"Icon Size"}
                      ];
  }

  
    ngOnInit(){
        this.refreshImages();
    }
  
  
    refreshImages(){
       
        this.http.get('/api/getImageList').subscribe((res:any)=>{
            let tmp = JSON.parse(res._body);
            
            if(!!tmp.error){
                
                this.combinedArray = this.itemList.concat(tmp);
                
                this.itemGroupList = [];
            
                this.combinedArray.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
                
                this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);
                
                this.notify.error('Image loaded');
                
                
            }
            else{
                this.notify.error('There was a problem with image');
            }
            
        });//.map(resp => resp.json());
       
       
    }
    
    addExtraItem(item){
        this.combinedArray.push(item);
        
        this.itemGroupList = [];
            
        this.combinedArray.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
                
        this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);
        
    }
    
    getImageList(){
        if(!!this.filteredItemList){
            this.http.get('/api/getImageList').subscribe((res:any)=>{
            let tmp = JSON.parse(res._body);
            
            if(!!tmp.error){
                
                this.combinedArray = this.itemList.concat(tmp);
                
                this.itemGroupList = [];
            
                this.combinedArray.forEach( e=> this.itemGroupList.indexOf(e.itemGroup) == -1 && e.itemGroup != 'nav' && e.itemGroup != 'footer' ? this.itemGroupList.push(e.itemGroup):null );
                
                this.filteredItemList = this.itemList.filter(i=>i.itemGroup == this.itemList[0].itemGroup);
                
                return this.filteredItemList;
            }
            else{
                this.notify.error('There was a problem with image');
                return null;
            }
            
        });//.map(resp => resp.json());
            
            
        }
        else{
            return this.filteredItemList;
        }
        
        
        
        
        
    }
    

}