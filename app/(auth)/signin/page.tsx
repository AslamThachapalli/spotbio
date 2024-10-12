'use client'

export default function Signin() {
    return (
        <div className="w-screen h-full">
            <div className="mx-auto h-full flex justify-center items-center">
                <div className="flex flex-col gap-2 max-w-sm w-full bg-white p-4">
                    <h4>Signin</h4>

                    <label className="flex flex-col gap-1">
                        <span>Username</span>
                        <input
                            name="username"
                            type="text"
                            onChange={(e) => { }}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <label className="flex flex-col gap-1">
                        <span>Password</span>
                        <input
                            name="password"
                            type="password"
                            onChange={(e) => { }}
                            className="bg-gray-50 px-2 py-1"
                        />
                    </label>

                    <button>Submit</button>
                </div>
            </div>
        </div>
    )
}