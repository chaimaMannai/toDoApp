import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { AngularFireDatabase } from '@angular/fire/compat/database';

@Component({
  selector: 'app-todo',
  templateUrl: './todo.page.html',
  styleUrls: ['./todo.page.scss'],
})
export class TodoPage implements OnInit {
  nb : number;
  date =  Date.now();
  task = '';
  tasks = [];
  ajout : boolean ;


  constructor(private serviceAuth : AuthService,private router : Router, 
    private DBfirebase : AngularFireDatabase) {
      this.allTasks();
    
  }

  ngOnInit() {
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
/* cette méthode permet l'ajout d'un task au niveau du firebase dans table 
Tasks on lui donnant attribus 
texte : nom task 
date : l'heure de création du task
 checked : par défaut checked n'est pas cochée car le task n'est pas fini encore lors de la création 
 uid : id d'utilisateur qui a ajouté task */
  ajouTache() {
    this.DBfirebase.list('Tasks/').push({
      text: this.task,
      date: new Date().toISOString(),
      checked: false,
      uid : this.serviceAuth.data
    });
    //this.show();
    this.ajout=false;
    this.nb++ ;

  }
    /* Cette methode permet de changer la valeur de la  variable booléenne ajout lors d'ajout d'un task*/
  show(){
    this.ajout = !this.ajout;
    this.task = '';
  }
  /*Cette methode permet de parcourir notre base firebase Tasks/ 
  et récupérer mes informations de nos tâches qui sont pas encore finis*/
  allTasks() {
    this.DBfirebase.list('Tasks/').snapshotChanges(['child_added', 'child_removed']).subscribe(actions => {
      this.tasks = [];
      actions.forEach(action => {
        if (action.payload.exportVal().checked==false && action.payload.exportVal().uid== this.serviceAuth.data)
        this.tasks.push({
          key: action.key,
          text: action.payload.exportVal().text,
          hour: action.payload.exportVal().date.substring(11, 16),
          checked: action.payload.exportVal().checked
        });
      });
    });
  }
   /* Changer l'état d'un task s'il est done ou encore n'est pas finie */
  changeState(ev: any) {
    console.log('checked: ' + ev.checked);
    this.DBfirebase.object('Tasks/' + ev.key + '/checked/').set(ev.checked);
  }


}
