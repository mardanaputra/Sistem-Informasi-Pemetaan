import React from 'react';
import { Link } from '@inertiajs/react';
import { appName } from "@/Constants/app";
import FrontpageLayout from "../../Layouts/FrontpageLayout";
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// Fix Icon Marker
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HomePage() {
    const center = [-8.4095, 115.1889]; // Pusat Bali

    return (
        <FrontpageLayout>
            {/* HERO SECTION */}
            <section className="bg-white pt-24 pb-12">
                <div className="max-w-screen-xl px-4 mx-auto text-center">
                    <h1 className="mb-4 text-4xl font-extrabold text-gray-900 md:text-5xl lg:text-6xl tracking-tight">
                        {appName}
                    </h1>
                    <p className="mb-8 text-lg font-light text-gray-500 lg:text-xl">
                        Sistem Informasi Geografis untuk pemetaan wilayah dan analisis spasial di Provinsi Bali.
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link 
                            href="/maps-static" 
                            className="text-white bg-blue-700 hover:bg-blue-800 font-medium rounded-lg text-sm px-5 py-2.5 shadow-lg transition"
                        >
                            Buka Peta Lengkap
                        </Link>
                    </div>
                </div>
            </section>

            {/* PREVIEW MAP SECTION */}
            <section className="pb-20 px-4">
                <div className="max-w-screen-xl mx-auto border-8 border-gray-50 shadow-2xl rounded-3xl overflow-hidden" style={{ height: '450px' }}>
                    <MapContainer 
                        center={center} 
                        zoom={9} 
                        scrollWheelZoom={false} // Dimatikan agar scroll halaman tidak terganggu
                        style={{ height: '100%', width: '100%' }}
                    >
                        <TileLayer
                            attribution='&copy; OpenStreetMap'
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                        <Marker position={center}>
                            <Popup>
                                <strong>Pusat Bali</strong> <br />
                                Akses fitur lengkap di halaman Maps Static.
                            </Popup>
                        </Marker>
                    </MapContainer>
                </div>
                <p className="mt-4 text-center text-sm text-gray-400 italic">
                    *Gunakan tombol di atas untuk mengakses kontrol layer dan data kecamatan.
                </p>
            </section>
        </FrontpageLayout>
    );
}