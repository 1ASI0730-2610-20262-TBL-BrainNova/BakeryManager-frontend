import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { NavigationEnd, Router, RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatIconModule } from '@angular/material/icon';
import { filter } from 'rxjs';
import { TranslatePipe } from '@ngx-translate/core';
import { LanguageSwitcher } from '../language-switcher/language-switcher';

/**
 * Main shell component that hosts top-level navigation and routed content.
 */
@Component({
  selector: 'app-layout',
  imports: [
    CommonModule,
    RouterOutlet,
    RouterLink,
    MatToolbarModule,
    MatButtonModule,
    RouterLinkActive,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    TranslatePipe,
    LanguageSwitcher,
  ],
  templateUrl: './layout.html',
  styleUrl: './layout.css',
})
export class Layout {
  options = signal([
    { link: '/home', label: 'option.dashboard', icon: 'bar_chart' },
    { link: '/monitoring', label: 'option.iot', icon: 'sensors' },
    { link: '/production', label: 'option.production', icon: 'precision_manufacturing' },
    { link: '/inventory', label: 'option.inventory', icon: 'inventory_2' },
  ]);

  private readonly authRoutes = ['/sign-in', '/sign-up'];

  showShell = signal(true);

  constructor() {
    const router = inject(Router);
    this.showShell.set(!this.authRoutes.some(r => router.url.startsWith(r)));
    router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe((event: NavigationEnd) => {
        this.showShell.set(!this.authRoutes.some(r => event.urlAfterRedirects.startsWith(r)));
      });
  }
}
