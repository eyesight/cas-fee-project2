/**
 * Created by awedag on 20.11.17.
 */
import {Directive, ElementRef, OnChanges, AfterContentInit} from '@angular/core';


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
    this.scrollToBottom();
  }

  // to wait for AfterViewChecked or AfterContentChecked is causing it to update even there is no real change on the DOM
  // which then dizzies the user
  // public ngAfterContentChecked() {
  //  this.scrollToBottom();
  // }
  public ngOnChanges() {
    this.scrollToBottom();
  }

  public scrollNow(){
    this.scrollToBottom();
  }
  private scrollToBottom(): void {
    // using setTimeout allows to wait long enough to adjust scrolling
    setTimeout(() => {
     /* try {
        this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
      } catch (err) {
        console.log('scrollToBottom Error:' + err);
      } */
     this.smoothScrolling(true);
    }, 200);
  }
  private smoothScrolling(doSmooth: boolean): void {

   /* try {
      this.element.nativeElement.scrollTop = this.element.nativeElement.scrollHeight;
    } catch (err) {
      console.log('scrollToBottom Error:' + err);
    }*/

    if (doSmooth){

          if (   this.element.nativeElement.scrollTop !== this.element.nativeElement.scrollHeight) {
            const diff = (  this.element.nativeElement.scrollHeight - this.element.nativeElement.scrollTop);
         //   console.log('diff:' +  (  this.element.nativeElement.scrollHeight - this.element.nativeElement.scrollTop) + ':(diff / 100):'+(diff / 100));
         //   console.log('scrollTOp:' + this.element.nativeElement.scrollTop + ' scrollHeight:' + this.element.nativeElement.scrollHeight);

            if (diff <= 10 ){
              // finally
              this.element.nativeElement.scrollTop =  this.element.nativeElement.scrollHeight;
            }else {
              this.element.nativeElement.scrollTop = this.element.nativeElement.scrollTop + (diff / 10);

              if ( diff !== ( this.element.nativeElement.scrollHeight - this.element.nativeElement.scrollTop ) )  {

                setTimeout(() => {
                  this.smoothScrolling(true);
                }, 10);
              }
            }
          }
      }
  }
}
