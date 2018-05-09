// src/app/formdata-upload/base64-upload.component.ts

import {Component, ElementRef, ViewChild,Output,EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators,FormControl} from "@angular/forms";
import { Http, Response, Headers, RequestOptions, URLSearchParams} from '@angular/http';

@Component({
  selector: 'base64-upload',
  templateUrl: 'app/view-uploaded-images/base64-upload/base64-upload.component.html'
})
export class Base64UploadComponent {
  form: FormGroup;
  avatar:FormControl;
  loading: boolean = false;
  @Output() imageUploaded = new EventEmitter();
  
  formData:any;
  
  @ViewChild('fileInput') fileInput: ElementRef;

  constructor(private fb: FormBuilder, private http:Http) {
    // this.createForm();
  }
  ngOnInit(){
    this.avatar = new FormControl('',Validators.required);
    
        this.form = new FormGroup({
            avatar:this.avatar
        })
    
    
  }

  // createForm() {
  //   this.form = this.fb.group({
  //     avatar: ['']
  //   });
  // }

  onFileChange(event) {
      console.log('hitting')

    // let reader = new FileReader();
    // if(event.target.files && event.target.files.length > 0) {
    //   let file = event.target.files[0];
    //   reader.readAsDataURL(file);
    //   reader.onload = () => {
    //     this.form.get('avatar').setValue({
    //       filename: file.name,
    //       filetype: file.type,
    //       value: reader.result.split(',')[1]
    //     })
    //   };
    // }
    //this.form.setValue({})
    
    let fileList: FileList = event.target.files;
   if(fileList.length > 0) {
    let file: File = fileList[0];
    
    this.formData = new FormData();
    this.formData.append('avatar', file, file.name);
   } 
   
   
   
      let file = event.target.files[0];
      this.avatar.setValue({
          filename: file.name,
          filetype: file.type,
          value: ''
        })
   
   
  }

  onSubmit() {
    
    //const formModel = this.form.value;
    
    this.loading = true;
    // In a real-world app you'd have a http request / service call here like
     
    // this.http.post('api/upload', formModel).subscribe(res => {
    //   console.log(res);
    // })
    
        let headers = new Headers();
    /** No need to include Content-Type in Angular 4 */
    // headers.append('Content-Type', 'multipart/form-data');
    // headers.append('Accept', 'application/json');
    
    
     this.http.post('api/upload', this.formData, 
     {headers: headers})
        .map(res => res.json())
        .catch(function(err){
          throw err;
        })
        .subscribe(
            (data:any) => {console.log('success'); this.loading = false;
            console.log(data);
            this.imageUploaded.emit(data.image);
              
            },
            error => console.log(error)
        )
    
  }


}