import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Injectable, enableProdMode } from '@angular/core';
import { HttpEvent, HttpInterceptor, HttpHandler, HttpRequest, HTTP_INTERCEPTORS } from '@angular/common/http';
import { Observable } from 'rxjs'; // IMPORTANTE: IMPORT ATUALIZADO
import { catchError } from 'rxjs/operators';
import { StorageService } from 'src/services/storage.service';
import { AlertController } from '@ionic/angular';

@Injectable()
export class ErrorInterceptor implements HttpInterceptor {

    constructor(public storage: StorageService, public alertController: AlertController) {
    }

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        return next.handle(req)
        .pipe(
            catchError((error) =>{

                let errorObj = error;
                if(errorObj.error){
                    errorObj = errorObj.error;
                }
                if(!errorObj.status){
                    errorObj = JSON.parse(errorObj);
                }

                console.log("Erro detectado pelo interceptor:");
                console.log(errorObj);

                switch(errorObj.status) {
                    case 401:
                    this.handle401();
                    break;
                    case 403:
                    this.handle403();
                    break;
                    default:
                    this.handleDefaultError(errorObj);
                    break;
                }

                return Observable.throw(errorObj);
            }))as any;
    }
    async handleDefaultError(errorObj){
        const alert = await this.alertController.create({
            header: 'Erro' + errorObj.status + ": "+ errorObj.error,
            message: errorObj.message,
            buttons: [
                {
                    text:'OK'
                 }
        ]
        });
        await alert.present();
    }
    handle403() {
        this.storage.setLocalUser(null);
    }

    async handle401(){
        const alert = await this.alertController.create({
            header: 'Erro 401:',
            subHeader:'falha de autenticação',
            message: 'Email ou senha incorretos',
            buttons: [
                {
                    text:'OK'
                 }
        ]
        });
        await alert.present();
    }
}
   
 


export const ErrorInterceptorProvider = {
    provide: HTTP_INTERCEPTORS,
    useClass: ErrorInterceptor,
    multi: true,
};