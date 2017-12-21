/**
 * Created by awedag on 17.11.17.
 */
import {ElementRef, HostListener, Directive, AfterContentChecked, AfterViewChecked} from '@angular/core';

const TEXTAREA_NAME = 'TEXTAREA';
@Directive({
  selector: '[appTextareaAutosize]'
})

export class AppTextareaAutosizeDirective implements AfterViewChecked {

  private original: number = 0;
  private textAreaEl: any;

  constructor(public element: ElementRef) {
    if (this.element.nativeElement.tagName === TEXTAREA_NAME) {
      this.textAreaEl = this.element.nativeElement;
      this.original = this.textAreaEl.style.height;
    }
  }

  ngAfterViewChecked() {
    if (this.textAreaEl) {
      if (this.textAreaEl.value.length === 0) {
        this.textAreaEl.style.height = this.original;
      }
     }
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.resize();
  }

  private resize(): void {
    if (this.textAreaEl) {
      // TODO: try to find a better solution in setting a style-property
      this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
    }
  }

}
