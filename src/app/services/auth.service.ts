import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';



@Injectable({
  providedIn: 'root'
})
export class AuthService {
  data : string ;

  constructor(private authFire:AngularFireAuth ) { }


/* Pour enregistrer un nouvel utilisateur dans le service d'authentification Firebase, nous appellerons
la méthode createUserWithEmailAndPassword()
 avec l'adresse e-mail et le mot de passe fournis par un utilisateur
à partir de la page register. */

  registerUser(value) {
    return new Promise<any>((resolve, reject) => {
      this.authFire.createUserWithEmailAndPassword(value.email, value.password)
        .then(
          res => resolve(res),
          err => reject(err))
    })
  }
  /* Authentification avec mot de passe et email qui sont enregistré dans Firebase d'utilisateur déja
  enregistré si l'utilisateur n'est pas enregistré il va pas être logger */ 
  loginUser(email : string ,password : string){
    
      return this.authFire.signInWithEmailAndPassword(email,password).then(
        (res)=>{
          this.data= res.user.uid;
        }
      );
    
  }
  /* Si l'utilisateur a oublié son mot de passe il va être notifié par un mail pour le réinitialiser */
  resetPwd(email:string){
    return this.authFire.sendPasswordResetEmail(email) 
      .then( res  => { 
        console.log ('was mailed'); 
      }).catch (error => { 
        console.log(error); 
      }); 

  }
  /* deconnexion d'un utilisateur avec la methode signOut() qui est disponible dans AngularFireAuth va
  supprimera la session d'utilisateur dans le service d'authentification Firebase. */
  deconnexion(){
    return new Promise<void>((resolve, reject) => {
      if (this.authFire.currentUser) {
        this.authFire.signOut()
          .then(() => {
            resolve();
          }).catch(() => {
            reject();
          });
      }
    })
  }

  

}
