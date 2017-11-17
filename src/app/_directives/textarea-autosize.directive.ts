/**
 * Created by awedag on 17.11.17.
 */
import { ElementRef, HostListener, Directive} from '@angular/core';

const MAX_LOOKUP_RETRIES = 5;
const TEXTAREA_NAME = 'TEXTAREA';
@Directive({
  selector: '[appTextareaAutosize]'
})

export class AppTextareaAutosizeDirective {

  private retries: number = 0;
  private textAreaEl: any;
  constructor(public element: ElementRef) {
    if (this.element.nativeElement.tagName !== TEXTAREA_NAME) {
      this._findNestedTextArea();

    } else {
      this.textAreaEl = this.element.nativeElement;
    }
  }
  // try to find textarea at the beginning
  // restriction: there can only be 1 textare in the used element
  _findNestedTextArea() {
    this.textAreaEl = this.element.nativeElement.getElementsByTagName(TEXTAREA_NAME)[0];
    if (!this.textAreaEl) {
      if (this.retries >= MAX_LOOKUP_RETRIES) {
        console.warn('autosize: textarea not found');

      } else {
        this.retries++;
        setTimeout(() => {
          this._findNestedTextArea();
        }, 100);
      }
    }
  }

  @HostListener('input', ['$event.target'])
  onInput(textArea: HTMLTextAreaElement): void {
    this.resize();
  }

  private resize(): void {
    if (this.textAreaEl) {
      this.textAreaEl.style.overflow = 'hidden';
      this.textAreaEl.style.height = 'auto';
      this.textAreaEl.style.height = this.textAreaEl.scrollHeight + 'px';
    }
  }

}
