// import { inject } from '@angular/core';
// import { CanActivateFn, Router } from '@angular/router';

// export const authGuard: CanActivateFn = (route, state) => {
//   const router = inject(Router);
//   const isBrowser =
//     typeof window !== 'undefined' && typeof localStorage !== 'undefined';
//   if (!isBrowser) {
//     // You can choose to deny or allow access on the server
//     return false; // or `true` depending on your SSR strategy
//   }
//   const storedUser = localStorage.getItem('login');
//   const user = storedUser ? JSON.parse(storedUser) : null;
//   if (!user) {
//     router.navigate(['/login']);
//     return false;
//   }
//   const allowedRoles = route.data?.['roles'] as string[] | undefined;
//   if (allowedRoles && !allowedRoles.includes(user.role)) {
//     alert('Access Denied');
//     router.navigate(['/login']);
//     return false;
//   }
//   return true;
// };
import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { isPlatformBrowser } from '@angular/common';
import { PLATFORM_ID } from '@angular/core';

export const authGuard: CanActivateFn = (route, state) => {
  const router = inject(Router);
  const platformId = inject(PLATFORM_ID);

  // Check if we're running in the browser
  if (!isPlatformBrowser(platformId)) {
    // During SSR, allow the route and let client-side handle auth
    return true;
  }

  // Now we're safely in the browser
  const storedUser = localStorage.getItem('login');
  const user = storedUser ? JSON.parse(storedUser) : null;

  if (!user) {
    router.navigate(['/login']);
    return false;
  }

  const allowedRoles = route.data?.['roles'] as string[] | undefined;
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    alert('Access Denied');
    router.navigate(['/login']);
    return false;
  }

  return true;
};
