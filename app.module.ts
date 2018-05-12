import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { createCustomElement} from '@angular/elements';

import { AppComponent } from './app.component';
import { FrameworkPollComponent } from './framework-poll/framework-poll.component';

const config = {

  //copy paste API information from firebase 
  apiKey: "PUT THE API KEY HERE",
  authDomain: "PUT YOUR DOMAIN",
  databaseURL: "PUT UR DATABSE URL",
  projectId: "framework-poll-fb11d",
  storageBucket: "framework-poll-fb11d.appspot.com",
  messagingSenderId: "1075619020166"
}
@NgModule({
  declarations: [
    AppComponent,
    FrameworkPollComponent
  ],
  imports: [
    BrowserModule,
    AngularFireModule.initializeApp(config),
    AngularFirestoreModule
  ],
  providers: [],
  entryComponents: [
    FrameworkPollComponent
  ]
})
export class AppModule { 
  constructor (private injector : Injector){}
  
  ngDoBootstrap(){
    const el = createCustomElement(FrameworkPollComponent, {
      injector : this.injector});
      customElements.define('framework-poll', el);
  }
}
