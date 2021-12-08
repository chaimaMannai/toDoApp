import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AlertController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  
  userForm: FormGroup;
  successMsg: string = '';
  errorMsg: string = '';
  
    /*Email est obligatoire , il faut qu'il est sous format d'un email*/
    error_msg = {
    'email': [
      { 
        type: 'required', 
        message: 'Provide email.' 
      },
      { 
        type: 'pattern', 
        message: 'Email is not valid.' 
      }
    ],
    /*Mot de passe est obligatoire , il faut qu'il est supérieure à 3*/
    'password': [
      { 
        type: 'required', 
        message: 'Mot de passe obligatoire .' 
      },
      { 
        type: 'minlength', 
        message: 'Mot de passe doit être supérieure à 3.' 
      }
    ]
  };
  constructor(private authService : AuthService,private router:Router,private alrtCtr : AlertController,
    private fb: FormBuilder){}
  ngOnInit() {
    this.userForm = this.fb.group({
      email: new FormControl('', Validators.compose([
        Validators.required,
        Validators.pattern('^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$')
      ])),
      password: new FormControl('', Validators.compose([
        Validators.minLength(3),
        Validators.required
      ])),
    });
    
  }
  /* Cette methode permet la création d'un nouvel utilisateur aprés il va être rediriger vers page login pour
  faire l'authentification avec succés */
registerUser(value) {
  this.authService.registerUser(value)
    .then((response) => {
      this.errorMsg = "";
      this.successMsg = "Votre compte crée avec succes.";
    }, error => {
      this.errorMsg = error.message;
      this.successMsg = "";
    })
    this.router.navigateByUrl('/login');
}
  
}
