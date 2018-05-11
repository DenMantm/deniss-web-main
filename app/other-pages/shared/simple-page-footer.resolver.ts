import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { ActivatedRouteSnapshot } from '@angular/router';
import { SaveObjectService } from '../../common/save-object-service';
 
@Injectable()
export class SimplePageFooterResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService){}
    resolve(route: ActivatedRouteSnapshot){
            return this.objectService.getFooter().map( resp => resp );
    }
}
