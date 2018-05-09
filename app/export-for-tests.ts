export {NgModule} from '@angular/core';
export {BrowserModule} from '@angular/platform-browser';
export {RouterModule,ActivatedRouteSnapshot} from '@angular/router'
export {FormsModule, ReactiveFormsModule} from '@angular/forms';
export {HttpModule} from '@angular/http';
export { MyAppComponent} from './my-app.component';
export { AgencyNavComponent} from './nav/index';
export { Error404Component } from './errors/404.component';
export { LayoutEditor,LayoutEditorService,LayoutEditorOptionNav,LayoutEditorChoiceModal,HtmlToCanvasService,LayoutEditorAddNewItem } from './layout-editor/index'
export { TitlePageComponent,
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
export { ProjectsPageComponent } from './projects/index';
export {BlogPostsComponent, 
        BlogPostListResolverService, 
        BlogPostInstanceComponent, 
        BlogPostInstanceResolverService,
        BlogPostHeadderDescriptorComponent
        } from './blog-posts/index';
export { FooterComponent } from './footer/footer.component';
export { LoginSignupComponent } from './footer/loginSignup/login-signup.component';
export { ContentEditNav } from './content-edit-nav/content-edit-nav.component';
export { ContentEditOptionNav } from './content-edit-option-nav/content-edit-option-nav.component';
export {    SnippetRepository, 
            SnippetInstance,
            SnippetRepResolverService,
            SnippetRepSidebar,
            SnippetListResolverService,
        } from './snippet-rep/index';

//service
export { AuthService, UserLoggedInResolver } from './user/index';

export { JQUERY_TOKEN,
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
         
         
export { AddPageEditor } from './add-page-editor/index';
export { ViewUploadedImages,Base64UploadComponent } from './view-uploaded-images/index';
export { ChangeImages } from './change-images/index';


export { appRoutes } from './routes'




export declare let jQuery:Object;
export declare let moment:Object;