import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../user/auth.service';
import { ToastrNotifyService } from './toastr-notify.service';
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Injectable()
export class SaveObjectService{
  constructor(  private auth: AuthService,
                private router:Router,
                private http:Http,
                private notify:ToastrNotifyService) {
  }
  saveSnippets(snippetObject){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});
        let loginInfo = snippetObject;

        this.http.post('/api/snippets',JSON.stringify(loginInfo),options).subscribe(resp => {
            if(resp){
                //console.log();
                
                if(resp.json().status == 'failed'){
                    console.log('Failed to save');
                    }
                else{
                    console.log('Saved');
                }
            }
            else{
                console.log('No Response');
                
            }
            
        });
  }
    loadSnippets(snippetType){
        let requestOptions = new RequestOptions({search:snippetType});

        return this.http.get('/api/snippets',requestOptions).do(
            resp =>{ if(resp){
                console.log('working, loaded snippets');
                
            }
            else if (resp == undefined){
                //if user is not logged in
                this.router.navigate(['/notLoggedError']);
            }
        });
    }
    loadBlogPostList(){
        return this.http.get('/api/getBlogPostList');//.map(resp => resp.json());
    }
    loadBlogPost(blogId){
        
         let params: URLSearchParams = new URLSearchParams();
         params.set('blogId', blogId);
        
        
        return this.http.get('/api/getBlogPost',{search: params}).do(res => {
            if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        });//.map(resp => resp.json());
        
    }
    newBlogPost(newBlogPost){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/createNewBlogPost',JSON.stringify(newBlogPost),options);
    }
    editBlogPost(blogPost){
        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/editBlogPost',JSON.stringify(blogPost),options).do(res => {
            if (res.status == 200){
                this.notify.success('Modified Succesfully');
            }
            else if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        })

    }
    
    createSnippetGroup(newSnippetGroup){
                //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/createSnippetGroup',JSON.stringify(newSnippetGroup),options);
    }
    
    editSnippetGroup(sGroup){
        
                //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/saveSnippetGroup',JSON.stringify(sGroup),options).do((res:any) => {
            if (res.status == 200){
                this.notify.success('Modified Succesfully');
            }
            else if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2){
                this.notify.error('there was an error...');
            }
        })
        
    }
    loadSnippetGroupList(){
        return this.http.get('/api/getSnippetGroupList');//.map(resp => resp.json());
    }
    loadSnippetGroup(snippetId){
        
         let params: URLSearchParams = new URLSearchParams();
         params.set('snippetId', snippetId);
        
        
        return this.http.get('/api/getSnippetGroup',{search: params}).do(res => {
            if (res.status == 1){
                this.notify.error('Cannot find entity in the DB');
            }
            else if (res.status == 2) {
                this.notify.error('there was an error...');
            }
        });//.map(resp => resp.json());
        
        
    }
    
    // Title Page manipulations...
    loadTitlePageModel(){
         let params: URLSearchParams = new URLSearchParams();
         params.set('pageType', 'titlepage');

        return this.http.get('/api/getPageData',{search: params}).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    
                    console.log('error');
                    //ideally throw user to the page where he can initialize title page,
                    //for now it will just initialize title page
                    
                    this.http.get('/api/initializeTitlePage').subscribe(res => {
                        //ideally need error handling...
                        this.router.navigate(['title-page']);
                        
                    });
                    

                    
                }
                
                console.log(!!JSON.parse(res._body).error);
                
                
                
        });
    }
        loadUserImages(){

        return this.http.get('/api/getImageList').do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    
                    console.log('error');
                    //ideally throw user to the page where he can initialize title page,
                    //for now it will just initialize title page

                }
                
                console.log(!!JSON.parse(res._body).error);

        });
    }
    
    
    
    
    
    savePageModel(pageType,pageModel){
                //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/savePageModel',JSON.stringify({data:pageModel,pageType:pageType}),options).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                }
                else this.notify.success('Page model have been saved...');
        });
    }
    removeSimplePage(pageType){
                        //spin authentication here and if succesfull
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/removeSimplePage',JSON.stringify({pageType:pageType}),options);
    }
    
    // changeTitlePageAlignment(titlePageDataModel){
        
    //     let headers = new Headers({'Content-Type':'application/json'});
    //     let options = new RequestOptions({headers:headers});

    //     return this.http.post('/api/changeTitlePageAlignment',JSON.stringify(titlePageDataModel),options);
    // }
    
    
    changePageAlignment(pageType,pageDataModel){
        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/changePageAlignment',JSON.stringify({pageType:pageType,data:pageDataModel}),options);
    }
    
    
    saveNavBar(navbarModel){
        
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/saveNavBar',JSON.stringify(navbarModel),options);
    }
    
    saveBlogSection(blogModel){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/saveBlogSection',JSON.stringify(blogModel),options).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                }
                else this.notify.success('Page model have been saved...');
        });
        
    }
    
    saveSnippetSection(snippetModel){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/saveSnippetSection',JSON.stringify(snippetModel),options).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                }
                else this.notify.success('Page model have been saved...');
        });
        
    }
    
    
    
    
    
    getNavBar(){
            return this.http.get('/api/getNavBar').do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                    console.log('error');
                    //ideally throw user to the page where he can initialize title page,
                    //for now it will just initialize title page
                }
                console.log(!!JSON.parse(res._body).error);
        });
    }
    getFooter(){
            return this.http.get('/api/getFooter').do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                    console.log('error');
                    //ideally throw user to the page where he can initialize title page,
                    //for now it will just initialize title page
                }
                console.log(!!JSON.parse(res._body).error);
        });
    }
    
    
    
    generateNewPage(params){
        let headers = new Headers({'Content-Type':'application/json'});
        let options = new RequestOptions({headers:headers});

        return this.http.post('/api/generateNewPage',JSON.stringify(params),options).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    console.log(res._body);
                    this.notify.error('there was an error...');
                }
                else{
                    
                    setTimeout(()=>{ 
                        
                        window.location.reload();
                        
                        
                    }, 1000);
                    
                    
                } 
        });
        
    }
    
    loadSimplePageModel(page){
         let params: URLSearchParams = new URLSearchParams();
         params.set('pageType', page);

        return this.http.get('/api/getPageData',{search: params}).do((res:any) => {
                //error handling
                console.log('INITIALIZATION, OUTPUT');
                
                //in case if there is an error and there is no title page..
                if(!!JSON.parse(res._body).error){
                    this.notify.error('there was an error...');
                }
        });
    }
    
    
    
        
    }
    
    
    
    

