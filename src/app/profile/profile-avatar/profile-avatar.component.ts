import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService, UserService} from '../../_services/index';
import {Avatar, User, UserAvatar} from '../../_models/user.model';
//import {ImageCompressor, Options} from 'image-compressor';
//import {ImageCompressor} from '/node_modules/image-compressor';
//import {ImageCompressService} from "ng2-image-compress";
import {ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage} from  'ng2-image-compress';
import {Ng2ImgMaxService} from "ng2-img-max";
import {Observable} from "rxjs/Observable";
import {Subscription} from "rxjs/Subscription";
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
  avatarObject = new UserAvatar;
  filename: string;
  processedImage: any;
  images: Array<IImage> = [];
  fileList: FileList;
  bb: Promise<string>;


  /* imcomOptions: compressorSettings = {
   maxWidth: 100,
   maxHeight: 100,
   minWidth: 50,
   minHeight: 50,
   quality: 0.5,
   convertSize: 5000000
   };

   imageCompression: ImageCompressor; */

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder,
              private imgCompressService: ImageCompressService,
              //   private ng2ImgMax: Ng2ImgMaxService,
              //    private ng2ImgToolsService: Ng2ImgToolsService,
              private userService: UserService) {
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
    console.dir(this.nomalAvatar);
//    this.userService.updateAvatar(this.avatarObject);

    this.userService.updateAvatar(this.nomalAvatar)
      .subscribe(
        data => {
          console.log('ok:' + data);

        },
        error => {
          //  this.alertService.error(error);
          console.log('error:' + error);
        });


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
      let fileList = FileList;
      reader.readAsDataURL(files);

      console.log('fiels:' + event.target.files[0]);

      // reset
      this.images = [];
      ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
        observableImages.subscribe((image) => {
          this.images.push(image);
          console.log('compression on success');
          //  console.dir(image.compressedImage.imageDataUrl);
        }, (error) => {
          console.log("Error while converting");
        }, () => {
          this.processedImage = this.images[0];
          console.log('final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length);

          // if (this.images[0].compressedImage.imageDataUrl.length < this.avatarUrl.length) {
          console.log('filename:' + files.type);
          this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
          this.av.filename = files.name;
          this.av.filetype = files.type;

          this.nomalAvatar.avatar = this.av;
          console.dir(this.av);
          // } else {
          //   this.av.value = this.avatarUrl;
          //   this.nomalAvatar.avatar = this.av;
          // }

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




