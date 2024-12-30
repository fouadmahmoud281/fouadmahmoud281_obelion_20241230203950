import React, { useState, useEffect } from 'react';
import './CoOrganizerManagement.css';

const CoOrganizerManagement = () => {
    const [organizers, setOrganizers] = useState([]);
    const [newOrganizer, setNewOrganizer] = useState('');
    const [error, setError] = useState('');

    useEffect(() => {
        fetchOrganizers();
    }, []);

    const fetchOrganizers = async () => {
        try {
            const response = await fetch('https://Attendapp-backend.cloud-stacks.com/api/organizers');
            if (!response.ok) throw new Error('Failed to fetch organizers');
            const data = await response.json();
            setOrganizers(data);
        } catch (error) {
            setError(error.message);
        }
    };

    const handleAddOrganizer = async () => {
        if (newOrganizer.trim() === '') return;
        try {
            const response = await fetch('https://Attendapp-backend.cloud-stacks.com/api/organizers', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ name: newOrganizer, permissions: [] }),
            });
            if (!response.ok) throw new Error('Failed to add organizer');
            const newOrganizerData = await response.json();
            setOrganizers([...organizers, newOrganizerData]);
            setNewOrganizer('');
        } catch (error) {
            setError(error.message);
        }
    };

    const handlePermissionChange = async (organizerIndex, module) => {
        const updatedOrganizers = organizers.map((organizer, index) => {
            if (index === organizerIndex) {
                const hasPermission = organizer.permissions.includes(module);
                return {
                    ...organizer,
                    permissions: hasPermission
                        ? organizer.permissions.filter(perm => perm !== module)
                        : [...organizer.permissions, module]
                };
            }
            return organizer;
        });

        const organizerToUpdate = updatedOrganizers[organizerIndex];

        try {
            const response = await fetch(`https://Attendapp-backend.cloud-stacks.com/api/organizers/${organizerToUpdate.id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ permissions: organizerToUpdate.permissions }),
            });
            if (!response.ok) throw new Error('Failed to update permissions');
            setOrganizers(updatedOrganizers);
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <div className="co-organizer-management">
            <h2>Add Additional Organizers</h2>
            {error && <div className="error">{error}</div>}
            <input
                type="text"
                value={newOrganizer}
                onChange={(e) => setNewOrganizer(e.target.value)}
                placeholder="Enter organizer's name"
            />
            <button onClick={handleAddOrganizer}>Add Organizer</button>
            <div>
                {organizers.map((organizer, index) => (
                    <div key={index} className="organizer-item">
                        <span>{organizer.name}</span>
                        <div>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={organizer.permissions.includes('module1')}
                                    onChange={() => handlePermissionChange(index, 'module1')}
                                />
                                Module 1
                            </label>
                            <label>
                                <input
                                    type="checkbox"
                                    checked={organizer.permissions.includes('module2')}
                                    onChange={() => handlePermissionChange(index, 'module2')}
                                />
                                Module 2
                            </label>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CoOrganizerManagement;