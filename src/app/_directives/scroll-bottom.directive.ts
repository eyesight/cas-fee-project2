import {  Directive, ElementRef, OnChanges, AfterContentInit } from '@angular/core';

@Directive({
  selector: '[appScrollBottom]',
  exportAs: 'scrollBottom'
})

export class AppScrollBottomDirective implements AfterContentInit, OnChanges {

  private scrollBottom: any;

  constructor(public element: ElementRef) {
    this.scrollBottom = this.element.nativeElement;
  }

  public ngAfterContentInit() {
    console.log('ngAfterContentInit');
    this.scrollToBottom();
  }

  // to wait for AfterViewChecked or AfterContentChecked is causing it to update too oftern as there is no real change on the DOM
  // can dizzy the user
  public ngOnChanges(changes) {
    console.log('scrollBottom: ngOnChanges');
    this.scrollToBottom();
  }

  public scrollNow() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    // using setTimeout allows to wait long enough to adjust scrolling
    // to allow async work
    setTimeout(() => {

      this.smoothScrolling(true);
    }, 200);
  }

  // smoothScrolling fast down and then slows down a little bit - showing the user the the size of the thread
  private smoothScrolling(doSmooth: boolean): void {

    if (doSmooth) {

      // haven't found a way not to use nativeElement
      if (this.element.nativeElement.scrollTop !== this.element.nativeElement.scrollHeight) {
        const diff = (  this.element.nativeElement.scrollHeight - this.element.nativeElement.scrollTop);
        if (diff <= 10) {
          // finally
          this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
        } else {
          this.element.nativeElement.scrollTop = this.element.nativeElement.scrollTop + (diff / 10);

          if (diff !== ( this.element.nativeElement.scrollHeight - this.element.nativeElement.scrollTop )) {
            setTimeout(() => {
              this.smoothScrolling(true);
            }, 10);
          }
        }
      }
    } else {
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    }
  }
}
