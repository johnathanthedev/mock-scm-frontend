<<<<<<< Updated upstream
=======
import Loading from '@/components/shared/Loading/Loading';
import { useAlert } from '@/global-state/alert/alert.context';
>>>>>>> Stashed changes
import { generateCurvedPath } from '@/lib/google-maps/curvature';
import { aubergineTheme, markerIcon } from '@/lib/google-maps/theme';
import { Loader } from '@googlemaps/js-api-loader';
import { useEffect, useRef } from 'react';
import styles from "./index.module.css";

<<<<<<< Updated upstream
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
=======
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

>>>>>>> Stashed changes

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

        console.log(routes)
        if (routes) {
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
      }
    };

    initializeMap();
  }, [loading, routes]);

  return <div className={`${styles.container} w-full`}>
    {loading ? <div className={styles.loadingWrapper}>
      <Loading color={'var(--brand-color)'} />
    </div> : <div ref={mapRef} className={`h-full w-full`} />}
  </div>;
}
