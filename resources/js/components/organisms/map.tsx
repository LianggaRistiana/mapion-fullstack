// import { useEffect, useRef } from 'react';
// import L from 'leaflet';
// import 'leaflet/dist/leaflet.css';

// export default function Map() {
//     const mapRef = useRef<HTMLDivElement | null>(null);

//     useEffect(() => {
//         if (!mapRef.current) return;

//         const map = L.map(mapRef.current).setView([51.505, -0.09], 13);

//         L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
//             attribution:
//                 '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
//         }).addTo(map);

//         L.marker([51.505, -0.09]).addTo(map)
//             .bindPopup('Hello from Leaflet!')
//             .openPopup();

//         return () => {
//             map.remove();
//         };
//     }, []);

//     return <div ref={mapRef} style={{ height: '500px', width: '100%' }} />;
// }


import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

interface Location {
    id: number;
    title: string;
    desc: string;
    lat: number;
    lng: number;
}

interface MapProps {
    addMode?: boolean;
    locations?: Location[];
    center?: [number, number];
    onSelectedLocation?: (location?: [number, number]) => void;
}

export default function Map({ addMode, locations, center = [51.505, -0.09], onSelectedLocation }: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);
    const icon = new L.Icon({
        iconUrl: '/marker.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    useEffect(() => {
        if (!mapRef.current) return;

        // Initialize the map
        const map = L.map(mapRef.current).setView(center, 13);

        // TileLayer
        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution:
                '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Render markers based on `locations` prop
        locations?.forEach((location) => {
            L.marker([location.lat, location.lng], { icon })
                .addTo(map)
                .bindPopup(`
          <div class="text-center">
            <h3 class="font-bold text-lg">${location.title}</h3>
            <p class="text-sm">${location.desc}</p>
          </div>
        `);
        });

        // Add marker on map click if `addMode` is true
        let tempMarker: L.Marker | null = null;
        if (addMode) {
            map.on('click', (e) => {
                const { lat, lng } = e.latlng;

                if (tempMarker) {
                    tempMarker.remove();
                }

                tempMarker = L.marker([lat, lng], { icon }).addTo(map);
                tempMarker.bindPopup(`Koordinat: ${lat.toFixed(6)}, ${lng.toFixed(6)}`).openPopup();

                setClickedPosition([lat, lng]);
                onSelectedLocation?.([lat, lng]);
            });
        }

        // Cleanup when component unmounts
        return () => {
            map.remove();
        };
    }, [center, locations, addMode, onSelectedLocation]);

    return (
        <div>
            <div
                ref={mapRef}
                style={{ height: '500px', width: '100%' }}
            />
            {/* Show clicked position marker */}
            {clickedPosition && (
                <div className="clicked-position">
                    Koordinat: {clickedPosition[0].toFixed(6)}, {clickedPosition[1].toFixed(6)}
                </div>
            )}
        </div>
    );
}
