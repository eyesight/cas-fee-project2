import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService, UserService, AlertMessagesService} from '../../_services/index';
import {Avatar, UserAvatar} from '../../_models/user.model';

import {ImageCompressService, IImage} from 'ng2-image-compress';
import {Router} from '@angular/router';
import {UserContentService} from '../../_services/user-content.service';
import {avatarHeader} from '../../_helpers/avatar-header';


@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html'
})

export class ProfileAvatarComponent {
  public _previewUrl: string;

  @Input() set previewUrl(purl: string) {
    this._previewUrl = purl;
  }

  @Input() avatarFiletype: string;


  get previewUrl() {
    return avatarHeader(this.avatarFiletype) + this._previewUrl;
  }

  public form: FormGroup;
  public loading = false;

  public provFile = false;
  public provFileHideSubmitButton = true;
  private userAvatar = new UserAvatar;
  private av = new Avatar;
  private processedImage: any;
  private images: Array<IImage> = [];

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private userService: UserService,
              private userContentService: UserContentService,
              private router: Router,
              private alertService: AlertService,
              private alertMessagesService: AlertMessagesService) {

    this.createForm();
  }

  public createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  public onSubmit() {

    this.userService.updateAvatar(this.userAvatar)
      .subscribe(
        data => {
          this.provFileHideSubmitButton = true;

          console.log('profilAvatar: ok:' + data + ':provFileHideButton:' + this.provFileHideSubmitButton);
          this.alertService.success(this.alertMessagesService.MessagesSuccess.imageSaved);
          this.userContentService.getUserContent()
            .subscribe(content => {
              },
              error => {
                this.alertService.error(this.alertMessagesService.MessagesError.error, true);
              });
        },
        error => {
          this.provFile = false;

          console.log('profilAvazar: error:' + error);
          if (error.toString().match(/401/g)) {
            this.alertService.error(this.alertMessagesService.MessagesError.newlogin, false, 1000);
            setTimeout(() =>
              this.router.navigate(['relogin'], {queryParams: {returnUrl: this.router.url}}), 3500);
          }   else if (error.toString().match(/413/g)) {
            this.alertService.error(this.alertMessagesService.MessagesError.errorImageSize, false, 3500);

          } else {
            this.alertService.error(this.alertMessagesService.MessagesError.error, false, 500);
          }

        });

    setTimeout(() => {
      this.loading = false;
    }, 1000);
  }

  public clearFile() {
    this.provFile = false;
  }

  public onFileChange(event) {
    if (event.target.files && event.target.files[0]) {

      const files = event.target.files[0];

      console.log(event.target.files[0]);

      if (files.size > 190000) {
        this.alertService.error(this.alertMessagesService.MessagesError.imageSize, false, 500);
        this.provFile = false;
        this.provFileHideSubmitButton = true;
      } else if (files.type !== ('image/jpeg') && files.type !== ('image/png')) {
        this.alertService.error(this.alertMessagesService.MessagesError.dateType, false, 500);
        this.provFile = false;
        this.provFileHideSubmitButton = true;

      } else {
        this.provFileHideSubmitButton = false;

        // reset
        this.images = [];
        ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
          observableImages.subscribe((image) => {
            this.images.push(image);

            console.log('compression on success');
          }, (error) => {
            this.alertService.error(this.alertMessagesService.MessagesError.error, false, 500);
            console.log('Error while converting');
          }, () => {
            this.processedImage = this.images[0];
            console.log('final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length);
            console.log('originalFile:' + files.size);
            console.log('filename:' + files.type);

            this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
            this.av.filename = files.name;
            this.av.filetype = files.type;
            this.avatarFiletype = files.name.match(/[0-9a-z]+$/i)[0];
            this.av.filesize = files.size;
            this.userAvatar.avatar = this.av;

            this.provFile = true;
            this.previewUrl = this.images[0].compressedImage.imageDataUrl.split(',')[1];

          });
        });
      }
    }
  }
}




