import { WS_URL } from '@/config/constants';
import { useAlert } from '@/global-state/alert/alert.context';
import { generateCurvedPath } from '@/lib/google-maps/curvature';
import { aubergineTheme, markerIcon } from '@/lib/google-maps/theme';
import { listRoutes } from '@/services/routes-service';
import { Props } from '@/types/components/google-maps/index.types';
import { RouteDto } from '@/types/services/routes-service.types';
import { Loader } from '@googlemaps/js-api-loader';
import { useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';
import Loading from '../Loading/Loading';
import styles from "./index.module.css";

export default function GoogleMaps({ }: Props) {
  const searchParams = useSearchParams()
  const operationID = searchParams.get('operation-id')

  const { triggerAlert } = useAlert();
  const [routes, setRoutes] = useState<Array<RouteDto> | null>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef<HTMLDivElement>(null);
  const latestMarkerRef = useRef<google.maps.Marker | null>(null);
  const mapInstanceRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (operationID) {
          const { status, data } = await listRoutes(operationID);
          if (status !== 200) {
            triggerAlert("Failed to fetch routes", "Danger");
            setLoading(false);
            return;
          }

          setRoutes(data);
          setLoading(false);
        }
      } catch (error) {
        console.error(error);
        triggerAlert("Sorry something went wrong", "Danger");
        setLoading(false);
      }
    };

    getData();
  }, [operationID, triggerAlert]);

  useEffect(() => {
    const initializeMap = async () => {
      if (!loading) {
        if (!mapRef.current) return;

        const loader = new Loader({
          apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY as string,
          version: 'weekly',
        });

        await loader.load();
        const google = window.google;

        const map = new google.maps.Map(mapRef.current, {
          center: { lat: 37.772, lng: -122.214 },
          zoom: 3,
          mapTypeId: 'terrain',
          styles: aubergineTheme,
        });

        mapInstanceRef.current = map;

        routes && routes.forEach(route => {
          const startCoords = {
            lat: route.facility_coordinates.Lat,
            lng: route.facility_coordinates.Lng,
          };

          const endRouteStop = route.route_stops.reduce((prev, current) => {
            return (prev.sequence > current.sequence) ? prev : current;
          });

          const endCoords = {
            lat: endRouteStop.facility_coordinates.Lat,
            lng: endRouteStop.facility_coordinates.Lng,
          };

          const curvedPath = generateCurvedPath(startCoords, endCoords, 6, 100);
          new google.maps.Polyline({
            path: curvedPath,
            geodesic: false,
            strokeColor: '#2199E8',
            strokeOpacity: 1.0,
            strokeWeight: 2,
          }).setMap(map);

          new google.maps.Marker({
            position: startCoords,
            map: map,
            icon: markerIcon(google),
            title: "Start Point",
          });

          new google.maps.Marker({
            position: endCoords,
            map: map,
            icon: markerIcon(google),
            title: "End Point",
          });
        });
      }
    };

    initializeMap();
  }, [loading, routes]);

  useEffect(() => {
    const ws = new WebSocket(`${WS_URL}/ws?operation-id=${operationID}`);
    ws.onopen = () => console.log('Connected to WS');
    ws.onmessage = (event) => {
      const messageData = JSON.parse(event.data);
      const newPosition = { lat: messageData.Location.Lat, lng: messageData.Location.Lng };

      if (latestMarkerRef.current) {
        // Update the marker's position if it already exists
        latestMarkerRef.current.setPosition(newPosition);
      } else {
        // Create a new marker and store its reference if it doesn't exist
        const google = window.google;

        latestMarkerRef.current = new google.maps.Marker({
          position: newPosition,
          map: mapInstanceRef.current,
          icon: {
            path: google.maps.SymbolPath.CIRCLE,
            scale: 8,
            fillColor: '#FF0000',
            fillOpacity: 0.8,
            strokeWeight: 2,
            strokeColor: 'white',
          },
          title: "Latest Position",
        });
      }
    };

    ws.onclose = () => console.log('Disconnected from WS');
    ws.onerror = (error) => console.error('WebSocket error: ', error);

    // Cleanup WebSocket connection on unmount
    return () => {
      // TODO: Close connection and re-open for each operation
      ws.close();
    };
  }, [operationID]);

  const renderContent = () => {
    if (!operationID) return <div className={styles.selectionRequiredContainer}>
      <span>Select or Join an operation to view map</span>
    </div>

    if (loading) return <div className={styles.loadingWrapper}>
      <Loading color={'var(--brand-color)'} />
    </div>

    return <div ref={mapRef} className={`h-full w-full`} />
  }

  return <div className={`${styles.container} w-full`}>
    {renderContent()}
  </div>;
}
