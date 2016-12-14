import {HostListener, Input, Injectable, ElementRef, Inject, Directive, Component} from '@angular/core';
import {bootstrap} from '@angular/platform-browser-dynamic';

class Overlay {
  private el: HTMLElement;
  constructor() {
    var el = document.createElement('div');
    el.className = 'tooltip';
    this.el = el;
  }
  close() {
    this.el.hidden = true;
  }
  open(el, text) {
    this.el.innerHTML = text;
    this.el.hidden = false;
    var rect = el.nativeElement.getBoundingClientRect();
    this.el.style.left = rect.left + 'px';
    this.el.style.top = rect.top + 'px';
  }
  attach(target) {
    target.appendChild(this.el);
  }
  detach() {
    this.el.parentNode.removeChild(this.el);
  }
}

class OverlayMock {
  constructor() {}
  close() {}
  open(el, text) {}
  attach(target) {}
  detach() {}
}

@Directive({
  selector: '[saTooltip]'
})
export class Tooltip {
  // declare a property, and bind it to the value of the result we got from the evaluation of the expression
  // passed to the attribute
  @Input()
  saTooltip:string;

  constructor(private el: ElementRef, private overlay: Overlay) {
    this.overlay.attach(el.nativeElement);
  }
  @HostListener('mouseenter')
  onMouseEnter() {
    this.overlay.open(this.el, this.saTooltip);
  }
  @HostListener('mouseleave')
  onMouseLeave() {
    this.overlay.close();
  }
}

@Component({
  selector: 'app',
  templateUrl: './app.html',
  providers: [Overlay],     // a provider is a resource or Javascript "thing" that Angular uses to provide somethong we want to use
  directives: [Tooltip]

})
class App {}

bootstrap(App);
