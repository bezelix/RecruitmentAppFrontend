import { Directive, ElementRef, Input, OnInit, TemplateRef, ViewContainerRef } from '@angular/core';
import { AuthService } from 'src/app/dashboard/serivces/auth.service';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective implements OnInit {
  @Input('appIsLogged') IsLogged: boolean;
  constructor(
    private AuthService: AuthService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    console.log({
      IsLogged: this.IsLogged,
      auth: !!this.AuthService.authUser
    });

    if(!!this.AuthService.authUser !== this.IsLogged) {
      this.elementRef.nativeElement.style.display = 'none';
    }
  }
}
