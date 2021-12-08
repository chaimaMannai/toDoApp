import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-reset-pwd',
  templateUrl: './reset-pwd.page.html',
  styleUrls: ['./reset-pwd.page.scss'],
})
export class ResetPwdPage implements OnInit {
  email='';

  constructor( private serviceAuth : AuthService , private router : Router) { }

  ngOnInit() {
  }
/* Appel à la methode resetPwd qui est implémentée dans le service AuthService 
  Rediréction vers la page login aprés réinitialisation du mot de passe*/
    onSubmit ()  { 
      this.serviceAuth.resetPwd(this.email); 
      this.router.navigateByUrl('/login')

    } 
  
    
  

}
