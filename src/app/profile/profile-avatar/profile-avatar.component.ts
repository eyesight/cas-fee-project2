import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService, UserService} from '../../_services/index';
import {Avatar, User, UserAvatar} from '../../_models/user.model';

import {ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage} from 'ng2-image-compress';
import {Ng2ImgMaxService} from "ng2-img-max";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
import {UserContentDbService} from "../../_services/user-content-db.service";
import {UserContentService} from "../../_services/user-content.service";
import {ProfileService} from "../service/profile.service";
//import {Ng2ImgToolsService} from "ng2-img-tools";


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
  nomalAvatar = new UserAvatar;
  av = new Avatar;
  processedImage: any;
  images: Array<IImage> = [];


  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private imgCompressService: ImageCompressService,
              private userService: UserService,
              private profileService: ProfileService,
              private userContentService: UserContentService,
              private alertService: AlertService) {
    this.createForm();
    // this.imcomOptions
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
    //this.avatarObject.avatar = this.avatarUrl;
    console.log('this.nomalAvatar.avatar');
    // console.dir(this.nomalAvatar);
//    this.userService.updateAvatar(this.avatarObject);

    this.userService.updateAvatar(this.nomalAvatar)
      .subscribe(
        data => {


          console.log('ok:' + data);
          this.alertService.success('Das Bild wurde erfolgreich gespeichert', false, 500);
          this.userContentService.getUserContent()
            .subscribe(content => {
                // update data in parent-commponent (profile.component) via service
                this.profileService.updateData(content);
              },
              error => {
                this.alertService.error('Ein Problem ist aufgetreten, bitte versuchen Sie es nochmals', true);
              });

          // setTimeout(() => {
          //   this.provFile = false;
          //
          //
          // }, 500);
        },
        error => {
          //  this.alertService.error(error);
          console.log('error:' + error);
          this.alertService.error('Beim Laden des Bildes ist ein Fehler aufgetreten. Bitte versuchen Sie es nochmals', false, 500);
          this.provFile = false;
        });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.provFile = false;
  }

  onFileChange(event) {
    if (event.target.files && event.target.files[0]) {
      const reader = new FileReader();
      const files = event.target.files[0];
      const fileList = FileList;
      reader.readAsDataURL(files);

      console.log(event.target.files[0]);

      if (files.size > 1500000) {
        this.alertService.error('Das Bild ist zu gross. Es darf nicht grösser als 1.5 MB sein.', false, 500);
        this.provFile = false;
      } else if (files.type !== ('image/jpeg') && files.type !== ('image/png')) {
        this.alertService.error('Tut uns leid. Dieses Dateiformat wird zurzeit nicht unterstützt.', false, 500);
        this.provFile = false;
      } else {
        // reset
        this.images = [];
        ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
          observableImages.subscribe((image) => {
            this.images.push(image);
            console.log(this.images);
            console.log('compression on success');
            //  console.dir(image.compressedImage.imageDataUrl);
          }, (error) => {
            this.alertService.error('Beim Laden des Bildes ist ein Fehler aufgetreten. Bitte versuchen Sie es nochmals', false, 500);
            console.log('Error while converting');
          }, () => {
            this.processedImage = this.images[0];
            console.log('final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length);

            // if (this.images[0].compressedImage.imageDataUrl.length < this.avatarUrl.length) {
            console.log('filename:' + files.type);
            this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
            this.av.filename = files.name;
            this.av.filetype = files.type;
            this.av.filesize = files.size;

            this.nomalAvatar.avatar = this.av;
            console.dir(this.av);
          });
        });

        reader.onload = (evt: any) => {
          this.previewUrl = evt.target.result;
          this.provFile = true;
          this.avatarUrl = this.previewUrl.split(',')[1];

          console.log('in reader.onload 110:' + this.avatarUrl.length);


          console.log('in reader.onload 1');
          // console.dir(this.avatarUrl);
        };
      }
    }
  }
}




