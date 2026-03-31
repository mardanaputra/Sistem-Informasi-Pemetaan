import useMapDetail from "@/Hooks/useMapDetail";

export default function MapDetail({
    location = null,
    polygon = null,
    polyline = null,
    popUpContent = null,
}) {
    useMapDetail({ location, polygon, polyline, popUpContent });

    return (
        <div className="flex flex-col gap-9 lg:col-span-2">
            <div className="border-stroke shadow-default rounded-sm border bg-white">
                <div className="border-stroke border-b px-6 py-4">
                    <h3 className="font-medium text-black">Maps</h3>
                </div>
                <div className="h-96 w-full lg:h-[400px]">
                    <div id="maps" className="z-30 h-full"></div>
                </div>
            </div>
        </div>
    );
}
