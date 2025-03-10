import { APIProvider } from '@vis.gl/react-google-maps';
import { SplitLayout } from '@googlemaps/extended-component-library/react';
import SidebarSection from './SidebarSection';
import MapSection from './MapSection';

const API_KEY = import.meta.env.VITE_GOOGLE_API_KEY || '';

const MainLayout: React.FC = () => {
    return (
        <div className="main-layout">
            <APIProvider
                solutionChannel="GMP_visgl_rgmlibrary_v1_extendedcomponentlibraryexample"
                apiKey={API_KEY}
                version="beta">
                <SplitLayout rowLayoutMinWidth={700}>
                    <SidebarSection />
                    <MapSection />
                </SplitLayout>
            </APIProvider>
        </div>
    );
}

export default MainLayout;