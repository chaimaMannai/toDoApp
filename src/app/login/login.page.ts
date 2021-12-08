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

