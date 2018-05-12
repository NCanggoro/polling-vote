import { BrowserModule } from '@angular/platform-browser';
import { NgModule, Injector } from '@angular/core';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { createCustomElement} from '@angular/elements';

import { AppComponent } from './app.component';
import { FrameworkPollComponent } from './framework-poll/framework-poll.component';

//copy config from firebase 
const config = {
  apiKey: "PUT YOUR API KEY HERE",
  authDomain: "api domain",
  databaseURL: "datanse url",
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
