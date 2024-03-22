import { useAlert } from '@/global-state/alert/alert.context';
import { generateCurvedPath } from '@/lib/google-maps/curvature';
import { aubergineTheme, markerIcon } from '@/lib/google-maps/theme';
import { listRoutes } from '@/services/routes-service';
import { Props } from '@/types/components/google-maps/index.types';
import { RouteDto } from '@/types/services/routes-service.types';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef, useState } from 'react';
import Loading from '../Loading/Loading';
import styles from "./index.module.css";

export default function GoogleMaps({ operationID }: Props) {
  const { triggerAlert } = useAlert();

  const [routes, setRoutes] = useState<null | Array<RouteDto>>(null);
  const [loading, setLoading] = useState(true);
  const mapRef = useRef(null);

  useEffect(() => {
    const getData = async () => {
      try {
        if (operationID) {
          const { status, data } = await listRoutes(operationID);

          if (status !== 200) {
            return
          }

          setLoading(false);
          setRoutes(data);
        }
      } catch (error) {
        if (error) {
          triggerAlert("Sorry something went wrong", "Danger")
        }
      }
    }

    getData();;
  }, [operationID, triggerAlert])

  useEffect(() => {
    const initializeMap = async () => {
      if (!loading) {
        if (!mapRef.current || !routes) return;

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

        routes.forEach(route => {
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

  return <div className={`${styles.container} w-full`}>
    {loading ? <div className={styles.loadingWrapper}>
      <Loading color={'var(--brand-color)'} />
    </div> : <div ref={mapRef} className={`h-full w-full`} />}  </div>;
}
