import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { MessageListComponent } from './message/message-list/message-list.component';

const routes: Routes = [
  { path: '', redirectTo: '/document', pathMatch: 'full' }, 
  { path: 'document', component: DocumentComponent }, 
  { path: 'message', component: MessageListComponent }, 
  { path: 'contact', component: ContactComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    [RouterModule.forRoot(routes)], 
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule {}