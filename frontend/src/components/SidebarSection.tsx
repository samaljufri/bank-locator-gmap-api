import { useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { OverlayLayout } from '@googlemaps/extended-component-library/react';
import { OverlayLayout as TOverlayLayout } from '@googlemaps/extended-component-library/overlay_layout.js';
import { PlacePicker, PlaceOverview, IconButton } from '@googlemaps/extended-component-library/react';
import { PlacePicker as TPlacePicker } from '@googlemaps/extended-component-library/place_picker.js';
import UserDropdown from './UserDropdown';
import LocationList from './LocationList';
import { AppDispatch, RootState } from '../store/store';
import { setActiveLocation, addLocation } from '../features/locationSlice';

const SidebarSection: React.FC = () => {
    const overlayLayoutRef = useRef<TOverlayLayout>(null);
    const pickerRef = useRef<TPlacePicker>(null);
    const activeUser = useSelector((state: RootState) => state.user.activeUser);
    const dispatch: AppDispatch = useDispatch();
    const [place, setPlace] = useState<google.maps.places.Place | undefined>(undefined);
    const [visitedPlaces, setVisitedPlaces] = useState<google.maps.places.Place[]>([]);

    const handleLocationChanged = (place: google.maps.places.Place | undefined) => {
        dispatch(setActiveLocation(place));
    };

    const saveLocation = (place: google.maps.places.Place | undefined) => {
        console.log("SaveLoc");
        console.log(place?.displayName);
        if (activeUser && place) {
            dispatch(addLocation({
                username: activeUser.username,
                name: place.displayName || '',
                address: place.formattedAddress || '',
                latitude: place.location?.lat() || 0,
                longitude: place.location?.lng() || 0
            }));
        }
        overlayLayoutRef.current?.hideOverlay()
    }

    return (
        <div className="SplitLayoutContainer" slot="fixed">
            <OverlayLayout ref={overlayLayoutRef}>
                <div className="MainContainer" slot="main">
                    <div className="SelectUser">
                        <div>Select Active User: </div>
                        <UserDropdown />
                    </div>
                    {activeUser ? (
                        <>
                            <hr />
                            <h4>Malaysian Bank Locator</h4>
                            <br />
                            <details>
                                <summary>Search Banks</summary>
                                <PlacePicker
                                    className="PlacePicker"
                                    ref={pickerRef}
                                    forMap="gmap"
                                    country={['my']}
                                    type="bank"
                                    placeholder="Find banks in Malaysia"
                                    onPlaceChange={() => {
                                        if (!pickerRef.current?.value) {
                                            handleLocationChanged(undefined);
                                            setPlace(undefined);
                                        } else {
                                            const value: google.maps.places.Place = pickerRef.current?.value;
                                            console.log("SELECTED: ", value);
                                            setPlace(value);
                                            handleLocationChanged(value);
                                            setVisitedPlaces([...visitedPlaces, value]);
                                        }
                                    }}
                                />
                                <PlaceOverview
                                    size="small"
                                    place={place}
                                    googleLogoAlreadyDisplayed>
                                    <div slot="action">
                                        <IconButton
                                            slot="action"
                                            variant="filled"
                                            onClick={() => {
                                                overlayLayoutRef.current?.showOverlay();
                                                saveLocation(place);
                                            }}>
                                            Save
                                        </IconButton>
                                    </div>

                                </PlaceOverview>
                            </details>
                            <details open>
                                <summary>Saved Places</summary>
                                <LocationList />
                            </details>
                            <details open>
                                <summary>History</summary>
                                <div className="table-body">
                                    {visitedPlaces.map((place, index) => (
                                        <div className="table-row" key={index}>
                                            <div className="table-cell"><b>{place.displayName}</b> - {place.formattedAddress}</div>
                                        </div>
                                    ))}
                                </div>
                            </details>
                        </>
                    ) : (
                        <div></div>
                    )}
                </div>
            </OverlayLayout>
        </div>
    );
}

export default SidebarSection;