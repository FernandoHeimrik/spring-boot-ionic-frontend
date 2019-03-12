import { API_CONFIG } from './../../config/api.config';
import { ClienteService } from 'src/services/domain/cliente.service';
import { StorageService } from 'src/services/storage.service';
import { LocalUser } from './../../models/local_user';
import { Component, OnInit } from '@angular/core';
import { ClienteDTO } from 'src/models/cliente.dto';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.page.html',
  styleUrls: ['./profile.page.scss'],
})
export class ProfilePage implements OnInit {

  cliente : ClienteDTO;


  constructor(
    public storage: StorageService,
    public clienteService : ClienteService
  ) { }

  ngOnInit() {
    let localUser = this.storage.getLocalUser();
    if( localUser && localUser.email){
      this.clienteService.findByEMail(localUser.email)
        .subscribe(response =>{
          this.cliente = response;
          this.getImageIfExist();
        },
        error => {})
    }
  }

  getImageIfExist(){
    this.clienteService.getImageFromBucket(this.cliente.id)
      .subscribe(response =>{
        this.cliente.imageUrl = `${API_CONFIG.backetBaseUrl}/cp${this.cliente.id}.jpg`;
      },
      error => {});
  }
}
