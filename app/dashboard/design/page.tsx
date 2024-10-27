'use client'

import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import { getProfile, createProfile, updateProfile } from '@/actions/profile';
import { ProfileType } from '@/actions/profile/types';
import { toast } from 'sonner';

function DesignPage() {
    const [profile, setProfile] = useState<ProfileType>({ name: '', bio: '' });
    const [error, setError] = useState({ name: "", bio: "" });
    const [serverError, setServerError] = useState<string | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfile();
            if (result.data) {
                setProfile(result.data);
            } else if (result.error) {
                setServerError(result.error);
            }
        };
        fetchProfile();
    }, []);

    const handleSave = async () => {
        let newError = { name: "", bio: "" };
        let hasError = false;

        if (!profile.name.trim()) {
            newError.name = "Name cannot be empty";
            hasError = true;
        }
        if (!profile.bio.trim()) {
            newError.bio = "Bio cannot be empty";
            hasError = true;
        }

        setError(newError);

        if (!hasError) {
            const result = profile.id
                ? await updateProfile(profile)
                : await createProfile(profile);

            if (result.error) {
                setServerError(result.error);
            } else {
                toast.success('Profile saved successfully');
                setServerError(null);
            }
        }
    };

    return ( 
        <div className="max-w-2xl mx-auto mt-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold px-6 pt-4">Profile</h2>
                <div className="p-6">
                    {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
                    <div className="mb-4">
                        <Input
                            value={profile.name}
                            onChange={(e) => {
                                setProfile({ ...profile, name: e.target.value })
                                setError({ ...error, name: "" })
                            }}
                            placeholder="Enter your name"
                            label="Name"
                        />
                        { error.name && <p className="text-red-500 mb-4">{error.name}</p>}
                    </div>

                    <div className="mb-6">
                        <Input
                            value={profile.bio}
                            onChange={(e) => {
                                setProfile({ ...profile, bio: e.target.value })
                                setError({ ...error, bio: "" })
                            }}
                            placeholder="Enter your bio"
                            label="Bio"
                        />
                        { error.bio && <p className="text-red-500 mb-4">{error.bio}</p>}
                    </div>
                    
                    <button
                        onClick={handleSave}
                        className="bg-default-gradient text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full font-bold"
                    >
                        Save
                    </button>
                </div>
            </div>
        </div>
     );
}

export default DesignPage;