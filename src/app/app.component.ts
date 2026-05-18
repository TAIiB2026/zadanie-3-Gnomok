import { Component } from '@angular/core';
import { LastActionService } from './last-action.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: false
})
export class AppComponent {
  lastAdd$: Observable<Date | null>;
  lastRemove$: Observable<Date | null>;

  constructor(private lastActionService: LastActionService) {
    this.lastAdd$ = this.lastActionService.lastAdd$;
    this.lastRemove$ = this.lastActionService.lastRemove$;
  }
}