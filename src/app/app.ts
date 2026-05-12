import { Component, inject, signal } from '@angular/core';
import { Layout } from './shared/presentation/components/layout/layout';
import { TranslateService } from '@ngx-translate/core';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Layout, RouterOutlet],
  templateUrl: './app.html',
  styleUrl: './app.css',
})
export class App {
  protected readonly title = signal('BakeryManager-frontend');
  private translate = inject(TranslateService);

  constructor() {
    this.translate.addLangs(['en', 'es']);
    this.translate.setDefaultLang('en');
    const browserLang = this.translate.getBrowserLang();
    const langToUse = browserLang?.match(/en|es/) ? browserLang : 'en';
    this.translate.use(langToUse);
  }
}
