import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import {AlertService, UserService} from '../../_services/index';
import {Avatar, User, UserAvatar} from '../../_models/user.model';

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
  nomalAvatar =  new UserAvatar;
  av = new Avatar;
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

<<<<<<< HEAD
    onSubmit() {
    //this.avatarObject.avatar = this.avatarUrl;
    console.log(this.avatarUrl);
//    this.userService.updateAvatar(this.avatarObject);
      this.userService.updateAvatar(this.nomalAvatar).subscribe( (x) => {console.log('ok' + x); } );

      this.loading = true;
=======
  onSubmit() {
/*    this.avatarObject.avatar = this.previewUrl;
    console.log(this.previewUrl);*/
    this.userService.updateAvatar(this.avatarObject);
    this.loading = true;
>>>>>>> 349f0f843a9c23f99d3dc40951fc7ac89ad82069
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
      console.log('in reader.onload 0' );
      console.dir(files);
      reader.readAsDataURL(files);


      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
        this.provFile = true;
        this.avatarUrl = this.previewUrl.split(',')[1];


      //  this.nomalAvatar = ;
       // const av = new Avatar;
        this.av.filename = files.name;
          this.av.filetype = files.type;
          this.av.value = this.avatarUrl;
          this.nomalAvatar.avatar = this.av;

       console.log('in reader.onload 1');
        console.dir(this.avatarUrl);
      };
    /*  if(files){
        reader.readAsDataURL(files);
        console.log('in reader 2');
        console.dir(reader);
        this.avatar.setValue({
          filename: files.name,
          filetype: files.type,
          value: reader.result.split(',')[1]
        });
        console.log(this.avatar.value);
      } */
    }
  }
}




