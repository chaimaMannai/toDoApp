import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
    children : [
      {
        path : 'todo',
        loadChildren : ()=> import('../todo/todo.module').then(m=>m.TodoPageModule)
      },
      {
        path : 'done',
        loadChildren : ()=> import('../done/done.module').then(m=>m.DonePageModule)
      }

    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HomePageRoutingModule {}
