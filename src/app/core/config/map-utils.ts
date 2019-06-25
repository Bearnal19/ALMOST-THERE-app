import * as mapboxgl from 'mapbox-gl';

export class MapUtils {
  // Agrega un marcador en el mapa
  // Params; cordenadas [lng, lat] y la instancia del mapa
  static addMarker(coordinates: any, map: any): any {
    return new Promise((resolve) => {
      this.removeElementsByClass('marker');
      const el = document.createElement('div');
      el.className = 'marker';

      new mapboxgl.Marker(el)
        .setLngLat(coordinates)
        .addTo(map);
      resolve();
    });
  }

  static removeElementsByClass(className): void {
    const elements = document.getElementsByClassName(className);
    while (elements.length > 0) {
        elements[0].parentNode.removeChild(elements[0]);
    }
  }

  // "Vuela" o se transporta a una cordenada en especifico en el mapa
  // Params; cordenadas [lng, lat] y la instancia del mapa
  static flyTo(coordinates: any, map: any, speed?: number, zoom?: number): void {
    speed = speed || .8;
    zoom = zoom || 15;
    map.flyTo({
      center: coordinates,
      speed: .8,
      zoom: 15
    });
  }

  // Obtiene el json para poder dibujar un circle polygon
  // Params; cordenadas punto centro [lng, lat], radio en kilometros, puntos a dibujar
  static createGeoJSONCircle(center: any, radiusInKm: number, points?: number): any {
    if (!points) { points = 64; }

    const coords = {
        latitude: center[1],
        longitude: center[0]
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return {
      type: 'geojson',
      data: {
          type: 'FeatureCollection',
          features: [{
              type: 'Feature',
              geometry: {
                  type: 'Polygon',
                  coordinates: [ret]
              }
          }]
      }
  };
  }

  // Obtiene los puntos para poder dibujar un circulo
  // Params; cordenadas punto centro [lng, lat], radio en kilometros, puntos a dibujar
  static createGeoJSONDots(center: any, radiusInKm?: number, points?: number): any {
    radiusInKm = radiusInKm || 10;
    if (!points) { points = 64; }

    const coords = {
        latitude: center[1],
        longitude: center[0]
    };

    const km = radiusInKm;

    const ret = [];
    const distanceX = km / (111.320 * Math.cos(coords.latitude * Math.PI / 180));
    const distanceY = km / 110.574;

    let theta, x, y;
    for (let i = 0; i < points; i++) {
        theta = (i / points) * (2 * Math.PI);
        x = distanceX * Math.cos(theta);
        y = distanceY * Math.sin(theta);

        ret.push([coords.longitude + x, coords.latitude + y]);
    }
    ret.push(ret[0]);

    return ret;
  }

  // Dibuja un circulo en una posicion y radio
  // params: Punto central [lng, lat], instancia de mapa, diametro
  static makeCircle(coordinates: any, map: any, diametro?: number, color?: string): void {
    diametro = diametro || 10;
    color = color || 'blue';

    const c = MapUtils.createGeoJSONCircle(coordinates, diametro, 63);

    if (map.getLayer('polygon')) {
      map.removeLayer('polygon');
      map.removeSource('polygon');
    }

    map.addSource('polygon', c);
    map.addLayer({
      id: 'polygon',
      type: 'fill',
      source: 'polygon',
      layout: {},
      paint: {
          'fill-color': color,
          'fill-opacity': 0.45
      }
    });
  }
}
