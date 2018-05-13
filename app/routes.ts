import { Routes } from '@angular/router';
import { Error404Component } from './errors/404.component';

//one import combined in barel
import { SnippetRepository,SnippetRepResolverService, SnippetListResolverService } from './snippet-rep/index';
import { ProjectsPageComponent } from './projects/index';
import { BlogPostsComponent,BlogPostListResolverService, BlogPostInstanceComponent, BlogPostInstanceResolverService } from './blog-posts/index';
import { TitlePageComponent, TitlePageResolverService,ImageResolverService } from './title-page/index';

import {FirstPageGuard,LoggedInGuard, CanDeactivateGuard } from './common/index';

import { UserLoggedInResolver } from './user/index'

import * as pages from './other-pages/index';
//canDeactivate:['canDeactivateCreateEvent'],

export const appRoutes:Routes = [
    {path:'projects',component:ProjectsPageComponent,resolve:{User:UserLoggedInResolver}},
    {path:'blog-posts',component:BlogPostsComponent,resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,BlogPostList:BlogPostListResolverService,titlePageModel:TitlePageResolverService}},
    {path:'blog-posts/:blogId',
     component:BlogPostInstanceComponent,
     canDeactivate: [CanDeactivateGuard],
     resolve:{BlogPost:BlogPostInstanceResolverService,User:UserLoggedInResolver,titlePageModel:TitlePageResolverService,userImageList:ImageResolverService},
     data: { blogId: ':blogId' }
    },
    {path:'snippet-repository',
        component:SnippetRepository,
        resolve:{SNIPPETS:SnippetListResolverService,
                 currentSgroup:SnippetRepResolverService,
                 User:UserLoggedInResolver
    }},
    {path:'snippet-repository/:sGroup',
        component:SnippetRepository,
        canDeactivate: [CanDeactivateGuard],
        resolve:{SNIPPETS:SnippetListResolverService,
                 currentSgroup:SnippetRepResolverService,
                 User:UserLoggedInResolver
    }},
    {path:'title-page',component:TitlePageComponent,
    canActivate:[LoggedInGuard],resolve:{userImageList:ImageResolverService,User:UserLoggedInResolver,titlePageModel:TitlePageResolverService}},
    { path: '404', component: Error404Component },
    {path:'', redirectTo:'/title-page', pathMatch:'full'},
    ];