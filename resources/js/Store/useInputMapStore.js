import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useInputMapStore = create(
    (set) => ({
        locationInput: '',
        setLocationInput: (data) => set({ locationInput: data }),
        addressInput: '',
        setAddressInput: (data) => set({ addressInput: data }),
        polygonInput: '',
        setPolygonInput: (data) => set({ polygonInput: data }),
        wideAreaInput: '',
        setWideAreaInput: (data) => set({ wideAreaInput: data }),
        polylineInput: '',
        setPolylineInput: (data) => set({ polylineInput: data }),
        clearStore: () => set({
            locationInput: '',
            addressInput: '',
            polygonInput: '',
            wideAreaInput: '',
            polylineInput: '',
        })
    })
);
