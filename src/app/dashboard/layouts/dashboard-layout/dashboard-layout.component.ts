import { Component, computed, inject } from '@angular/core';
import { AuthServiceService } from 'src/app/auth/services/auth-service.service';

@Component({
  templateUrl: './dashboard-layout.component.html',
  styleUrls: ['./dashboard-layout.component.css']
})
export class DashboardLayoutComponent {

  private authService = inject( AuthServiceService );
  public user = computed( () => this.authService.currentUser() );


}
