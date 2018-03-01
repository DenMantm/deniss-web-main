import './rxjs-extemtions';
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {RouterModule,ActivatedRouteSnapshot} from '@angular/router'
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';
import { SortablejsOptions, SortablejsModule } from 'angular-sortablejs';


import { MyAppComponent} from './my-app.component';
import { AgencyNavComponent} from './nav/index';
import { Error404Component } from './errors/404.component';
import { LayoutEditor,LayoutEditorService,LayoutEditorOptionNav,LayoutEditorChoiceModal,HtmlToCanvasService } from './layout-editor/index'
import { TitlePageComponent,
        TitlePageResolverService,
        AgencyService,
        AgencyPortfolio,
        AgencyHeadder,
        AgencyAmazingTeam,
        AgencyAbout,
        CreativeHeadder,
        CreativeService,
        CreativePortfolio
        } from './title-page/index';
import { ProjectsPageComponent } from './projects/index';
import {BlogPostsComponent, 
        BlogPostListResolverService, 
        BlogPostInstanceComponent, 
        BlogPostInstanceResolverService,
        BlogPostHeadderDescriptorComponent
        } from './blog-posts/index';
import { FooterComponent } from './footer/footer.component';
import { LoginSignupComponent } from './footer/loginSignup/login-signup.component';
import { ContentEditNav } from './content-edit-nav/content-edit-nav.component';
import { ContentEditOptionNav } from './content-edit-option-nav/content-edit-option-nav.component';
import {    SnippetRepository, 
            SnippetInstance,
            SnippetRepResolverService,
            SnippetRepSidebar,
            SnippetListResolverService,
        } from './snippet-rep/index';


//service
import { AuthService, UserLoggedInResolver } from './user/index';

import { JQUERY_TOKEN,
         FirstPageGuard,
         LoggedInGuard,
         SaveObjectService,
         ArrayUtilityService,
         ContenteditableModelText,
         ContenteditableModelHtml,
         NativeWindowRef,
         ScrollToElementService,
         MediumEditorService,
         VariableStorageService,
         ToastrNotifyService,
         CanDeactivateGuard
         } from './common/index';

import { appRoutes } from './routes'

declare let jQuery:Object;
declare let moment:Object;

// declare let metro:Object;

@NgModule({
    imports:[BrowserModule,
            RouterModule.forRoot(appRoutes),
            SortablejsModule.forRoot({ animation: 150 }),
            FormsModule,
            ReactiveFormsModule,
            HttpModule],
    declarations:[LayoutEditor,
                    AgencyNavComponent,
                    Error404Component,
                    TitlePageComponent,
                    ProjectsPageComponent,
                    SnippetRepository,
                    SnippetInstance,
                    MyAppComponent,
                    ContenteditableModelText, //directive
                    ContenteditableModelHtml, //directive
                    SnippetRepSidebar,
                    FooterComponent,
                    LoginSignupComponent,
                    ContentEditNav,
                    ContentEditOptionNav,
                    BlogPostsComponent,
                    BlogPostInstanceComponent,
                    BlogPostHeadderDescriptorComponent,
                    AgencyService,
                    AgencyPortfolio,
                    AgencyHeadder,
                    AgencyAmazingTeam,
                    AgencyAbout,
                    CreativeHeadder,
                    CreativeService,
                    CreativePortfolio,
                    LayoutEditorOptionNav,
                    LayoutEditorChoiceModal
                    ],
    providers: [AuthService,
                FirstPageGuard,
                LoggedInGuard,
                SaveObjectService,
                SnippetRepResolverService,
                BlogPostListResolverService,
                BlogPostInstanceResolverService,
                UserLoggedInResolver,
                ArrayUtilityService,
                NativeWindowRef,
                ScrollToElementService,
                MediumEditorService,
                VariableStorageService,
                ToastrNotifyService,
                SnippetListResolverService,
                CanDeactivateGuard,
                {provide:JQUERY_TOKEN,useValue:jQuery},
                TitlePageResolverService,
                LayoutEditorService,
                HtmlToCanvasService
    ],
    bootstrap:[MyAppComponent]
})

export class AppModule {
    
}