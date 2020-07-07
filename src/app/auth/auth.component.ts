import { Component, OnInit, ComponentFactoryResolver, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { AuthService, AuthResponseData } from './auth.service';
import { Observable, Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { AlertComponent } from '../shared/alert/alert.component'
import { PlaceholderDirective } from '../shared/placeholder/placeholder.directive';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.css']
})
export class AuthComponent implements OnInit {

  @ViewChild(PlaceholderDirective) alertHost: PlaceholderDirective;
  private closeSub : Subscription;
  alreadyUser = true;
  isLoading = false;
  error: string = null;

  constructor(private authService: AuthService,
    private router: Router,
    private componentFactoryResolver: ComponentFactoryResolver) { }

  ngOnInit(): void {
  }

  onSwitchMode() {
    this.alreadyUser = !this.alreadyUser;
  }

  onHandleError() {
    this.error = null;
  }

  onSubmit(authForm: NgForm) {
    const email = authForm.value.email;
    const password = authForm.value.password;

    let authObs: Observable<AuthResponseData>;
    this.isLoading = true;
    if (this.alreadyUser) {
      authObs = this.authService.logIn(email, password)
    }
    else {
      authObs = this.authService.signUp(email, password)
    }
    authObs.subscribe(
      resData => {
        console.log(resData)
        this.isLoading = false
        this.router.navigate(['/recipes'])
      }, errorMessage => {
        this.error = errorMessage
        this.showErrorAlert(errorMessage)
        console.log(errorMessage)
        this.isLoading = false
      }
    )
  }

  private showErrorAlert(message: string) {
    // const alertCmp = new AlertComponent();
    const alertCmpFactory = this.componentFactoryResolver.resolveComponentFactory(AlertComponent);
    const hostViewcontainerRef = this.alertHost.viewContainer;
    hostViewcontainerRef.clear();

    const componentRef = hostViewcontainerRef.createComponent(alertCmpFactory);
    componentRef.instance.message = message;
    this.closeSub = componentRef.instance.close.subscribe(() => {
      this.closeSub.unsubscribe();
      hostViewcontainerRef.clear();
    })
  }
}


// error.error.message

          // if (error.error.message = "EMAIL_EXISTS") {
          //   this.error = "Email already exists"
          // } else {
          //   this.error = "An error occurred"
          // }