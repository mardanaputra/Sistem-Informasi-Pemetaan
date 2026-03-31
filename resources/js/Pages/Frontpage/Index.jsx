import { appName } from "@/Constants/app";
import FrontpageLayout from "../../Layouts/FrontpageLayout";
// 1. Import komponen Leaflet
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css'; // WAJIB: Agar tampilan peta tidak berantakan

// 2. Perbaikan icon marker yang sering tidak muncul di React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function HomePage() {
    // Koordinat pusat (Contoh: Bali)
    const center = [-8.4095, 115.1889];

    return (
        <FrontpageLayout>
            <section className="bg-white pt-20">
                <div className="max-w-screen-xl px-4 py-8 mx-auto text-center lg:py-16 lg:px-12">
                    {/* ... (Konten Hero Kamu) ... */}
                    <h1 className="mb-4 text-4xl font-extrabold leading-none tracking-tight text-gray-900 md:text-5xl lg:text-6xl">
                        {appName}
                    </h1>
                    <p className="mb-8 text-lg font-normal text-gray-500 lg:text-xl sm:px-20">
                        Sistem Informasi Pemetaan dengan fitur Base Layer dan Marker.
                    </p>
                </div>
            </section>

            {/* SECTION PETA */}
            <section className="pb-20 px-4">
                <div className="max-w-screen-xl mx-auto border-4 border-white shadow-2xl rounded-xl overflow-hidden" style={{ height: '500px' }}>
                    <MapContainer center={center} zoom={10} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>

                        <LayersControl position="topright">
                            {/* Base Layer 1: OpenStreetMap */}
                            <LayersControl.BaseLayer checked name="OpenStreetMap">
                                <TileLayer
                                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                />
                            </LayersControl.BaseLayer>

                            {/* Base Layer 2: Google Satellite */}
                            <LayersControl.BaseLayer name="Satelit (Google)">
                                <TileLayer
                                    attribution='&copy; Google Maps'
                                    url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                                />
                            </LayersControl.BaseLayer>

                            {/* Base Layer 3: Terrain */}
                            <LayersControl.BaseLayer name="Medan (Terrain)">
                                <TileLayer
                                    attribution='&copy; Google Maps'
                                    url="https://mt1.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                                />
                            </LayersControl.BaseLayer>
                        </LayersControl>

                        {/* Menambahkan Marker */}
                        <Marker position={center}>
                            <Popup>
                                <strong>Titik Pusat Bali</strong> <br />
                                Kamu bisa mengubah teks ini sesuai kebutuhan.
                            </Popup>
                        </Marker>

                    </MapContainer>
                </div>
            </section>
        </FrontpageLayout>
    );
}