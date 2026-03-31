import useMapInput from "@/Hooks/useMapInput.js"; 
import React from "react";

export default function MapsInput({
    mapsHeight = "h-96",
    isUpdate = false,
    location = null,
    polygon = null,
    polyline = null,
    popUpContent = null,
}) {
    useMapInput({ isUpdate, location, polygon, polyline, popUpContent });
    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="border-stroke shadow-default rounded-sm border bg-white">
                <div className="border-stroke border-b px-6 py-4">
                    <h3 className="font-medium text-black">Maps</h3>
                </div>
                <div className={`w-full ${mapsHeight}`}>
                    <div id="maps-input" className="z-30 h-full"></div>
                </div>
            </div>
        </div>
    );
}
