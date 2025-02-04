import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuModule } from 'primeng/menu';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { ApiService } from './services/api.service';
import { Router } from '@angular/router'; // Router importálása

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MenuModule, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  isLoggedIn: boolean = false;

  items = [
    { label: 'Regisztráció', icon: 'pi pi-at', routerLink: '/register' },
    { label: 'Bejelentkezés', icon: 'pi pi-ethereum', routerLink: '/login' }
  ];

  loggedInItems = [
    { label: 'Tárhely Csomagok', icon: 'pi pi-database', routerLink: '/storagepackages' },
    { label: 'Profil', icon: 'pi pi-user', routerLink: '/profile' },
    { label: 'Kijelentkezés', icon: 'pi pi-sign-out', command: () => this.logout() }
  ];

  constructor(private router: Router) {
    this.isLoggedIn = this.getToken() !== null;

    this.router.events.subscribe(() => {
      this.isLoggedIn = this.getToken() !== null;
    });
  }

  getToken(): string | null {
    return localStorage.getItem('tarhelyszolgaltato');
  }
  logout() {
    localStorage.removeItem('tarhelyszolgaltato');
    localStorage.removeItem('user');
    this.isLoggedIn = false;

    this.router.navigate(['/login']);
  }
}
