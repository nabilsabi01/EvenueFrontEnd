import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';

export const adminProtectGuard: CanActivateFn = (route, state) => {
  
  if(localStorage.getItem('userRole')=='admin'){
    return true
  }
  else{
   inject(Router).navigate(['/error']); 
    return false;
  }
};
