import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUsers, setActiveUser } from '../features/userSlice';
import { RootState, AppDispatch } from '../store/store';

const UserDropdown: React.FC = () => {
    const dispatch: AppDispatch = useDispatch();
    const { users, activeUser, status, error } = useSelector(
        (state: RootState) => state.user
    );

    useEffect(() => {
        dispatch(fetchUsers());
    }, [dispatch]);

    const handleUserChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        const selectedUserId = event.target.value;
        const selectedUser = users.find((user) => user.username === selectedUserId);
        if (selectedUser) {
            dispatch(setActiveUser(selectedUser));
        }
    };

    if (status === 'loading') return <div>Loading users...</div>;
    if (status === 'failed') return <div>Error: {error}</div>;

    return (
        <select value={activeUser?.username || ''} onChange={handleUserChange}>
            <option value="">Select a user</option>
            {users.map((user) => (
                <option key={user.username} value={user.username}>
                    {user.username}
                </option>
            ))}
        </select>
    );
};

export default UserDropdown;