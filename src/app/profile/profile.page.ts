import { StorageService } from 'src/services/storage.service';
import { LocalUser } from './../../models/local_user';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  email: string;

  constructor(
    public storage: StorageService,
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if( localUser && localUser.email){
      this.email = localUser.email;
    }
  }

}
