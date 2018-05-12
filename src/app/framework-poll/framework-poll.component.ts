import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { AngularFirestore, AngularFirestoreDocument } from 'angularfire2/firestore';

@Component({
  selector: 'app-framework-poll',
  templateUrl: './framework-poll.component.html',
  styleUrls: ['./framework-poll.component.css'],
  encapsulation: ViewEncapsulation.Native
})
export class FrameworkPollComponent implements OnInit {

  angularVoteCount: number;
  reactVoteCount: number;
  vueVoteCount: number;
  updating = false;
  hasVoted = false;
  fsRef: AngularFirestoreDocument<any>;

  constructor(private afs: AngularFirestore) {
    afs.firestore.settings( {timestampsInSnapshots: true});
   }

  ngOnInit() {
    this.fsRef = this.afs.doc('frameworkPoll/curremt');

    this.fsRef.valueChanges().subscribe(doc => {
      this.angularVoteCount = doc.angularVoteCount;
      this.reactVoteCount = doc.reactVoteCount;
      this.vueVoteCount = doc.vueVoteCount;
    });
  }

  vote(framework: string){
    this.updating = true;
    this.afs.firestore.runTransaction(t => {
      return t.get(this.fsRef.ref).then(doc => {
        const newVoteCount = doc.data()[framework] +1;
        t.update(this.fsRef.ref, { [framework]: newVoteCount});
      });
    })
    .then(() =>{
      this.hasVoted = true;
      this.updating = false;
      console.log('vote commited');
    })
    .catch(error => console.log('vote failed: ' + error));
  }
  get angularVotePercent(){
    return (this.angularVoteCount / 
      (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount )) * 100;
  }
  get reactVotePercent(){
    return (this.reactVoteCount / 
      (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount )) * 100;
  }
  get vueVotePercent(){
    return (this.vueVoteCount / 
      (this.angularVoteCount + this.reactVoteCount + this.vueVoteCount )) * 100;
  }
  
}
