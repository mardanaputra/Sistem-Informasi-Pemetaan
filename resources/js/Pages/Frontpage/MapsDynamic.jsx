import MapFrontpageDynamic from "@/Components/Map/MapFrontpageDynamic";
import FrontpageLayout from "../../Layouts/FrontpageLayout";

export default function MapsDynamicPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white pt-16">
                <MapFrontpageDynamic />
            </section>
        </FrontpageLayout>
    );
}
