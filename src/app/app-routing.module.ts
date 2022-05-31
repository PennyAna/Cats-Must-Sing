import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { MessageListComponent } from './message/message-list/message-list.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/document', pathMatch: 'full' }, 
  { path: 'documents', component: DocumentComponent }, 
  { path: 'messages', component: MessageListComponent }, 
  { path: 'contacts', component: ContactComponent }
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule, 
    [RouterModule.forRoot(appRoutes)], 
  ], 
  exports: [RouterModule]
})
export class AppRoutingModule {}