/**
 * Created by awedag on 20.11.17.
 */
import {Directive, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';


@Directive({
  selector: '[appScrollBottom]'
})

export class AppScrollBottomDirective implements AfterViewChecked {
  // @ViewChild('scroll-bottom') private scrollBottom: ElementRef;

  private scrollBottom: any;

  constructor(public element: ElementRef) {
     this.scrollBottom = this.element.nativeElement;

  }


  public ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    } catch (err) { console.log('scrollToBottom Error:'+err);}
  }
}
