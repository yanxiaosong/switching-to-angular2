// define a component "App" with a selector "app"
var App = ng.core.Component({
  selector: 'app',
  template: '<h1>Hello {{target}}!</h1>'
})
.Class({
  constructor: function () {
    this.target = 'world';
  }
});

// invoke the bootstrap method in order to initialize our application with App as a root component.
ng.platformBrowserDynamic.bootstrap(App);
