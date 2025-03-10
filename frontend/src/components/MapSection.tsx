import { useSelector } from 'react-redux';
import { Map, AdvancedMarker, Pin } from '@vis.gl/react-google-maps';
import { RootState } from '../store/store';

const DEFAULT_CENTER = { lat: 3.590, lng: 107.656 };
const DEFAULT_ZOOM = 6;
const DEFAULT_ZOOM_WITH_LOCATION = 16;

const MapSection: React.FC = () => {
    const activeLocation = useSelector((state: RootState) => state.location.activeLocation);
    const locations = useSelector((state: RootState) => state.location.locations)

    return (
        <div className="SplitLayoutContainer" slot="main">
            <Map
                id="gmap"
                mapId="DEMO_MAP_ID"
                center={activeLocation?.location ?? DEFAULT_CENTER}
                zoom={
                    activeLocation?.location ? DEFAULT_ZOOM_WITH_LOCATION : DEFAULT_ZOOM
                }
                gestureHandling="auto"
                disableDefaultUI>
                {activeLocation?.location && (
                    <AdvancedMarker position={activeLocation?.location}>
                        <Pin
                            background={'gold'}
                            glyphColor={'#000'}
                            borderColor={'#000'}
                        />
                    </AdvancedMarker>
                )}
                {locations.map((place, _index) => (
                    <AdvancedMarker position={{ lat: place.latitude, lng: place.longitude }}>
                        <Pin
                            background={'cyan'}
                            glyphColor={'#000'}
                            borderColor={'#000'}
                        />
                    </AdvancedMarker>
                ))}
            </Map>
        </div>
    );
}

export default MapSection;