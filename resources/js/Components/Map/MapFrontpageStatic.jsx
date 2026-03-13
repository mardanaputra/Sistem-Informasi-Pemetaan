import useMapFrontpageStatic from "@/Hooks/useMapFrontpageStatic";

export default function MapFrontpageStatic() {
    useMapFrontpageStatic();

    return (
        <div className="h-[90vh] w-full">
            <div id="maps" className="z-30 h-full"></div>
        </div>
    );
}
