import { StorageService } from './../storage.service';
import { API_CONFIG } from 'src/config/api.config';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ClienteDTO } from 'src/models/cliente.dto';

@Injectable()
export class ClienteService{

    constructor( public http : HttpClient, public storage: StorageService){
         
    }

    findByEMail( email : string) : Observable<ClienteDTO>{
        let token = this.storage.getLocalUser().token;
        let authHeader = new HttpHeaders({'Authorization' : 'Bearer ' + token});


        return this.http.get<ClienteDTO>(
            `${API_CONFIG.baseUrl}/clientes/email?value=${email}`,
            {'headers' : authHeader});
    }

    getImageFromBucket(id : string) : Observable<any>{
        let url = `${API_CONFIG.backetBaseUrl}/cp${id}.jpg`;
        return this.http.get(url, {responseType : 'blob'});
    }
}