import { Component, AfterViewInit } from '@angular/core';
import { ViewEncapsulation } from '@angular/core';
declare var $: any;
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css' ],
  encapsulation: ViewEncapsulation.None
})
export class AppComponent implements AfterViewInit {
  title = 'FRONTEND';
  ngAfterViewInit() {
    // Ensure scripts run after view is initialized
    this.loadScript('../assets/js/front-main.js');
    this.loadScript('../assets/js/front-page-landing.js');
    this.loadScript('../assets/js/front-config.js');
    this.loadScript('../assets/vendor/js/template-customizer.js');
    this.loadScript('../assets/vendor/js/bootstrap.js');
    this.loadScript('../assets/vendor/js/dropdown-hover.js');
    this.loadScript('../assets/vendor/js/helpers.js');
    this.loadScript('../assets/vendor/js/mega-dropdown.js');
}
loadScript(scriptUrl: string) {
  const script = document.createElement('script');
  script.src = scriptUrl;
  script.async = true;
  document.body.appendChild(script);
}
}
