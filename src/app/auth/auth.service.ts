import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { catchError, tap } from 'rxjs/operators';
import { throwError, Subject, BehaviorSubject } from 'rxjs';
import { User } from './user.model';
import { Router } from '@angular/router';

export interface AuthResponseData {
    idToken: string,
    email: string
    refreshToken: string,
    expiresIn: string,
    localId: string
}

@Injectable({ providedIn: 'root' })
export class AuthService {
    private expirationTimer: any;
    user = new BehaviorSubject<User>(null);

    constructor(private http: HttpClient,
        private router: Router) { }

    signUp(email: string, password: string) {
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC095IfYP8yGuHq94PLVCulcI4MpqymrIk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
    }

    logIn(email: string, password: string) {
        console.log(this.user)
        return this.http.post<AuthResponseData>('https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC095IfYP8yGuHq94PLVCulcI4MpqymrIk',
            {
                email: email,
                password: password,
                returnSecureToken: true
            }
        ).pipe(catchError(this.handleError), tap(resData => {
            this.handleAuthentication(resData.email, resData.localId, resData.idToken, +resData.expiresIn)
        }))
    }

    logOut() {
        this.user.next(null);
        localStorage.clear();
        console.log(this.user);
        this.router.navigate(['/auth']);
        if (this.expirationTimer) {
            clearTimeout(this.expirationTimer)
        }
        this.expirationTimer = null;
    }

    autoLogin() {
        const UserItem: User = JSON.parse(localStorage.getItem('userItem'));
        if (!UserItem) {
            return;
        }
        const loadedUser = new User(UserItem.email, UserItem.id, UserItem._token, UserItem._tokenExpirationDate)

        if (loadedUser.token) {
            const expirationDuration = new Date(UserItem._tokenExpirationDate).getTime() - new Date().getTime();
            this.autoLogout(expirationDuration);
            this.user.next(loadedUser);
        }
    }

    autoLogout(expirationDuration: number) {
        this.expirationTimer = setTimeout(() => {
            this.logOut()
        }, expirationDuration)
        console.log(expirationDuration)
    }

    private handleAuthentication(email: string, userid: string, idToken: string, expiresIn: number) {
        const expirationDate = new Date(new Date().getTime() + expiresIn * 1000)
        const user = new User(email, userid, idToken, expirationDate)
        this.user.next(user);
        this.autoLogout(expiresIn * 1000);
        localStorage.setItem('userItem', JSON.stringify(user))
    }

    private handleError(errRes: HttpErrorResponse) {
        let errorMessage = "An error occurred!";
        if (!errRes.error || !errRes.error.error) {
            return throwError(errorMessage)
        }
        switch (errRes.error.error.message) {
            case 'EMAIL_EXISTS':
                errorMessage = 'This Email is already in use';
                break;
            case 'INVALID_PASSWORD':
                errorMessage = 'This password is Invalid';
                break;
            case 'EMAIL_NOT_FOUND':
                errorMessage = "This email was not found! New User can Register";
                break;
        }
        return throwError(errorMessage)
    }
}