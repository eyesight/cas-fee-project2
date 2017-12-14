import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {AlertService, UserService} from '../../_services/index';
import {Avatar, User, UserAvatar} from '../../_models/user.model';
//import {ImageCompressor, Options} from 'image-compressor';
//import {ImageCompressor} from '/node_modules/image-compressor';
//import {ImageCompressService} from "ng2-image-compress";
import { ImageCompressService, ResizeOptions, ImageUtilityService, IImage, SourceImage } from  'ng2-image-compress';
import {Ng2ImgMaxService} from "ng2-img-max";
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
  processedImages: any = [];
   images: Array<IImage> = [];
   fileList: FileList;


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
    //  console.log('in reader.onload 0:' + event.target.files[0]. imageDataUrl.length);
      console.dir(files);
      reader.readAsDataURL(files);

     //   let files =    Array.from(event.target.files);
      console.log('fiels:');


      //
      // this.ng2ImgToolsService.resize(event.target.files[0], 100, 100).subscribe(result => {
      //   //all good, result is a file
      //   console.info(result);
      // }, error => {
      //   //something went wrong
      //   //use result.compressedFile or handle specific error cases individually
      // });


      // this.ng2ImgMax.resizeImage(event.target.files[0], 100, 100).subscribe(
      //   result => {
      //   //  this.uploadedImage = new File([result], result.name);
      //
      // console.log('resize to 100px:' + result.length);
      // console.dir(result);

        /*  ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
            observableImages.subscribe((image) => {
              this.images.push(image);
              console.log('compression on success' );
            //  console.dir(image.compressedImage.imageDataUrl);
            }, (error) => {
              console.log("Error while converting");
            }, () => {
              this.processedImages = this.images;
              console.log('final on success:' +  this.images[0].compressedImage.imageDataUrl.length);

              // this.av.filename = files.name;
              // this.av.filetype = files.type;
              //    this.av.value = event.target.result.split(',')[1];
              //  this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
              // // this.nomalAvatar.avatar = this.av;
              //

              // this.showTitle = true;
            });
          });*/

      //   },
      //   error => {
      //     console.log('😢 Oh no!', error);
      //   }
      // )






      reader.onload = (event: any) => {
        this.previewUrl = event.target.result;
        this.provFile = true;
        this.avatarUrl = this.previewUrl.split(',')[1];

        console.log('in reader.onload 110:' + this.avatarUrl.length);


       /* ImageCompressService.filesToCompressedImageSource(event.target.files).then(observableImages => {
          observableImages.subscribe((image) => {
            this.images.push(image);
            console.log('compression on success' );
            //  console.dir(image.compressedImage.imageDataUrl);
          }, (error) => {
            console.log("Error while converting");
          }, () => {
            this.processedImages = this.images;
            console.log('final on success:' +  this.images[0].compressedImage.imageDataUrl.length);

            // this.av.filename = files.name;
            // this.av.filetype = files.type;
            //    this.av.value = event.target.result.split(',')[1];
              this.av.value = this.images[0].compressedImage.imageDataUrl.split(',')[1];
            this.nomalAvatar.avatar = this.av;
            //

            // this.showTitle = true;
          });
        });*/

        //  this.nomalAvatar = ;
        // const av = new Avatar;
        this.av.filename = files.name;
        this.av.filetype = files.type;
      //  console.dir(this.avatarUrl);
       this.av.value = this.avatarUrl;
     //   this.av.value = this.images[0].imageDataUrl;

        // console.log('final on afiilling' +  this.images[0].compressedImage.imageDataUrl.length);
        //
        // this.av.value = this.images[0].compressedImage.imageDataUrl;

        this.nomalAvatar.avatar = this.av;


        console.log('in reader.onload 1');
       // console.dir(this.avatarUrl);
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




