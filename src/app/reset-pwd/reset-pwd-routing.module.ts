import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { ResetPwdPage } from './reset-pwd.page';

const routes: Routes = [
  {
    path: '',
    component: ResetPwdPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ResetPwdPageRoutingModule {}
