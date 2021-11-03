import { Directive, ElementRef, Input, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { startWith, takeUntil } from 'rxjs/operators';
import { AuthService } from 'src/app/dashboard/serivces/auth.service';

@Directive({
  selector: '[appIsLogged]'
})
export class IsLoggedDirective implements OnInit, OnDestroy {
  @Input('appIsLogged') IsLogged: boolean;
  onDestroy$ = new Subject();

  constructor(
    private AuthService: AuthService,
    private elementRef: ElementRef,
  ) { }

  ngOnInit(): void {
    this.AuthService.authUser$.pipe(
      startWith(this.AuthService.authUser),
      takeUntil(this.onDestroy$),
    ).subscribe(() => this.check());
  }

  private check() {
    const className = 'hidden';

    if(!!localStorage.getItem('token') !== this.IsLogged) {
      this.elementRef.nativeElement.classList.add(className);
    } else if (this.elementRef.nativeElement.classList.contains(className)) {
      this.elementRef.nativeElement.classList.remove(className);
    }
  }

  ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }
}
