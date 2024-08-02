import { inject } from '@angular/core';
import { CanActivateFn,Router } from '@angular/router';

export const protectGuard: CanActivateFn = (route, state) => {
  if(localStorage.getItem('userRole')=='user'){
    return true
  }
  else{
    inject(Router).navigate(['/error']);
    return false;
  }
};
