import { generateCurvedPath } from '@/lib/google-maps/curvature';
import { aubergineTheme, markerIcon } from '@/lib/google-maps/theme';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import styles from "./index.module.css";

export default function GoogleMaps() {
  const mapRef = useRef(null);

  useEffect(() => {
    const initializeMap = async () => {
      if (!mapRef.current) return;

      const loader = new Loader({
        apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
        version: 'weekly',
      });

      // TODO: Fix this deprecated issue
      await loader.load();
      const google = window.google;

      const map = new google.maps.Map(mapRef.current, {
        center: { lat: 37.772, lng: -122.214 },
        zoom: 3,
        mapTypeId: 'terrain',
        styles: aubergineTheme,
      });

      const startPoint = { lat: 37.772, lng: -122.214 };
      const endPoint = { lat: 21.291, lng: -157.821 };

      const curvedPath = generateCurvedPath(startPoint, endPoint, 10, 100);
      const flightPath = new google.maps.Polyline({
        path: curvedPath,
        geodesic: false,
        strokeColor: '#2199E8',
        strokeOpacity: 1.0,
        strokeWeight: 2,
      });
      flightPath.setMap(map);


      const startMarkerPosition = curvedPath[0];
      const endMarkerPosition = curvedPath[curvedPath.length - 1];

      // TODO: Fix this deprecated issue
      new google.maps.Marker({
        position: startMarkerPosition,
        map: map,
        icon: markerIcon(google),
        title: "Start Point",
      });

      new google.maps.Marker({
        position: endMarkerPosition,
        map: map,
        icon: markerIcon(google),
        title: "End Point",
      });
    };

    initializeMap();
  }, []);

  return <div className={`${styles.container} w-full`} ref={mapRef} />;
}
