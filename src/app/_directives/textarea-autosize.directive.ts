/**
 * Created by awedag on 17.11.17.
 */
import { Directive, HostListener, Renderer, ElementRef } from '@angular/core';


@Directive({
  selector: '[appTextareaAutosize]'
})
export class AppTextareaAutosizeDirective {
  private static textAreaName = 'TEXTAREA';



  constructor(
    private renderer: Renderer,
    private el: ElementRef
  ) {
    console.log('AppTextareaAutosizeDirective:constructor called');
  }

  @HostListener('document:keypress', ['$event']) onKeyEnter(event: KeyboardEvent) {

    this.textAreaKeyHandler(event);
   }

   private textAreaKeyHandler(event) {

     // this directive only works on textarea - so make sure we got one
     if ( (event.target.nodeName || '') !== AppTextareaAutosizeDirective.textAreaName ) {
       return;
     }
   // does only really makes sense then we have CRLF or Backspace
    // certainly this cannot prevent pasting from clipboard
    if (event.keyCode === 13 || event.keyCode === 8 ) {
      // preventDefault is necessary in case you type Enter in a input field -> it causes to reload the page
      // - ugly - can also happen
      // textare doesnt have the problem
      //event.preventDefault();

    const str: string =  this.el.nativeElement.value + '.';
     let crlfCount: number =  str.split('')
        .filter(x => x.codePointAt(0) === 10 )
        .length;

     if (event.keyCode === 13) {
       crlfCount = crlfCount + 1;
     }
     // adjust number of rows of textarea
      this.el.nativeElement.rows = crlfCount + 2;


    }
    // console.dir(event);
    console.log('keyEnter:' + event.charCode + 'keyCode:' + event.keyCode);

  }
  // private onTypingHandler(event: KeyboardEvent){


}
