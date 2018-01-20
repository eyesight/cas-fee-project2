import {
  ElementRef, HostListener, Directive, AfterViewChecked
} from '@angular/core';

const TEXTAREA_NAME = 'TEXTAREA';
@Directive({
  selector: '[appTextareaAutosize]'
})

export class AppTextareaAutosizeDirective implements AfterViewChecked {

  private original: number = 0;
  private minHeight: number = 0;
  private textAreaEl: any;

  constructor(public element: ElementRef) {
    if (this.element.nativeElement.tagName === TEXTAREA_NAME) {
      this.textAreaEl = this.element.nativeElement;
      this.original = this.textAreaEl.style.height;
    }
  }

  public ngAfterViewChecked() {
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

      const newHeight = this.textAreaEl.scrollHeight;

      if (this.minHeight === 0) {
        this.minHeight = newHeight;
      }
      if (newHeight > this.minHeight) {
        this.textAreaEl.style.height = newHeight + 'px';

      }
    }
  }

}
