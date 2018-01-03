/**
 * Created by awedag on 20.11.17.
 */
import {
  Directive, ElementRef, OnChanges, AfterContentInit, AfterViewChecked, HostListener, Input,
  ViewChild
} from '@angular/core';


@Directive({
  selector: '[appScrollBottom]',
  exportAs: 'scrollBottom'
})

export class AppScrollBottomDirective implements AfterContentInit, OnChanges {
  // @ViewChild('scroll-bottom') private scrollBottom: ElementRef;

  private scrollBottom: any;
  private scrollDiff: number;

  constructor(public element: ElementRef) {
    this.scrollBottom = this.element.nativeElement;
  }

  public ngAfterContentInit() {
    console.log('ngAfterContentInit');
    this.scrollToBottom();
  }

  // to wait for AfterViewChecked or AfterContentChecked is causing it to update even there is no real change on the DOM
  // which then dizzies the user
  // public ngAfterContentChecked() {
  //  this.scrollToBottom();
  // }


  //@HostListener('change') ngOnChanges() {
  // console.log('test');
  // }

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
