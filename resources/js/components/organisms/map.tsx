import { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { useForm } from '@inertiajs/react';
import ReactDOM from 'react-dom';
import AddLocationForm from '../molecules/add-location-form';

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

export default function Map({ addMode, locations, center = [-8.4095, 115.1889], onSelectedLocation }: MapProps) {
    const mapRef = useRef<HTMLDivElement | null>(null);
    const [clickedPosition, setClickedPosition] = useState<[number, number] | null>(null);
    const [clickedLatLng, setClickedLatLng] = useState<[number, number] | null>(null);
    const [tempMarker, setTempMarker] = useState<L.Marker | null>(null);
    const [popupElement, setPopupElement] = useState<HTMLDivElement | null>(null);

    const icon = new L.Icon({
        iconUrl: '/marker.svg',
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

    useEffect(() => {
        if (!mapRef.current) return;

        const map = L.map(mapRef.current).setView(center, 13);

        L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
            attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        }).addTo(map);

        // Render existing markers
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

        const handleClick = (e: L.LeafletMouseEvent) => {
            const { lat, lng } = e.latlng;

            // Buat div untuk popup
            const popupDiv = document.createElement('div');
            setPopupElement(popupDiv); // Simpan referensi popup div

            setClickedPosition([lat, lng]);
            setClickedLatLng([lat, lng]);

            // Buat popup dan tampilkan di lokasi yang diklik
            const popup = L.popup()
                .setLatLng([lat, lng]) // Tentukan posisi popup
                .setContent(popupDiv)  // Tentukan konten popup
                .openOn(map);          // Tampilkan popup di peta

            // Menampilkan form di dalam popup
            setPopupElement(popupDiv); // Populasi form dalam popup

            onSelectedLocation?.([lat, lng]);
        };


        if (addMode) {
            map.on('click', handleClick);
        }

        return () => {
            map.off('click', handleClick); // cleanup listener
            map.remove(); // cleanup map
        };
    }, [center, locations, addMode, onSelectedLocation]);

    return (
        <div>
            <div ref={mapRef} style={{ height: '100vh', width: '100%' }} />


            {/* Render AddLocationForm di dalam popup jika popupElement tersedia */}
            {popupElement && clickedLatLng && ReactDOM.createPortal(
                <div className="popup-form-container">
                    <h3 className="text-center text-lg font-bold">Tambah Lokasi</h3>
                    <AddLocationForm
                        latlng={clickedLatLng}
                        onCancel={() => tempMarker?.closePopup()}
                        onSave={() => {
                            tempMarker?.closePopup();
                            // Tambahkan logika penyimpanan di sini
                        }}
                    />
                </div>,
                popupElement // Ini merender form ke dalam popup div yang telah dibuat
            )}
        </div>
    );
}
