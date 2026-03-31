import MapDetail from "@/Components/Map/MapDetail";
import BackpageLayout from "@/Layouts/BackpageLayout";
import { usePage } from "@inertiajs/react";

export default function DetailSubakPage() {
    const { subak } = usePage().props;

    return (
        <BackpageLayout>
            <div className="space-y-3">
                <h1 className="text-xl">Nama: {subak.subak_name}</h1>
                <p>Alamat: {subak.address}</p>
                <MapDetail
                    location={
                        subak.location
                            ? typeof subak.location === "string"
                                ? JSON.parse(subak.location)
                                : subak.location
                            : null
                    }
                    popUpContent={`<p>Lokasi subak: ${subak.subak_name ?? ""}</p>`}
                />
            </div>
        </BackpageLayout>
    );
}
