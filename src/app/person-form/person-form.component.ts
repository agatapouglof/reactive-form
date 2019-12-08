import { Component, OnInit } from '@angular/core';

import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-person-form',
  templateUrl: './person-form.component.html',
  styleUrls: ['./person-form.component.css']
})
export class PersonFormComponent implements OnInit {

  personForm : FormGroup;
  validationMessages = {
    nom : {
      required : "le Nom est requis pour ce formulaire",
      minlength : "ce champ doit avoir au moins 3 caracteres"
    },
    prenoms : {
      required : "Au moins un prenoms s'il vous plait",
      minlength : "4 caracteres au moins pour ce champ"
    },
    genre : {
      required : "Le genre est obligatoire"
    }
  };

  formErrors = {
    nom : "",
    prenoms : "",
    genre : ""
  };
  constructor(private fb:FormBuilder) { }

  ngOnInit() {
    this.personForm = this.fb.group({
      nom : ["",[Validators.required, Validators.minLength(3)]],
      prenoms : ["",[Validators.required,Validators.minLength(4)]],
      genre : ["",Validators.required]
    });

    this.personForm.valueChanges.subscribe( data =>{
      this.onValueChanged(data);
    })
  }


  public formSubmit(){
    console.log("submitted form")
  }

  private onValueChanged(data?:any){
    for(const field in this.personForm.controls){
      this.formErrors[field] = '';
      const control = this.personForm.controls[field];

      if (control && control.dirty && !control.valid){
        const messages = this.validationMessages[field];
        for(const key in control.errors){
          this.formErrors[field] += messages[key] + ' ';
        }
      }
    }
  }

}
