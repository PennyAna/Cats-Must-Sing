import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes } from '@angular/router';
import { RouterModule } from '@angular/router'; 
import { DocumentComponent } from './document/document.component';
import { ContactComponent } from './contact/contact.component';
import { MessageListComponent } from './message/message-list/message-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { DocumentDetailComponent } from './document/document-detail/document-detail.component';
import { DocumentEditComponent } from './document/document-edit/document-edit.component';
import { MessageEditComponent } from './message/message-edit/message-edit.component';
import { MessageDetailComponent } from './message/message-detail/message-detail.component';
import { ContactDetailComponent } from './contact/contact-detail/contact-detail.component';
import { ContactEditComponent } from './contact/contact-edit/contact-edit.component';

const routes: Routes = [
 
  { path: 'document', component: DocumentComponent, 
  children: [
    {
    path: 'new', component: DocumentEditComponent,
    }, 
    {
      path: ':id', component: DocumentDetailComponent
    },
    { 
      path: ':id/edit', component: DocumentEditComponent
    },
  ], 
}, 
{ path: 'message', component: MessageListComponent, 
children: [
  {
    path: 'new', component: MessageEditComponent, 
  }, 
  {
    path: ':id', component: MessageDetailComponent, 
  }, 
  {
    path: ':id/edit', component: MessageEditComponent,
  },
]
}, 
  { path: 'contact', component: ContactComponent, 
  children: [
    {
      path: 'new', component: ContactEditComponent, 
    }, 
    {
      path: ':id', component: ContactDetailComponent, 
    }, 
    {
      path: ':id/edit', component: ContactEditComponent,
    },
  ] 
}, 
  { path: '', redirectTo: '/document', pathMatch: 'full' }, //redirect to document
 // { path: '**', component: PageNotFoundComponent }, //Wildcard route for 404 page
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