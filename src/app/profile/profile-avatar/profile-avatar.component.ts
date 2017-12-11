import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { User } from '../../_models/user.model';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html'
})
export class ProfileAvatarComponent {
  form: FormGroup;
  loading: boolean = false;
  fileUrl: string;
  url: string;
  provFile : boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: [null, [Validators.required]]
    });
  }

/*  onFileChange(event) {
    let reader = new FileReader();
    if (event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      console.log(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filetype: file.type,
          value: reader.result.split(',')[1]
        });
      };
    }
  }*/

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    setTimeout(() => {
      console.log(formModel);
      this.loading = false;
    }, 1000);
    console.log(formModel.filetype);
    this.fileUrl = 'data:' + formModel.avatar.filetype + ';base64, ' + formModel.avatar.value;
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      var reader = new FileReader();

      reader.onload = (event: any) => {
        this.url = event.target.result;
        this.provFile = true;
      };
      reader.readAsDataURL(event.target.files[0]);
    }
  }
}
