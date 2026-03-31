import { useEffect } from "react";
import { useShallow } from "zustand/react/shallow";
// leaflet
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
// leaflet draw
import { ATRIBUTE_NAME, GOOGLE_STREET_MAP, OPEN_STREET_MAP, SATELLITE_MAP } from "@/Constants/basemap";
import { useInputMapStore } from "@/Store/useInputMapStore";
import * as turf from '@turf/turf';
import 'leaflet-draw/dist/leaflet.draw';
import 'leaflet-draw/dist/leaflet.draw.css';

const useMapInput = ({ isUpdate, location, polygon, polyline, popUpContent }) => {
    const { setLocationInput, setPolygonInput, setPolylineInput, setWideAreaInput, setAddressInput } = useInputMapStore(
        useShallow((state) => (
            {
                setLocationInput: state.setLocationInput,
                setPolygonInput: state.setPolygonInput,
                setPolylineInput: state.setPolylineInput,
                setWideAreaInput: state.setWideAreaInput,
                setAddressInput: state.setAddressInput
            }
        )),
    );

    useEffect(() => {
        const GOOGLE_HYBRID_MAP = L.tileLayer('http://{s}.google.com/vt?lyrs=s,h&x={x}&y={y}&z={z}', {
            attribution: ATRIBUTE_NAME,
            subdomains: ['mt0', 'mt1', 'mt2', 'mt3'],
            maxZoom: 20
        });

        // Initialize the map with the default basemap
        const coorBali = [-8.198517680287658, 115.10051848149178];

        const map = L.map('maps-input', {
            layers: [GOOGLE_HYBRID_MAP],
            center: location ?? coorBali,
            zoom: 10,
            // minZoom: ,
            zoomControl: false
        });

        const baseMaps = {
            "OpenStreetMap": OPEN_STREET_MAP,
            "Google Street": GOOGLE_STREET_MAP,
            "Google Satelite": SATELLITE_MAP,
            "Google Hibrid": GOOGLE_HYBRID_MAP
        };

        L.control.layers(baseMaps).addTo(map);

        // Custom zoom control
        const customZoomControl = L.control.zoom({
            position: 'bottomright'
        });

        // Add the custom zoom control to the map
        map.addControl(customZoomControl);

        // get address
        function getAddress(lat, lng) {
            fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`)
                .then(response => {
                    if (!response.ok) {
                        throw new Error(`HTTP error! Status: ${response.status}`);
                    }
                    return response.json();
                })
                .then(data => {
                    const address = data.display_name;
                    // console.log('is calllllll');
                    setAddressInput(address);
                })
                .catch(error => {
                    console.error('Error fetching address:', error);
                });
        }


        // LAYER DRAW
        const drawnItems = new L.FeatureGroup(); //For save the elemen in draw
        map.addLayer(drawnItems); //Added fitur grup to maps

        if (isUpdate) {
            // location (Point)
            if (location) {
                const markerLayer = L.marker(location ?? coorBali)
                    .bindPopup(popUpContent);

                drawnItems.addLayer(markerLayer);
                markerLayer.openPopup();

                // center map ke location
                map.setView(location ?? coorBali, 18);
            }

            // polygon (GeoJSON)
            if (polygon) {
                const polygonLayer = L.geoJSON(polygon, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(popUpContent);
                    }
                });

                polygonLayer.eachLayer(function (layer) {
                    drawnItems.addLayer(layer);
                    layer.openPopup();
                });

                // center map ke polygon
                map.fitBounds(polygonLayer.getBounds());
            }

            // polyline (GeoJSON)
            if (polyline) {
                const polylineLayer = L.geoJSON(polyline, {
                    onEachFeature: function (feature, layer) {
                        layer.bindPopup(popUpContent);
                    }
                });

                polylineLayer.eachLayer(function (layer) {
                    drawnItems.addLayer(layer);
                    layer.openPopup();
                });

                // center map ke polyline
                map.fitBounds(polylineLayer.getBounds());
            }
        }

        const drawControl = new L.Control.Draw({
            position: 'topleft',
            draw: {
                polygon: {
                    shapeOptions: {
                        color: 'green', // Color border polygon
                        fillColor: 'rgba(0, 0, 0, 0.5)' // Fill color blue tranparant
                    },
                    allowIntersection: false,
                    drawError: {
                        color: 'orange',
                        timeout: 1000 //= 1 second
                    },
                    showArea: true, //Show polygon area when draw
                    metric: false,
                    repeatMode: true
                },
                polyline: true,
                circlemarker: false, //circlemarker type has been disabled.
                rect: false,
                circle: false,
                rectangle: false,
                polygon: true // polygon no active
            },
            edit: {
                featureGroup: drawnItems
            }
        });

        map.addControl(drawControl); //Add to map

        map.on('draw:created', function (e) {
            const type = e.layerType,
                layer = e.layer;
            // Remove only elements of the appropriate type
            if (type === 'marker') {
                drawnItems.eachLayer(function (existingLayer) {
                    if (existingLayer instanceof L.Marker) {
                        drawnItems.removeLayer(existingLayer);
                    }
                });
            } else if (type === 'polygon') {
                drawnItems.eachLayer(function (existingLayer) {
                    if (existingLayer instanceof L.Polygon) {
                        drawnItems.removeLayer(existingLayer);
                    }
                });
            } else if (type === 'polyline') {
                drawnItems.eachLayer(function (existingLayer) {
                    if (existingLayer instanceof L.Polyline) {
                        drawnItems.removeLayer(existingLayer);
                    }
                });
            }

            drawnItems.addLayer(layer);

            if (type === 'marker') {
                const coordinates = layer.getLatLng();
                const lat = coordinates.lat;
                const lng = coordinates.lng;

                getAddress(lat, lng);

                setLocationInput(`[${lat}, ${lng}]`);
            }

            if (type === 'polygon') {
                const aoi = layer.toGeoJSON().geometry;
                setPolygonInput(JSON.stringify(aoi));

                // Menghitung luas menggunakan Turf.js
                const areaInSquareMeters = turf.area(aoi);
                const areaInAre = areaInSquareMeters / 100; // Konversi ke are
                setWideAreaInput(areaInAre.toFixed(2));
            }

            if (type === 'polyline') {
                const aoi = layer.toGeoJSON().geometry;
                setPolylineInput(JSON.stringify(aoi));
            }
        });

        map.on('draw:edited', function (e) {
            const editedLayers = e.layers;

            editedLayers.eachLayer(function (layer) {
                let type = '';

                if (layer instanceof L.Marker) {
                    type = 'marker';
                } else if (layer instanceof L.Polygon) {
                    type = 'polygon';
                } else if (layer instanceof L.Polyline) {
                    type = 'polyline';
                }

                if (type === 'marker') {
                    const coordinates = layer.getLatLng();
                    const lat = coordinates.lat;
                    const lng = coordinates.lng;

                    getAddress(lat, lng);
                    setLocationInput(`[${lat}, ${lng}]`);
                }

                if (type === 'polygon') {
                    const aoi = layer.toGeoJSON().geometry;
                    setPolygonInput(JSON.stringify(aoi));

                    const areaInSquareMeters = turf.area(aoi);
                    const areaInAre = areaInSquareMeters / 100;
                    setWideAreaInput(areaInAre.toFixed(2));
                }

                if (type === 'polyline') {
                    const aoi = layer.toGeoJSON().geometry;
                    setPolylineInput(JSON.stringify(aoi));
                }
            });
        });

        map.on('draw:deleted', function (e) {
            const deletedLayers = e.layers;

            deletedLayers.eachLayer(function (layer) {
                if (layer instanceof L.Marker) {
                    setLocationInput('');
                    setAddressInput('');
                }

                if (layer instanceof L.Polygon) {
                    setPolygonInput('');
                    setWideAreaInput('');
                }

                if (layer instanceof L.Polyline) {
                    setPolylineInput('');
                }
            });
        });
    }, []);
};

export default useMapInput;