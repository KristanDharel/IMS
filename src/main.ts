import { bootstrapApplication } from '@angular/platform-browser';
import 'zone.js';
import { appConfig } from './app/app.config';
import { App } from './app/app';
import { provideRouter } from '@angular/router';
import { routes } from './app/app.routes';

bootstrapApplication(App, {
  providers: [provideRouter(routes)],
}).catch((err) => console.error(err));
