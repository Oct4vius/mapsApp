import { AfterViewInit, Component, ElementRef, OnDestroy, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';

@Component({
  templateUrl: './zoom-range-page.component.html',
  styleUrls: ['./zoom-range-page.component.scss'],
})
export class ZoomRangePageComponent implements AfterViewInit, OnDestroy {
  @ViewChild('map')
  public divmap?: ElementRef;
  public map?: Map;
  public zoom: number = 10;
  public currentCenter: LngLat = new LngLat(-69.96630374385252, 18.50872051210477 );

  public increaseZoom = () => {
    this.map?.zoomIn();
  };

  public decreaseZoom = () => {
    this.map?.zoomOut();
  };

  public zoomChanged = (value: string) => {
    this.zoom = +value;
    this.map?.zoomTo(this.zoom);
  }

  public mapListener() {
    if (!this.map) throw 'Mapa no inicializado';

    this.map.on('zoom', (e) => {
      this.zoom = this.map!.getZoom();
    });

    this.map.on('zoomend', (e) => {
      if (this.map!.getZoom() < 18) return;
      this.map!.zoomTo(18);
    });

    this.map.on('move', (e) => {
      this.currentCenter = this.map!.getCenter();
    })
  }

  ngAfterViewInit(): void {
    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken:
        'pk.eyJ1IjoiYXJtYW5kbzIzMyIsImEiOiJjbHZmYnIxZG4wMDNlMm1rNDhtenc3dW1rIn0.eb0O8zQGKgHbvDLLxd1Oiw',
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 9, // starting zoom
    });

    this.mapListener();
  }

  ngOnDestroy(): void {
    this.map?.remove();
  }

}
