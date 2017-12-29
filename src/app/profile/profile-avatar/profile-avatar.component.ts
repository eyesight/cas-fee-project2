import {Component, ElementRef, Input, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {AlertService, UserService} from '../../_services/index';
import {Avatar, UserAvatar} from '../../_models/user.model';

import {ImageCompressService, IImage} from 'ng2-image-compress';
import {Router} from '@angular/router';
import {UserContentService} from '../../_services/user-content.service';


@Component({
  selector: 'app-profile-avatar',
  templateUrl: './profile-avatar.component.html'
})
export class ProfileAvatarComponent {
  public _previewUrl: string;

  @Input() set previewUrl(purl: string) {
    this._previewUrl = purl;

  }

  get previewUrl() {
    return 'data:image/png;base64,' + this._previewUrl;
  }

  public form: FormGroup;
  public loading: boolean = false;

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
              private alertService: AlertService) {
    this.createForm();
    // this.imcomOptions
  }

  createForm() {
    this.form = this.fb.group({
      avatar: null
    });
  }

  // get avatar() {
  //   return this.form.get('avatar');
  // }


  onSubmit() {
    //this.avatarObject.avatar = this.avatarUrl;
    console.log('this.userAvatar.avatar');
    // console.dir(this.userAvatar);
//    this.userService.updateAvatar(this.avatarObject);

    this.userService.updateAvatar(this.userAvatar)
      .subscribe(
        data => {
          this.provFileHideSubmitButton = true;

          console.log('ok:' + data + ':provFileHideButton:' + this.provFileHideSubmitButton);
          this.alertService.success('Das Bild wurde erfolgreich gespeichert');
          this.userContentService.getUserContent()
            .subscribe(content => {
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
          this.provFile = false;

          console.log('profilbild error:' + error);
          if (error.match(/401/g)) {
            this.alertService.error('Sie müssen sich neu anmelden', false, 1000);
            setTimeout(() =>
              this.router.navigate(['login'], {queryParams: {returnUrl: this.router.url}}), 3500);
          } else {
            this.alertService.error('Beim Laden des Bildes ist ein Fehler aufgetreten. Bitte versuchen Sie es nochmals', false, 500);

          }

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
   //   const reader = new FileReader();
      const files = event.target.files[0];
   //   const fileList = FileList;
      // reader.readAsDataURL(files);

      console.log(event.target.files[0]);

      this.userAvatar


      if (files.size > 300000) {
        this.alertService.error('Das Bild ist zu gross. Es darf nicht grösser als 300 KB sein.', false, 500);
        this.provFile = false;
        this.provFileHideSubmitButton = true;
      } else if (files.type !== ('image/jpeg') && files.type !== ('image/png')) {
        this.alertService.error('Tut uns leid. Dieses Dateiformat wird zurzeit nicht unterstützt.', false, 500);
        this.provFile = false;
        this.provFileHideSubmitButton = true;

      } else {
        this.provFileHideSubmitButton = false;

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
            this.userAvatar.avatar = this.av;

            //  this.previewUrl = this.images[0].compressedImage.imageDataUrl;
            this.provFile = true;
            this.previewUrl = this.images[0].compressedImage.imageDataUrl.split(',')[1];

            //     console.dir(this.av);
          });
        });

        // reader.onload = (evt: any) => {
        //   this.previewUrl = evt.target.result;
        //   this.provFile = true;
        //   this.avatarUrl = this.previewUrl.split(',')[1];
        //
        //   console.log('in reader.onload 110:' + this.avatarUrl.length);
        //   console.log('in reader.onload 1');
        // };
      }
    }
  }
}




