import {Component} from '@angular/core';  // import Component decorator
import {bootstrap} from '@angular/platform-browser-dynamic';

@Component({
  selector: 'app',
  templateUrl: './app.html'    // use templateUrl instead of simpliy inlining the component's template
})
class App {
  target:string;
  constructor() {
    this.target = 'world';
  }
}

bootstrap(App);

