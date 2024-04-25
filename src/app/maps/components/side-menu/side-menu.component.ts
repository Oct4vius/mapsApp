import { Component } from '@angular/core';
import { MenuItem } from '../../interfaces/maps.interfaces';

@Component({
  selector: 'maps-side-menu',
  templateUrl: './side-menu.component.html',
  styleUrl: './side-menu.component.scss'
})
export class SideMenuComponent {
  public menuItems: MenuItem[] = [
    { router: '/maps/fullscreen', name: 'FullScreen' },
    { router: '/maps/zoom-range', name: 'Zoom Range' },
    { router: '/maps/markers', name: 'Markers' },
    { router: '/maps/properties', name: 'Houses' },
  ]
}
