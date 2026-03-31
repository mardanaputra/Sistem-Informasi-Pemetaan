import useMapFrontpageDynamic from "@/Hooks/useMapFrontpageDynamic";
import { usePage } from "@inertiajs/react";

export default function MapFrontpageDynamic() {
    const { subaks, rivers, landAgricultures } = usePage().props;

    useMapFrontpageDynamic({ subaks, rivers, landAgricultures });

    return (
        <div className="h-[90vh] w-full">
            <div id="maps" className="z-30 h-full"></div>
        </div>
    );
}
