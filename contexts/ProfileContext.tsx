'use client'

import { getProfile, updateProfile } from "@/actions/profile";
import { Profile } from "@prisma/client"
import { useSession } from "next-auth/react";
import { createContext, useContext, useState, useEffect, Dispatch, SetStateAction } from "react"
import { toast } from "sonner";

interface ProfileContextType {
    isLoading: boolean;
    profile: Profile | null;
    setProfile: Dispatch<SetStateAction<Profile | null>>;
    newAvatar: File | null;
    setNewAvatar: Dispatch<SetStateAction<File | null>>;
    handleSave: () => void;
}

const ProfileContext = createContext<ProfileContextType | undefined>(undefined)

export const ProfileProvider = ({ children }: { children: React.ReactNode }) => {
    const [profile, setProfile] = useState<Profile | null>(null)
    const [newAvatar, setNewAvatar] = useState<File | null>(null)
    const [isLoading, setIsLoading] = useState<boolean>(true);

    const session = useSession()

    const fetchProfile = async () => {
        setIsLoading(true)
        const { data, error } = await getProfile();

        if (!error && data) {
            setProfile(data);
        } else {
            setProfile(null);
            toast.error(error || 'Failed to fetch profile');
        }
        setIsLoading(false)
    };

    useEffect(() => {
        fetchProfile();
    }, [])

    const handleSave = async () => {
        if (!profile) return;

        const formData = new FormData();
        formData.append('name', profile.name);
        formData.append('bio', profile.bio);
        if (newAvatar) {
            formData.append('avatar', newAvatar);
        }

        const result = await updateProfile(formData)

        if (result.error) {
            toast.error(result.error);
        } else {
            toast.success('Profile saved successfully');
        }
    }

    return <ProfileContext.Provider value={{
        isLoading,
        profile,
        newAvatar,
        setNewAvatar,
        handleSave,
        setProfile,
    }}>
        {children}
    </ProfileContext.Provider>
}

export const useProfile = () => {
    const context = useContext(ProfileContext)
    if (!context) {
        throw new Error('useProfile must be used within a ProfileProvider')
    }
    return context
}