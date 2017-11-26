/**
 * Created by awedag on 20.11.17.
 */
import {Directive, ElementRef, ViewChild, OnChanges, AfterContentInit, AfterContentChecked} from '@angular/core';


@Directive({
  selector: '[appScrollBottom]'
})

export class AppScrollBottomDirective implements AfterContentInit, OnChanges, AfterContentChecked {
  // @ViewChild('scroll-bottom') private scrollBottom: ElementRef;

  private scrollBottom: any;

  constructor(public element: ElementRef) {
    this.scrollBottom = this.element.nativeElement;

  }

  public ngAfterContentInit() {
    this.scrollToBottom();
  }
  public ngAfterContentChecked() {
    this.scrollToBottom();
  }
  public ngOnChanges() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    } catch (err) { console.log('scrollToBottom Error:'+err);}
  }
}
