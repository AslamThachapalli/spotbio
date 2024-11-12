'use client'

import { useState, useEffect } from 'react';
import Input from '@/components/Input';
import { getProfile, createProfile, updateProfile } from '@/actions/profile';
import { ProfileType } from '@/actions/profile/types';
import { toast } from 'sonner';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';

function DesignPage() {
    const [profile, setProfile] = useState<Omit<ProfileType, 'avatar'> & { avatar: string | null }>({ name: '', bio: '', avatar: null });
    const [error, setError] = useState({ name: "", bio: "" });
    const [serverError, setServerError] = useState<string | null>(null);
    const [isChanged, setIsChanged] = useState(false);
    const [newAvatar, setNewAvatar] = useState<File | null>(null);

    useEffect(() => {
        const fetchProfile = async () => {
            const result = await getProfile();
            if (result.data) {
                console.log('result.data', result.data)
                setProfile(result.data);
            } else if (result.error) {
                setServerError(result.error);
            }
        };

        fetchProfile();
    }, []);

    const handleSave = async () => {
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
            const formData = new FormData();
            formData.append('name', profile.name);
            formData.append('bio', profile.bio);
            if (newAvatar) {
                formData.append('avatar', newAvatar);
            }

            const result = profile.id
                ? await updateProfile(formData)
                : await createProfile(formData);

            if (result.error) {
                toast.error(result.error);
            } else {
                toast.success('Profile saved successfully');
                setServerError(null);
                setIsChanged(false);
            }
        }
    };

    const handleChange = (newProfile: Omit<ProfileType, 'avatar'> & { avatar: string | null }) => {
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
                    {serverError && <p className="text-red-500 mb-4">{serverError}</p>}
                    <div className="flex gap-4">
                        <div className='flex-[0.6]'>
                            <div className="mb-4">
                                <Input
                                    value={profile.name}
                                    onChange={(e) => {
                                        handleChange({ ...profile, name: e.target.value });
                                        setError({ ...error, name: "" });
                                    }}
                                    placeholder="Enter your name"
                                    label="Name"
                                />
                                {error.name && <p className="text-red-500 mb-4">{error.name}</p>}
                            </div>
                            <div className="mb-6">
                                <Input
                                    value={profile.bio}
                                    onChange={(e) => {
                                        handleChange({ ...profile, bio: e.target.value });
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
                                    <AvatarImage src={newAvatar ? URL.createObjectURL(newAvatar) : profile.avatar || ""} />
                                    <AvatarFallback>
                                        {profile.name.charAt(0)}
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