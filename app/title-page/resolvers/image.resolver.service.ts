import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot, Router } from '@angular/router';
import { SaveObjectService } from '../../common/save-object-service';

@Injectable()
export class ImageResolverService implements Resolve<any>{
    constructor(private objectService:SaveObjectService,private router:Router){}
    resolve(route:ActivatedRouteSnapshot){
        //git this fixed
        
        //let sGroup = route.params['sGroup'];
        
        //if(!sGroup) this.router.navigate(['/snippet-repository',0]);
        
       // console.log('DEBUG: '+ sGroup);
        
        return this.objectService.loadUserImages().map( resp => resp );
    }
}
