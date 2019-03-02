import { AuthService } from './../../services/auth.service';
import { CategoriaService } from './../../services/domain/categoria.service';
import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MenuController } from '@ionic/angular';
import { CredenciaisDTO } from 'src/models/credenciais.dto';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  creds: CredenciaisDTO = {
    email: "",
    senha: ""
  };

  constructor(public router: Router, public menu: MenuController,public auth: AuthService){

  }
  
  ngOnInit() {
    this.menu.enable(false);
  }
  ionViewDidLeave() {
    this.menu.enable(true);
  }


  login( ){
    this.auth.authenticate(this.creds)
      .subscribe(response =>{
        this.auth.successfulLogin(response.headers.get('Authorization'));
        this.router.navigateByUrl('categorias') 
      },
      error => {});

  }
}
