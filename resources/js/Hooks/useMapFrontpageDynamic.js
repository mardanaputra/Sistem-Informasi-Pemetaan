import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

import {
    GOOGLE_HYBRID_MAP,
    GOOGLE_STREET_MAP,
    OPEN_STREET_MAP,
    SATELLITE_MAP
} from "@/Constants/basemap";

const useMapFrontpageDynamic = ({ subaks, rivers, landAgricultures }) => {
    useEffect(() => {

        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map("maps", {
            center: coorBali,
            zoom: 10,
            layers: [GOOGLE_HYBRID_MAP]
        });

        /*
        =========================
        BASEMAP
        =========================
        */
        const baseMaps = {
            OpenStreetMap: OPEN_STREET_MAP,
            "Google Street": GOOGLE_STREET_MAP,
            Satellite: SATELLITE_MAP,
            Hybrid: GOOGLE_HYBRID_MAP
        };

        /*
        =========================
        SUBAKS (POINT)
        =========================
        */
        const subakLayer = L.layerGroup();

        subaks?.forEach((item) => {

            let coord = item.location;

            if (typeof coord === "string") {
                coord = JSON.parse(coord);
            }

            const latlng = [coord[1], coord[0]];

            L.marker(latlng)
                .bindPopup(`
          <b>${item.subak_name}</b><br/>
          ${item.address}
        `)
                .addTo(subakLayer);

        });

        /*
        =========================
        RIVERS (POLYLINE)
        =========================
        */
        const riverLayer = L.layerGroup();

        rivers?.forEach((river) => {
            L.geoJSON(river.geom)
                .bindPopup(`
          <b>${river.river_name}</b><br/>
          Panjang: ${river.length_m} m
        `)
                .addTo(riverLayer);

        });

        /*
        =========================
        LAND AGRICULTURE (POLYGON)
        =========================
        */
        const landLayer = L.layerGroup();

        landAgricultures?.forEach((land) => {
            L.geoJSON(land.geom)
                .bindPopup(`
          <b>${land.owner_name}</b><br/>
          Luas: ${land.land_area} m2<br/>
          <img src="${land.image}" width="150"/>
        `)
                .addTo(landLayer);
        });

        /*
        =========================
        LAYER CONTROL
        =========================
        */
        const overlayMaps = {
            Subak: subakLayer,
            Sungai: riverLayer,
            "Lahan Pertanian": landLayer
        };

        L.control.layers(baseMaps, overlayMaps).addTo(map);

    }, [subaks, rivers, landAgricultures]);
};

export default useMapFrontpageDynamic;