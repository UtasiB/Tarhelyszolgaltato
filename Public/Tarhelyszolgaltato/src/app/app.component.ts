import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { RegisterComponent } from './components/register/register.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],

})
export class AppComponent {
  
  items = [
    { label: 'Haza', icon: 'pi pi-home', routerLink: '/' },
    { label: 'Regisztráció', icon: 'pi pi-at', routerLink: '/register' },
    { label: 'Bejelentkezés', icon: 'pi pi-ethereum', routerLink: '/login' }
  ];
}
