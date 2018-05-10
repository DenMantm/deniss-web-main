import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SaveObjectService } from '../../common/save-object-service';
 
@Injectable()
export class SimplePageResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService){}
    resolve(route: ActivatedRouteSnapshot){
            let pageid = route.url[1].path;
            console.log(pageid);
            return this.objectService.loadSimplePageModel(pageid).map( resp => resp );
    }
}
