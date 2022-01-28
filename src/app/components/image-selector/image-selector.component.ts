import { Component, EventEmitter, Input, OnInit, Output, TemplateRef, ViewChild } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { BsModalRef, BsModalService } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-image-selector',
  templateUrl: './image-selector.component.html',
  styleUrls: ['./image-selector.component.scss']
})
export class ImageSelectorComponent implements OnInit {
  @ViewChild('imagePickerModal') public imageModalRef: TemplateRef<any>;

  image: string;
  modalRef: BsModalRef;
  croppedImage: string;

  @Input() defaultImage: string;
  @Output() imageChangedEmitter = new EventEmitter<string>();

  constructor(private modalService: BsModalService) {}

  ngOnInit(): void {
    this.image = this.defaultImage;
    this.croppedImage = this.defaultImage;
  }

  imageCropped(event: ImageCroppedEvent): void {
    this.croppedImage = event.base64;
  }

  applyCrop(): void {
    this.imageChangedEmitter.emit(this.croppedImage);
    this.modalRef.hide();
  }

  imageChanged(event: any): void {
    const file = event.target?.files[0];

    if (file) {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.image = reader.result as string;
        this.openImagePicker();
      };
      reader.onerror = (error) => {
        console.log('Error: ', error);
      };
    } else {
      this.image = event;
    }
  }

  deleteImage(): void {
    this.image = undefined;
    this.croppedImage = undefined;
    this.imageChangedEmitter.emit('');
  }

  fetchRandomImage(): void {
    this.getBase64ImageFromUrl('https://picsum.photos/320').then((result) => {
      this.image = result;
      this.croppedImage = this.image;
      this.imageChanged(this.image);
      this.imageChangedEmitter.emit(this.image);
    });
  }

  async getBase64ImageFromUrl(imageUrl): Promise<any> {
    const res = await fetch(imageUrl);
    const blob = await res.blob();

    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.addEventListener(
        'load',
        () => {
          resolve(reader.result);
        },
        false
      );

      reader.onerror = () => {
        return reject(this);
      };
      reader.readAsDataURL(blob);
    });
  }

  private openImagePicker(): void {
    this.modalRef = this.modalService.show(this.imageModalRef, { class: 'modal-lg' });
  }
}
