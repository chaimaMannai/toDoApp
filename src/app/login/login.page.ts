import { Component, OnInit } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { async } from '@firebase/util';
import { AlertController, NavController } from '@ionic/angular';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {


  constructor(private authService : AuthService,private router:Router,private alrtCtr : AlertController) { }

  ngOnInit() {
    
    
  }
  /* Cette methode implémenté au niveau de service d'authetification firebase permet a un utilisateur de 
  logger apres va être rediriger vers home du notre application s'il y a un erreur va être notifié par alert */
  async loginUser(form):Promise<void>{
    this.authService.loginUser(form.value.email,form.value.password).then(
      ()=>{
        this.router.navigateByUrl('home');
      },
      async error=>{
        const alrt = await this.alrtCtr.create({
          message : error.message,
          buttons :[{text : 'OK', role : 'cancel'}],
  
        });
        await alrt.present();
      }
    )
  
  }

    /* cette methode appelé au niveau d'un bouton si l'utilisateur oublié son mot de passe  */
  gotoResetPwd(){ 
    this.router.navigateByUrl('reset-pwd'); 
  }

  /* goToRegisterPage() {
    this.navCtrl.navigateForward('/register');
  } */
  registerUser(){
    this.router.navigateByUrl('/register')
  }

}

