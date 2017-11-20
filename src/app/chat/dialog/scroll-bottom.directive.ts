/**
 * Created by awedag on 20.11.17.
 */
import {Component, ElementRef, ViewChild, AfterViewChecked} from '@angular/core';


@Component({
  selector: 'app-scroll-bottom',
  template: '<div></div>'
})
export class ScrollBottomComponent implements AfterViewChecked {
  @ViewChild('scroll-bottom') private scrollBottom: ElementRef;

  constructor(){}

  public ngAfterViewChecked() {
    this.scrollToBottom();
  }

  private scrollToBottom(): void {
    try {
      this.scrollBottom.nativeElement.scrollTop = this.scrollBottom.nativeElement.scrollHeight;
    } catch(err) { }
  }
}
