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
            this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
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

       this.av.filename = files.name;
       this.av.filetype = files.type;
       //  console.dir(this.avatarUrl);
       // this.av.value = this.avatarUrl;
       //
       // this.nomalAvatar.avatar = this.av;


       console.log('in reader.onload 1');
       // console.dir(this.avatarUrl);
       };

      // const readerSub: Observable<string> = this.imageReader(files);
      // console.log('cnotieune');
      // /*  const compressionSub: Observable<string> = this.compress(files);

      // // const combine: Subscription;
      // console.log('combinelatest waiting');
      // Observable.combineLatest(compressionSub, readerSub).subscribe(([com, read]) => {
      //
      // console.log('COMBINELATEST: com:' + com.length + 'read:' + read.length);
      // // if (com.compressedImage.imageDataUrl.length < read.length) {
      // //   this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
      // //   this.nomalAvatar.avatar = this.av;
      // // } else {
      // //   this.av.value = this.avatarUrl;
      // //   this.nomalAvatar.avatar = this.av;
      // // }
      //
      // });
      // */

      // const aa = new Promise((resolve, reject) => {
      //
      //   console.log('outer braces..');
      //
      //   // reset
      //   this.images = [];
      //   ImageCompressService.filesToCompressedImageSource(files).then(observableImages => {
      //     console.log('outer braces');
      //     observableImages.subscribe((image) => {
      //       this.images.push(image);
      //       console.log('OBS:compression on success');
      //       //  console.dir(image.compressedImage.imageDataUrl);
      //     }, (error) => {
      //       console.log("OBS:Error while converting");
      //       reject("error");
      //     }, () => {
      //       this.processedImage = this.images[0];
      //       console.log('OBS:final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length + ' no comp:' + this.avatarUrl.length);
      //
      //       resolve(this.images[0].compressedImage.imageDataUrl.split(',')[1]);
      //       // readerSub.subscribe(read => {
      //       //       console.log('reader:: ' + read.length);
      //       // });
      //       //  observer.next(this.images[0].compressedImage.imageDataUrl.split(',')[1]);
      //       // if (  this.images[0].compressedImage.imageDataUrl.length  < this.avatarUrl.length) {
      //       //   this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
      //       //   this.nomalAvatar.avatar = this.av;
      //       // }
      //       // else {
      //       //   this.av.value  = this.avatarUrl;
      //       //   this.nomalAvatar.avatar = this.av;
      //       // }
      //
      //     });
      //
      //   });
      // });

      // this.bb = new Promise((resolve, reject) => {
      //   const reader = new FileReader();
      //
      //
      //   reader.readAsDataURL(files);
      //
      //
      //   reader.onload = (evt: any) => {
      //     this.previewUrl = evt.target.result;
      //     this.provFile = true;
      //     this.avatarUrl = this.previewUrl.split(',')[1];
      //
      //     console.log('OBS:in reader.onload 110:' + this.avatarUrl.length);
      //
      //     this.av.filename = files.name;
      //     this.av.filetype = files.type;
      //     //  console.dir(this.avatarUrl);
      //     // this.av.value = this.avatarUrl;
      //     //observer.next({avatar: this.avatarUrl});
      //     // this.nomalAvatar.avatar = this.av;
      //     resolve(this.previewUrl.split(',')[1]);
      //
      //
      //     console.log('in reader.onload 1');
      //     // console.dir(this.avatarUrl);
      //   };
      //
      // });
      //
      //
      // // reset
      // this.images = [];
      // ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
      //   observableImages.subscribe((image) => {
      //     this.images.push(image);
      //     console.log('compression on success');
      //     //  console.dir(image.compressedImage.imageDataUrl);
      //   }, (error) => {
      //     console.log("Error while converting");
      //   }, () => {
      //     this.processedImage = this.images[0];
      //   //  console.log('final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length + ' no comp:' + this.avatarUrl.length);
      //
      //     this.bb.then((x) => {
      //       console.log('next off bb:' + x.length);
      //       console.log('final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length + ' no comp:' + x.length);
      //
      //     });
      //     if (this.images[0].compressedImage.imageDataUrl.length < this.avatarUrl.length) {
      //       this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
      //       this.nomalAvatar.avatar = this.av;
      //     } else {
      //       this.av.value = this.avatarUrl;
      //       this.nomalAvatar.avatar = this.av;
      //     }
      //
      //   });
      // });


      // Promise.all([aa, bb])
      //   .then((a) => {
      //     console.log('a:' + a.length);
      //   });

    }
  }

  private imageReader(files: any): Observable<string> {


    const observable = new Observable(observer => {

      const reader = new FileReader();


      reader.readAsDataURL(files);


      reader.onload = (evt: any) => {
        this.previewUrl = evt.target.result;
        this.provFile = true;
        this.avatarUrl = this.previewUrl.split(',')[1];

        console.log('OBS:in reader.onload 110:' + this.avatarUrl.length);

        this.av.filename = files.name;
        this.av.filetype = files.type;
        //  console.dir(this.avatarUrl);
        // this.av.value = this.avatarUrl;
        observer.next({avatar: this.avatarUrl});
        // this.nomalAvatar.avatar = this.av;


        console.log('in reader.onload 1');
        // console.dir(this.avatarUrl);
      };

      // at removing of observable
      return () => {
        //  this.scktWrp.close();
      };
    });

    return observable;
  }

  // TODO: replace <any> with something usefull
  private compress(files: any): Observable<string> {
    const observable = new Observable(observer => {

      console.log('OBS:obserbser compression');

      // reset
      this.images = [];
      ImageCompressService.filesToCompressedImageSource(files).then(observableImages => {
        console.log('outer braces');
        observableImages.subscribe((image) => {
          this.images.push(image);
          console.log('OBS:compression on success');
          //  console.dir(image.compressedImage.imageDataUrl);
        }, (error) => {
          console.log("OBS:Error while converting");
        }, () => {
          this.processedImage = this.images[0];
          console.log('OBS:final on comporessed.length:' + this.images[0].compressedImage.imageDataUrl.length + ' no comp:' + this.avatarUrl.length);

          observer.next(this.images[0].compressedImage.imageDataUrl.split(',')[1]);
          // if (  this.images[0].compressedImage.imageDataUrl.length  < this.avatarUrl.length) {
          //   this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
          //   this.nomalAvatar.avatar = this.av;
          // }
          // else {
          //   this.av.value  = this.avatarUrl;
          //   this.nomalAvatar.avatar = this.av;
          // }

        });

      });

      // at removing of observable
      return () => {
        //  this.scktWrp.close();
      };
    });
    return observable;


  }
}




