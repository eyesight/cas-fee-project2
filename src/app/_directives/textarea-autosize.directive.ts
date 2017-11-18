/**
 * Created by awedag on 17.11.17.
 */
import { ElementRef, HostListener, Directive} from '@angular/core';

const TEXTAREA_NAME = 'TEXTAREA';
@Directive({
  selector: '[appTextareaAutosize]'
})

export class AppTextareaAutosizeDirective {

  private retries: number = 0;
  private textAreaEl: any;
  constructor(public element: ElementRef) {
    if (this.element.nativeElement.tagName === TEXTAREA_NAME) {
      this.textAreaEl = this.element.nativeElement;
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
