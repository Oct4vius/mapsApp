import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  ViewChild,
} from '@angular/core';
import { enviroments } from '../../../../environments/environments';
import { Map } from 'mapbox-gl';

@Component({
  selector: 'maps-mini-map',
  templateUrl: './mini-map.component.html',
  styleUrl: './mini-map.component.scss',
})
export class MiniMapComponent implements AfterViewInit {
  @Input()
  public lngLat?: [number, number];

  @ViewChild('map')
  public divMap?: ElementRef;

  public map?: Map;

  ngAfterViewInit(): void {
    if (!this.divMap?.nativeElement) throw new Error('Map div not found');
    if (!this.lngLat) throw new Error('lngLat is required');

    this.map = new Map({
      accessToken: enviroments.mapbox_key,
      container: this.divMap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.lngLat, // starting position [lng, lat]
      zoom: 10, // starting zoom
      interactive: false,
    });

  }
}
