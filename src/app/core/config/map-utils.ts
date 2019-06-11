import * as mapboxgl from 'mapbox-gl';

export class MapUtils {
  static addMarker(coordinates: any, map: any): void {
    this.removeElementsByClass('marker');
    const el = document.createElement('div');
    el.className = 'marker';

    new mapboxgl.Marker(el)
      .setLngLat(coordinates)
      .addTo(map);
  }

  static removeElementsByClass(className): void {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
  }
}
