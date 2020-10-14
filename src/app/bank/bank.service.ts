import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve, RouterStateSnapshot } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class BankService implements Resolve<any> {

  constructor() { }
  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    console.log(route);
  }
}
