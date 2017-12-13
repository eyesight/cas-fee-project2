import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AlertService, UserService} from '../../_services/index';
import { User, UserAvatar } from '../../_models/user.model';

@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html'
})
export class ProfileAvatarComponent {
  form: FormGroup;
  loading: boolean = false;
  size: number;
  previewUrl: string;
  avatarUrl: string;
  provFile: boolean = false;
  avatarObject = new UserAvatar;
  filename: string;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private userService: UserService) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  get avatar() {
    return this.form.get('avatar');
  }

  onSubmit() {
/*    this.avatarObject.avatar = this.previewUrl;
    console.log(this.previewUrl);*/
    this.userService.updateAvatar(this.avatarObject);
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      let reader = new FileReader();
      let files = event.target.files[0];

      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
        this.provFile = true;
        this.avatarUrl = this.previewUrl.split(',')[1];
      };
      if(files){
        reader.readAsDataURL(files);
        this.avatar.setValue({
          filename: files.name,
          filetype: files.type,
          value: reader.result.split(',')[1]
        });
        console.log(this.avatar.value);
      }
    }
  }
}




