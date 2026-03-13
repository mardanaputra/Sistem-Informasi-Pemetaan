import { useEffect } from "react";
import L from "leaflet";

import "leaflet/dist/leaflet.css";

import "leaflet.markercluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";

import "leaflet.heat";

import "leaflet-draw/dist/leaflet.draw";
import "leaflet-draw/dist/leaflet.draw.css";

import {
    GOOGLE_HYBRID_MAP,
    GOOGLE_STREET_MAP,
    OPEN_STREET_MAP,
    SATELLITE_MAP
} from "@/Constants/basemap";

const useMapFrontpageStatic = () => {
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
        VECTOR LAYER
        =========================
        */

        // Marker (Point)
        const markerLayer = L.layerGroup();

        L.marker([-8.65, 115.21])
            .bindPopup("Marker Location")
            .addTo(markerLayer);

        const markerLayerCustom = L.layerGroup();

        const customIcon = L.icon({
            iconUrl: '/assets/icons/markers/location-pin.png',
            iconSize: [40, 47], // ukuran ikon
            iconAnchor: [16, 32], // anchor point pada ikon
            popupAnchor: [3, -20]
        });

        L.marker([-8.62, 115.28])
            .setIcon(customIcon)
            .bindPopup("Marker Location Custom")
            .addTo(markerLayerCustom);

        // Circle
        const circleMarkerLayer = L.layerGroup();

        L.circleMarker([-8.6, 115.3], {
            radius: 8
        })
            .bindPopup("Circle Marker")
            .addTo(circleMarkerLayer);

        // Polyline
        const polylineLayer = L.layerGroup();

        L.polyline([
            [-8.55, 115.25],
            [-8.50, 115.30],
            [-8.45, 115.27]
        ])
            .bindPopup("Polyline Route")
            .addTo(polylineLayer);

        // Polygon
        const polygonLayer = L.layerGroup();

        L.polygon([
            [-8.45, 115.15],
            [-8.40, 115.20],
            [-8.42, 115.25]
        ])
            .bindPopup("Polygon Area")
            .addTo(polygonLayer);

        // Rectangle
        const rectangleLayer = L.layerGroup();

        L.rectangle([
            [-8.35, 115.10],
            [-8.30, 115.20]
        ])
            .bindPopup("Rectangle Area")
            .addTo(rectangleLayer);

        // Circle
        const circleLayer = L.layerGroup();

        L.circle([-8.25, 115.25], {
            radius: 5000
        })
            .bindPopup("Circle Radius")
            .addTo(circleLayer);

        /*
        =========================
        GEOJSON LAYER
        =========================
        */
        const geojsonData = {
            type: "FeatureCollection",
            features: [
                {
                    type: "Feature",
                    properties: { name: "GeoJSON Point" },
                    geometry: {
                        type: "Point",
                        coordinates: [115.3, -8.3]
                    }
                }
            ]
        };

        const geoJsonLayer = L.geoJSON(geojsonData, {
            onEachFeature: (feature, layer) => {
                layer.bindPopup(feature.properties.name);
            }
        });

        /*
        =========================
        GROUP LAYER
        =========================
        */
        // Layer Group
        const layerGroup = L.layerGroup([
            L.marker([-8.33, 115.35]).bindPopup("Layer Group Marker 1"),
            L.marker([-8.31, 115.32]).bindPopup("Layer Group Marker 2"),
            L.marker([-8.36, 115.37]).bindPopup("Layer Group Marker 3"),
            L.marker([-8.34, 115.30]).bindPopup("Layer Group Marker 4")
        ]);

        // Feature Group
        const featureGroup = L.featureGroup([
            L.marker([-8.28, 115.30]).bindPopup("Feature Group Marker 1"),
            L.marker([-8.26, 115.33]).bindPopup("Feature Group Marker 2"),
            L.marker([-8.29, 115.36]).bindPopup("Feature Group Marker 3"),
            L.marker([-8.24, 115.31]).bindPopup("Feature Group Marker 4")
        ]);

        /*
        =========================
        RASTER LAYER
        =========================
        */
        // Raster Layer Image
        const imageBounds = [
            [-8.50, 115.00],
            [-8.20, 115.40]
        ];

        const imageLayer = L.imageOverlay(
            "https://upload.wikimedia.org/wikipedia/commons/3/3c/Shaki_waterfall.jpg",
            imageBounds
        ).bindPopup("Image Overlay");

        /*
        =========================
        PLUGIN LAYER
        =========================
        */
        // Marker Cluster
        const markerCluster = L.markerClusterGroup();

        const clusterPoints = [
            [-8.65, 115.21],
            [-8.6, 115.3],
            [-8.55, 115.25]
        ];

        clusterPoints.forEach((p, i) => {
            L.marker(p)
                .bindPopup(`Cluster ${i + 1}`)
                .addTo(markerCluster);
        });

        // Heatmap
        const heatLayer = L.heatLayer(
            [
                [-8.65, 115.21, 0.5],
                [-8.6, 115.3, 0.8],
                [-8.55, 115.25, 1]
            ],
            {
                radius: 50,
                gradient: {
                    0.4: "red",
                    0.7: "red",
                    1.0: "darkred"
                }
            }
        );

        /*
        =========================
        DRAW LAYER
        =========================
        */
        const drawnItems = new L.FeatureGroup();
        map.addLayer(drawnItems);

        const drawControl = new L.Control.Draw({
            edit: {
                featureGroup: drawnItems,
                remove: true
            },
            draw: {
                polygon: true,
                polyline: true,
                rectangle: true,
                circle: true,
                marker: true,
                circlemarker: true,
            }
        });

        map.addControl(drawControl);

        // Created
        map.on("draw:created", (e) => {
            const layer = e.layer;

            layer.bindPopup("Layer baru dibuat");

            drawnItems.addLayer(layer);
        });

        // Edited
        map.on("draw:edited", (e) => {
            e.layers.eachLayer((layer) => {
                layer.bindPopup("Layer sudah diedit");
            });
        });

        // Deleted
        map.on("draw:deleted", (e) => {
            e.layers.eachLayer((layer) => {
                console.log("Layer dihapus", layer);
            });
        });

        /*
        =========================
        OVERLAY CONTROL
        =========================
        */
        const overlayMaps = {

            Marker: markerLayer,
            "Marker Custom Icon": markerLayerCustom,
            CircleMarker: circleMarkerLayer,
            Polyline: polylineLayer,
            Polygon: polygonLayer,
            Rectangle: rectangleLayer,
            Circle: circleLayer,

            GeoJSON: geoJsonLayer,

            LayerGroup: layerGroup,
            FeatureGroup: featureGroup,

            ImageOverlay: imageLayer,

            MarkerCluster: markerCluster,
            Heatmap: heatLayer

        };

        // Object.values(overlayMaps).forEach(layer => layer.addTo(map));

        L.control.layers(baseMaps, overlayMaps).addTo(map);

    }, []);
};

export default useMapFrontpageStatic;