import { Component, inject } from '@angular/core';
import { ProfileStateService } from './profile-state.service';

@Component({
  selector: 'bs-profile-name',
  imports: [],
  template: `
    <span>
     {{ profile.name() }}
    </span>
  `,
  styles: ``
})
export class SharedLibComponent {

  profile = inject(ProfileStateService);

}
