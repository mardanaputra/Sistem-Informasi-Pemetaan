import MapFrontpageStatic from "@/Components/Map/MapFrontpageStatic";
import FrontpageLayout from "../../Layouts/FrontpageLayout";

export default function MapsStaticPage() {
    return (
        <FrontpageLayout>
            <section className="bg-white pt-16">
                <MapFrontpageStatic />
            </section>
        </FrontpageLayout>
    );
}
