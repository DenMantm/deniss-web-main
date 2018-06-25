/**
 * System configuration for Angular samples
 * Adjust as necessary for your application needs.
 */
(function (global) {
  System.config({
    paths: {
      // paths serve as alias
      'npm:': 'node_modules/'
    },
    // map tells the System loader where to look for things
    map: {
      // our app is within the app folder
      app: 'app',
      // angular bundles
      '@angular/core': 'npm:@angular/core/bundles/core.umd.js',
      '@angular/common': 'npm:@angular/common/bundles/common.umd.js',
      '@angular/compiler': 'npm:@angular/compiler/bundles/compiler.umd.js',
      '@angular/platform-browser': 'npm:@angular/platform-browser/bundles/platform-browser.umd.js',
      '@angular/platform-browser-dynamic': 'npm:@angular/platform-browser-dynamic/bundles/platform-browser-dynamic.umd.js',
      '@angular/http': 'npm:@angular/http/bundles/http.umd.js',
      '@angular/router': 'npm:@angular/router/bundles/router.umd.js',
      '@angular/router/upgrade': 'npm:@angular/router/bundles/router-upgrade.umd.js',
      '@angular/forms': 'npm:@angular/forms/bundles/forms.umd.js',
      '@angular/upgrade': 'npm:@angular/upgrade/bundles/upgrade.umd.js',
      '@angular/upgrade/static': 'npm:@angular/upgrade/bundles/upgrade-static.umd.js',
      'angular-sortablejs': 'node_modules/angular-sortablejs/dist/',
      'sortablejs/Sortable.min': 'node_modules/sortablejs/Sortable.min.js',
      // 'angular2-image-upload': 'npm:angular2-image-upload/index.js',
      'ng2-page-scroll': 'npm:ng2-page-scroll/bundles/ng2-page-scroll.umd.js',
      'angular2-disqus': 'node_modules/angular2-disqus/lib',
      // other libraries
      'rxjs':                       'npm:rxjs',
    },
    // packages tells the System loader how to load when no filename and/or no extension
    packages: {
      app: {
        main: './main.js',
        defaultExtension: 'js'
      },
      'angular-sortablejs': { main: 'index.js', defaultExtension: 'js' },
      'angular2-disqus': { main: 'disqus.module.js', defaultExtension: 'js' },
      rxjs: {
        defaultExtension: 'js'
      }
    }
  });
})(this);
