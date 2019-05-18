import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Injectable } from "@angular/core";
import { nextContext } from '@angular/core/src/render3';
import { Router } from '@angular/router';
import { tap } from 'rxjs/operators';

@Injectable()
export class AuthInterceptor implements HttpInterceptor{
    
constructor(private router:Router) {
        
}

    intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        if(localStorage.getItem('token') != null){
            const clonedReq = req.clone({
                headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('token'))
            });

            return next.handle(clonedReq).pipe(
                tap(
                    succ => {},
                    err => {
                        if(err.status == 401){
                            this.router.navigateByUrl('/user/login');
                        }
                    }
                )
            )
        }
        else {
            return next.handle(req.clone());
        }
    }
}