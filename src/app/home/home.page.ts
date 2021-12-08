import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';


@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  nb : number =0;
  

  constructor(private serviceAuth : AuthService,private router : Router, 
    private DBfirebase : AngularFireDatabase) {
      this.allTasks();
    
  }

  deconnexion() {
    this.serviceAuth.deconnexion()
      .then(res => {
        this.router.navigateByUrl('login');
      })
      .catch(error => {
        console.log(error);
      })
  }

  
  /* */
  allTasks() {
    this.DBfirebase.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      actions.forEach(action => {
        if(action.payload.exportVal().checked==false)
        this.nb = this.nb +1 ; 
      });
    });
  }
  /* */
  changeState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.DBfirebase.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }

}
