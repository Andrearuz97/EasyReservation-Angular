import { Injectable } from '@angular/core';
import {
    ActivatedRouteSnapshot,
    CanActivate,
    RouterStateSnapshot,
    Router,
    UrlTree,
} from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from './auth.service';
import { map, take } from 'rxjs/operators';

@Injectable({
    providedIn: 'root',
})
export class AuthGuard implements CanActivate {

    constructor(private authSrv: AuthService, private router: Router) {}

    canActivate(
        route: ActivatedRouteSnapshot,
        state: RouterStateSnapshot
    ):
        | Observable<boolean | UrlTree>
        | Promise<boolean | UrlTree>
        | boolean
        | UrlTree {
        return this.authSrv.user$.pipe(
            take(1),
            map((utente) => {
                if (utente) {
                    // Controlla se la rotta richiede un ruolo admin
                    if (route.data['role'] && route.data['role'].indexOf('ADMIN') !== -1) {
                      // Controlla se l'utente ha il ruolo admin
                        if (this.authSrv.isAdmin()) {
                            return true;
                        } else {
                            alert('Non hai i permessi per accedere a questa risorsa.');
                            return this.router.createUrlTree(['/']);
                        }
                    }
                    return true;
                }
                alert('Per visualizzare questa risorsa devi essere loggato\nAccedi o registrati');
                return this.router.createUrlTree(['login']);
            })
        );
    }
}
