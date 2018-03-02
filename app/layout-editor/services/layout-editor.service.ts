import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';


@Injectable()
export class LayoutEditorService{
  constructor(private http:Http) {
  }
  
  //Getting elements to build the page...
    getTemplateItemList(){
         let params: URLSearchParams = new URLSearchParams();
         params.set('pageType', 'title');

        return this.http.get('/api/getTemplateItemList',{search: params}).do(res => {
                //error handling
        });
    }
  //Getting the current layout
    getCurrentLayoutTitlePage(){
         let params: URLSearchParams = new URLSearchParams();
         params.set('pageType', 'titlepage');
         
        return this.http.get('/api/getPageData',{search: params}).do(res => {
                //error handling
        });
    }
    
    
  
  
  
  //saving the new layout
  
  
  
  
}