import React from 'react';
import { 
    MapContainer, TileLayer, Marker, Popup, LayersControl, 
    Circle, CircleMarker, Polyline, Polygon, Rectangle, 
    LayerGroup, ZoomControl 
} from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

// FIX ICON MARKER
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

export default function MapFrontpageStatic() {
    const centerBali = [-8.4095, 115.1889];
    
    const kabupatenBali = [
        { name: "Buleleng", pos: [-8.2091, 114.9458] },
        { name: "Karangasem", pos: [-8.3912, 115.5414] },
        { name: "Jembrana", pos: [-8.2933, 114.6542] },
        { name: "Tabanan", pos: [-8.4312, 115.0805] },
        { name: "Bangli", pos: [-8.3182, 115.3524] },
        { name: "Gianyar", pos: [-8.4735, 115.3138] },
        { name: "Klungkung", pos: [-8.5434, 115.4243] },
        { name: "Badung", pos: [-8.5582, 115.1764] },
        { name: "Denpasar", pos: [-8.6705, 115.2126] },
    ];

    // DATA KECAMATAN (Contoh beberapa perwakilan kecamatan)
    // DATA LENGKAP 57 KECAMATAN DI BALI
    const kecamatanBali = [
        // BULELENG (9)
        { name: "Kec. Gerokgak", kab: "Buleleng", pos: [-8.1963, 114.7913] },
        { name: "Kec. Seririt", kab: "Buleleng", pos: [-8.1923, 114.9312] },
        { name: "Kec. Busungbiu", kab: "Buleleng", pos: [-8.2581, 114.9754] },
        { name: "Kec. Banjar", kab: "Buleleng", pos: [-8.1887, 115.0044] },
        { name: "Kec. Buleleng", kab: "Buleleng", pos: [-8.1171, 115.0924] },
        { name: "Kec. Sukasada", kab: "Buleleng", pos: [-8.1834, 115.1054] },
        { name: "Kec. Sawan", kab: "Buleleng", pos: [-8.1182, 115.1524] },
        { name: "Kec. Kubutambahan", kab: "Buleleng", pos: [-8.1052, 115.2054] },
        { name: "Kec. Tejakula", kab: "Buleleng", pos: [-8.1382, 115.3524] },

        // JEMBRANA (5)
        { name: "Kec. Melaya", kab: "Jembrana", pos: [-8.2382, 114.4924] },
        { name: "Kec. Negara", kab: "Jembrana", pos: [-8.3582, 114.6224] },
        { name: "Kec. Jembrana", kab: "Jembrana", pos: [-8.3682, 114.6524] },
        { name: "Kec. Mendoyo", kab: "Jembrana", pos: [-8.3524, 114.7612] },
        { name: "Kec. Pekutatan", kab: "Jembrana", pos: [-8.3982, 114.8924] },

        // TABANAN (10)
        { name: "Kec. Selemadeg Barat", kab: "Tabanan", pos: [-8.4582, 114.9524] },
        { name: "Kec. Selemadeg", kab: "Tabanan", pos: [-8.4882, 115.0224] },
        { name: "Kec. Selemadeg Timur", kab: "Tabanan", pos: [-8.5282, 115.0524] },
        { name: "Kec. Kerambitan", kab: "Tabanan", pos: [-8.5482, 115.0824] },
        { name: "Kec. Tabanan", kab: "Tabanan", pos: [-8.5382, 115.1224] },
        { name: "Kec. Kediri", kab: "Tabanan", pos: [-8.5782, 115.1424] },
        { name: "Kec. Marga", kab: "Tabanan", pos: [-8.5082, 115.1624] },
        { name: "Kec. Baturiti", kab: "Tabanan", pos: [-8.3382, 115.1724] },
        { name: "Kec. Penebel", kab: "Tabanan", pos: [-8.4382, 115.1224] },
        { name: "Kec. Pupuan", kab: "Tabanan", pos: [-8.3182, 115.0124] },

        // BADUNG (6)
        { name: "Kec. Kuta Selatan", kab: "Badung", pos: [-8.8082, 115.1524] },
        { name: "Kec. Kuta", kab: "Badung", pos: [-8.7233, 115.1723] },
        { name: "Kec. Kuta Utara", kab: "Badung", pos: [-8.6482, 115.1524] },
        { name: "Kec. Mengwi", kab: "Badung", pos: [-8.5372, 115.1725] },
        { name: "Kec. Abiansemal", kab: "Badung", pos: [-8.4882, 115.2224] },
        { name: "Kec. Petang", kab: "Badung", pos: [-8.3282, 115.2224] },

        // DENPASAR (4)
        { name: "Denpasar Selatan", kab: "Denpasar", pos: [-8.7071, 115.2274] },
        { name: "Denpasar Timur", kab: "Denpasar", pos: [-8.6525, 115.2467] },
        { name: "Denpasar Barat", kab: "Denpasar", pos: [-8.6625, 115.1967] },
        { name: "Denpasar Utara", kab: "Denpasar", pos: [-8.6325, 115.2167] },

        // GIANYAR (7)
        { name: "Kec. Sukawati", kab: "Gianyar", pos: [-8.5956, 115.2831] },
        { name: "Kec. Blahbatuh", kab: "Gianyar", pos: [-8.5782, 115.3024] },
        { name: "Kec. Gianyar", kab: "Gianyar", pos: [-8.5482, 115.3324] },
        { name: "Kec. Tampaksiring", kab: "Gianyar", pos: [-8.4382, 115.3024] },
        { name: "Kec. Ubud", kab: "Gianyar", pos: [-8.5069, 115.2625] },
        { name: "Kec. Tegallalang", kab: "Gianyar", pos: [-8.4382, 115.2824] },
        { name: "Kec. Payangan", kab: "Gianyar", pos: [-8.3582, 115.2524] },

        // BANGLI (4)
        { name: "Kec. Susut", kab: "Bangli", pos: [-8.4482, 115.3424] },
        { name: "Kec. Bangli", kab: "Bangli", pos: [-8.4582, 115.3524] },
        { name: "Kec. Tembuku", kab: "Bangli", pos: [-8.4282, 115.3924] },
        { name: "Kec. Kintamani", kab: "Bangli", pos: [-8.2482, 115.3424] },

        // KLUNGKUNG (4)
        { name: "Kec. Banjarangkan", kab: "Klungkung", pos: [-8.5382, 115.3824] },
        { name: "Kec. Klungkung", kab: "Klungkung", pos: [-8.5434, 115.4243] },
        { name: "Kec. Dawan", kab: "Klungkung", pos: [-8.5382, 115.4524] },
        { name: "Kec. Nusa Penida", kab: "Klungkung", pos: [-8.7382, 115.5424] },

        // KARANGASEM (8)
        { name: "Kec. Rendang", kab: "Karangasem", pos: [-8.3562, 115.4385] },
        { name: "Kec. Sidemen", kab: "Karangasem", pos: [-8.4782, 115.4424] },
        { name: "Kec. Manggis", kab: "Karangasem", pos: [-8.5082, 115.5124] },
        { name: "Kec. Karangasem", kab: "Karangasem", pos: [-8.4485, 115.6078] },
        { name: "Kec. Abang", kab: "Karangasem", pos: [-8.3751, 115.5843] },
        { name: "Kec. Bebandem", kab: "Karangasem", pos: [-8.4382, 115.5424] },
        { name: "Kec. Selat", kab: "Karangasem", pos: [-8.4182, 115.4724] },
        { name: "Kec. Kubu", kab: "Karangasem", pos: [-8.2582, 115.5624] },
    ];

    return (
        /* Tinggi diatur 100% agar mengikuti section di halaman induk */
        <div className="w-full h-full min-h-[500px]">
            <MapContainer 
                center={centerBali} 
                zoom={9} 
                scrollWheelZoom={true} 
                style={{ height: '100%', width: '100%' }}
                zoomControl={false}
            >
                <ZoomControl position="bottomright" />

                <LayersControl position="topright" collapsed={false}>
                    {/* BASE LAYERS */}
                    <LayersControl.BaseLayer checked name="OpenStreetMap">
                        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Google Street">
                        <TileLayer url="https://mt1.google.com/vt/lyrs=m&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Satellite">
                        <TileLayer url="https://mt1.google.com/vt/lyrs=s&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Hybrid">
                        <TileLayer url="https://mt1.google.com/vt/lyrs=y&x={x}&y={y}&z={z}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Topo">
                        <TileLayer url="https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="ESRI Satellite">
                        <TileLayer url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Light">
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png" />
                    </LayersControl.BaseLayer>
                    <LayersControl.BaseLayer name="Carto Dark">
                        <TileLayer url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png" />
                    </LayersControl.BaseLayer>

                    {/* OVERLAYS */}
                    <LayersControl.Overlay name="Marker Kabupaten">
                        <LayerGroup>
                            {kabupatenBali.map((kab, index) => (
                                <Marker key={index} position={kab.pos}>
                                    <Popup><strong>Kabupaten {kab.name}</strong></Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    {/* INI TAMBAHAN MARKER KECAMATAN */}
                    <LayersControl.Overlay name="Marker Kecamatan">
                        <LayerGroup>
                            {kecamatanBali.map((kec, index) => (
                                <Marker key={index} position={kec.pos}>
                                    <Popup>
                                        <strong>{kec.name}</strong><br/>
                                        Kabupaten: {kec.kab}
                                    </Popup>
                                </Marker>
                            ))}
                        </LayerGroup>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="CircleMarker">
                        <CircleMarker center={centerBali} radius={20} color="red">
                            <Popup>Pusat Bali</Popup>
                        </CircleMarker>
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="Polygon Wilayah">
                        <Polygon positions={[[-8.3, 115.3], [-8.4, 115.4], [-8.4, 115.2]]} color="green" />
                    </LayersControl.Overlay>

                    <LayersControl.Overlay name="GeoJSON"><LayerGroup /></LayersControl.Overlay>
                    <LayersControl.Overlay name="MarkerCluster"><LayerGroup /></LayersControl.Overlay>
                    <LayersControl.Overlay name="Heatmap"><LayerGroup /></LayersControl.Overlay>
                </LayersControl>
            </MapContainer>
        </div>
    );
}