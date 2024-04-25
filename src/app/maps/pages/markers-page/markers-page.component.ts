import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { LngLat, Map, Marker } from 'mapbox-gl';
import { MarkerAndColor, PlainMarker } from '../../interfaces/maps.interfaces';

@Component({
  templateUrl: './markers-page.component.html',
  styleUrls: ['./markers-page.component.scss'],
})
export class MarkersPageComponent implements AfterViewInit {
  @ViewChild('map')
  public divmap?: ElementRef;

  public markers: MarkerAndColor[] = [];

  public map?: Map;
  public zoom: number = 10;
  public currentCenter: LngLat = new LngLat(
    -69.96630374385252,
    18.50872051210477
  );

  ngAfterViewInit(): void {
    if (!this.divmap) throw 'El elemento HTML no fue encontrado';

    this.map = new Map({
      accessToken:
        'pk.eyJ1IjoiYXJtYW5kbzIzMyIsImEiOiJjbHZmYnIxZG4wMDNlMm1rNDhtenc3dW1rIn0.eb0O8zQGKgHbvDLLxd1Oiw',
      container: this.divmap.nativeElement, // container ID
      style: 'mapbox://styles/mapbox/streets-v12', // style URL
      center: this.currentCenter, // starting position [lng, lat]
      zoom: 10, // starting zoom
    });

    this.readFromLocalStorage();

    // const marker = new Marker({
    //   color: color
    // })
    //   .setLngLat(this.currentCenter)
    //   .addTo(this.map);
  }

  createMarker() {
    if (!this.map) return;

    const color = '#xxxxxx'.replace(/x/g, (y) =>
      ((Math.random() * 16) | 0).toString(16)
    );
    const lgnLat = this.map.getCenter();

    this.addMarker(lgnLat, color);
  }

  addMarker(lngLat: LngLat, color: string) {
    if (!this.map) return;

    const marker = new Marker({
      color,
      draggable: true,
    })
      .setLngLat(lngLat)
      .addTo(this.map);

    this.markers.push({ color, marker });
    this.saveToLocalStorage()

    marker.on('dragend', () => this.saveToLocalStorage() );
  }

  deleteMarker(index: number) {
    this.markers[index].marker.remove();
    this.markers.splice(index, 1);
  }

  flyTo(marker: Marker) {
    this.map?.flyTo({
      zoom: 14,
      center: marker.getLngLat(),
    });
  }

  saveToLocalStorage() {
    const plainMarkers: PlainMarker[] = this.markers.map(({ color, marker }) => {
      return {
        color,
        lngLat: marker.getLngLat().toArray(),
      }
    });

    localStorage.setItem('plainMarkers', JSON.stringify(plainMarkers));
  }

  readFromLocalStorage() {
    const plainMarkersString = localStorage.getItem('plainMarkers') ?? '[]';
    const plainMarkers: PlainMarker[] = JSON.parse(plainMarkersString);

    plainMarkers.forEach(({ color, lngLat }) => {
      const [lng, lat] = lngLat;

      this.addMarker(new LngLat(lng, lat), color);
    });
  }

}
