import MapFrontpageStatic from "@/Components/Map/MapFrontpageStatic";
import FrontpageLayout from "../../Layouts/FrontpageLayout";

export default function MapsStaticPage() {
    return (
        <FrontpageLayout>
            {/* pt-16: Memberikan ruang kosong di atas setinggi Navbar (64px) 
              h-[calc(100vh-64px)]: Mengambil sisa tinggi layar
            */}
            <section className="w-full h-[calc(100vh-64px)] pt-16 bg-white relative">
                <MapFrontpageStatic />
            </section>
        </FrontpageLayout>
    );
}