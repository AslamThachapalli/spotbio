'use client'

import { useEffect, useState } from 'react';
import Input from '@/components/Input';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';
import { useProfile } from '@/contexts/ProfileContext';
import { toast } from 'sonner';
import { createProfile } from '@/actions/profile';
import { useRouter } from 'next/navigation';

export default function CreateProfile() {
    const router = useRouter()
    const [error, setError] = useState({ name: "", bio: "", avatar: "" });
    const [form, setForm] = useState<{ name: string, bio: string, avatar: File | null }>({ name: "", bio: "", avatar: null });
    const [isLoading, setIsLoading] = useState(false);

    const { profile, setProfile } = useProfile();

    useEffect(() => {
        if(profile){
            router.push('/dashboard/links')
        }
    }, [profile])

    const handleSave = async () => {

        let newError = { name: "", bio: "", avatar: "" };
        let hasError = false;

        if (!form.name.trim()) {
            newError.name = "Name cannot be empty";
            hasError = true;
        }
        if (!form.bio.trim()) {
            newError.bio = "Bio cannot be empty";
            hasError = true;
        }

        if (!form.avatar) {
            hasError = true;
            toast.error("Avatar is required");
        }

        setError(newError);

        if (!hasError) {
            setIsLoading(true)
            const formData = new FormData();
            formData.append('name', form.name);
            formData.append('bio', form.bio);
            formData.append('avatar', form.avatar!);

            const profile = await createProfile(formData)

            if (!profile.error) {
                setProfile(profile.data!)
                router.push('/dashboard/links')
            } else {
                setIsLoading(false)
                toast.error(profile.error)
            }
        }
    };

    return (
        <div className="max-w-2xl mx-auto mt-4 h-screen">
            <div className="h-full w-full flex justify-center items-center">
                <div className="bg-white shadow-md rounded-lg overflow-hidden w-full">
                    <h2 className="text-xl font-bold px-6 pt-4">Profile</h2>
                    <div className="p-6">
                        <div className="flex gap-4">
                            <div className='flex-[0.6]'>
                                <div className="mb-4">
                                    <Input
                                        value={form.name}
                                        onChange={(e) => {
                                            setForm({ ...form, name: e.target.value });
                                            setError({ ...error, name: "" });
                                        }}
                                        placeholder="Enter your name"
                                        label="Name"
                                    />
                                    {error.name && <p className="text-red-500 mb-4">{error.name}</p>}
                                </div>
                                <div className="mb-6">
                                    <Input
                                        value={form.bio}
                                        onChange={(e) => {
                                            setForm({ ...form, bio: e.target.value });
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
                                        <AvatarImage src={form.avatar ? URL.createObjectURL(form.avatar) : ""} />
                                        <AvatarFallback>
                                            {form.name.charAt(0)}
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
                                                setForm({ ...form, avatar: file });
                                            } else {
                                                setForm({ ...form, avatar: null });
                                            }
                                        }}
                                    />
                                </label>
                            </div>
                        </div>
                        <button
                            onClick={handleSave}
                            disabled={isLoading}
                            className="bg-default-gradient text-white px-4 py-2 rounded-md hover:opacity-90 transition-opacity w-full font-bold"
                        >
                            {isLoading ? 'Creating...' : 'Create'}
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}