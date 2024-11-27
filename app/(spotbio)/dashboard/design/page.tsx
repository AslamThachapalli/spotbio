'use client'

import { useState } from 'react';
import Input from '@/components/Input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '@/contexts/ProfileContext';
import { Profile } from '@prisma/client';

function DesignPage() {
    const [error, setError] = useState({ name: "", bio: "" });
    const [isChanged, setIsChanged] = useState(false);
    const {
        profile,
        setProfile,
        newAvatar,
        setNewAvatar,
        handleSave: handleSaveProfile
    } = useProfile();

    const handleSave = async () => {
        if (!profile) return;

        let newError = { name: "", bio: "", avatar: "" };
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
            handleSaveProfile();
            setIsChanged(false);
        }
    };

    const handleChange = (newProfile: Profile) => {
        setProfile(newProfile);
        setIsChanged(true);
    };

    const handleAvatarChange = (file: File) => {
        setNewAvatar(file);
        setIsChanged(true);
    };

    return (
        <div className="max-w-2xl mx-auto mt-4">
            <div className="bg-white shadow-md rounded-lg overflow-hidden">
                <h2 className="text-xl font-bold px-6 pt-4">Profile</h2>
                <div className="p-6">
                    <div className="flex gap-4">
                        <div className='flex-[0.6]'>
                            <div className="mb-4">
                                <Input
                                    value={profile?.name}
                                    onChange={(e) => {
                                        handleChange({ ...profile!, name: e.target.value });
                                        setError({ ...error, name: "" });
                                    }}
                                    placeholder="Enter your name"
                                    label="Name"
                                />
                                {error.name && <p className="text-red-500 mb-4">{error.name}</p>}
                            </div>
                            <div className="mb-6">
                                <Input
                                    value={profile?.bio}
                                    onChange={(e) => {
                                        handleChange({ ...profile! , bio: e.target.value });
                                        setError({ ...error, bio: "" });
                                    }}
                                    placeholder="Enter your bio"
                                    label="Bio"
                                />
                                {error.bio && <p className="text-red-500 mb-4">{error.bio}</p>}
                            </div>
                        </div>

                        <div className="flex-[0.4] flex items-center justify-center">
                            <label htmlFor="avatar-upload" className='cursor-pointer max-w-40 max-h-40 w-full h-full'>
                                <Avatar className='max-w-40 max-h-40 w-full h-full'>
                                    <AvatarImage src={newAvatar ? URL.createObjectURL(newAvatar) : profile?.avatar || ""} />
                                    <AvatarFallback>
                                        {profile?.name.charAt(0)}
                                    </AvatarFallback>
                                </Avatar>
                                <input
                                    id="avatar-upload"
                                    type="file"
                                    accept="image/*"
                                    className="hidden"
                                    onChange={(e) => {
                                        const file = e.target.files?.[0];
                                        if (file) {
                                            handleAvatarChange(file)
                                        }
                                    }}
                                />
                            </label>
                        </div>
                    </div>

                    {isChanged && (
                        <button
                            onClick={handleSave}
                            className="bg-default-gradient text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full font-bold"
                        >
                            Save
                        </button>
                    )}
                </div>
            </div>
        </div>
    );
}

export default DesignPage;