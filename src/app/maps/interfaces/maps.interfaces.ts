import { Marker } from "mapbox-gl"

export interface MenuItem {
  name: string
  router: string
}

export interface MarkerAndColor{
  color: string
  marker: Marker
}

export interface PlainMarker {
  color: string
  lngLat: number[]
}
