import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { LayoutEditorService } from '../services/layout-editor.service';

@Injectable()
export class LayoutEditorResolverService implements Resolve<any>{
    constructor(private le:LayoutEditorService,private router:Router){}
    resolve(route:ActivatedRouteSnapshot){
        //git this fixed
        
        //let sGroup = route.params['sGroup'];
        
        //if(!sGroup) this.router.navigate(['/snippet-repository',0]);
        
       // console.log('DEBUG: '+ sGroup);
        
        return this.le.getTemplateItemList().map( resp => resp );
    }
}
