import { Component, OnInit } from '@angular/core';
import { from } from 'rxjs';
import { CityService } from 'src/app/services/city.service';
import {FormGroup,FormControl,Validators,FormBuilder} from '@angular/forms'
import { City } from 'src/app/models/city';
import { Editor } from 'ngx-editor';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-city-add',
  templateUrl: './city-add.component.html',
  styleUrls: ['./city-add.component.css'],
  providers:[CityService]
})
export class CityAddComponent implements OnInit {

  constructor(
    private cityService:CityService,
    private formBuilder:FormBuilder,
    private authService:AuthService

    ) { }
  city:City;
  cityAddForm:FormGroup;

  editor: Editor;
  html: '';
  createCityForm(){
    this.cityAddForm = this.formBuilder.group(
      {
      name:["",Validators.required],
      description:["",Validators.required]
    })
  }

  ngOnInit() {
    this.createCityForm();
    this.editor = new Editor();
    console.log(this.authService.getCurrentUserId());
    
  }

  add(){
    if(this.cityAddForm.valid){
      this.city = Object.assign({},this.cityAddForm.value)
      this.city.userId =this.authService.getCurrentUserId();
      this.cityService.add(this.city);
      
      
    }
  }
}
