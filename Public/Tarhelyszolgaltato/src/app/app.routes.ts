import { Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { StoragePackagesComponent } from './components/storagepackages/storagepackages.component';
import { ProfileComponent } from './components/profile/profile.component';
export const routes: Routes = [
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent},
    {path: 'storagepackages', component: StoragePackagesComponent},
    {path: 'profile', component: ProfileComponent},
];
