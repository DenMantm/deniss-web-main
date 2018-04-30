// src/app/formdata-upload/base64-upload.component.ts

import {Component, ElementRef, ViewChild} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";

@Component({
  selector: 'base64-upload',
  templateUrl: 'app/view-uploaded-images/base64-upload/base64-upload.component.html'
})
export class Base64UploadComponent {
  form: FormGroup;
  loading: boolean = false;

  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder) {
    this.createForm();
  }

  createForm() {
    this.form = this.fb.group({
      avatar: ['', Validators.required]
    });
  }

  onFileChange(event) {
      console.log('hitting')
    let reader = new FileReader();
    if(event.target.files && event.target.files.length > 0) {
      let file = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.form.get('avatar').setValue({
          filename: file.name,
          filetype: file.type,
          value: reader.result.split(',')[1]
        })
      };
    }
  }

  onSubmit() {
    const formModel = this.form.value;
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
    // this.http.post('apiUrl', formModel)
    setTimeout(() => {
      console.log(formModel);
      alert('done!');
      this.loading = false;
    }, 1000);
  }

  clearFile() {
    this.form.get('avatar').setValue(null);
    this.fileInput.nativeElement.value = '';
  }
}