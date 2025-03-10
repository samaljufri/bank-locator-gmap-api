import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchLocations } from '../features/locationSlice';
import { RootState, AppDispatch } from '../store/store';

const LocationList: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { locations, status, error } = useSelector(
        (state: RootState) => state.location
    );
    const activeUser = useSelector((state: RootState) => state.user.activeUser);

    useEffect(() => {
        if (activeUser) {
            dispatch(fetchLocations(activeUser.username));
        }
    }, [dispatch, activeUser]);

    if (!activeUser) return <div>Select a user to view locations.</div>;
    if (status === 'loading') return <div>Loading locations...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <div>
            <div className="table-body">
                {locations.map((location, index) => (
                    <div className="table-row" key={index}>
                        <div className="table-cell"><b>{location.name}</b> - {location.address}</div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LocationList;