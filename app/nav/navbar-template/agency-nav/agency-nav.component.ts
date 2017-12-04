import { Component, Inject } from '@angular/core';
import { JQUERY_TOKEN } from '../../../common/index';
import { 
  Location //note: in newer angular2 versions this.location has been moved from router to common package
} from '@angular/common';


@Component({
    selector: 'agency-nav',
    templateUrl: 'app/nav/navbar-template/agency-nav/agency-nav.component.html',
    styleUrls: ['app/nav/navbar-template/agency-nav/agency-nav.component.css']
})

export class AgencyNavComponent {
    constructor(@Inject(JQUERY_TOKEN) private $,
    private location:Location, 
    ){
    }
    ngOnInit(){
        }
    ngAfterViewInit(){
          // Smooth scrolling using jQuery easing


  // Closes responsive menu when a scroll trigger link is clicked
  this.$('.js-scroll-trigger').click(function() {
    this.$('.navbar-collapse').collapse('hide');
  });

  // Activate scrollspy to add active class to navbar items on scroll
  this.$('body').scrollspy({
    target: '#mainNav',
    offset: 54
  });

  // Collapse now if page is not at top
  this.navbarCollapse();
  // Collapse the navbar when page is scrolled
  this.$(window).scroll(this.navbarCollapse);

  // Hide navbar when modals trigger
  this.$('.portfolio-modal').on('show.bs.modal', (e)=> {
    this.$(".navbar").addClass("d-none");
  })
  this.$('.portfolio-modal').on('hidden.bs.modal', (e)=>  {
    this.$(".navbar").removeClass("d-none");
  })
        
    }
      // Collapse Navbar
  navbarCollapse() {
    if (this.$("#mainNav").offset().top > 100) {
      this.$("#mainNav").addClass("navbar-shrink");
    } else {
      this.$("#mainNav").removeClass("navbar-shrink");
    }
  };
}