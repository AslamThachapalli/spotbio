import db from '@/db'

const isUsernameAvailable = async (username: string): Promise<boolean> => {
    const user = await db.user.findUnique({
        where: {
            username
        }
    })

    if(!user) return true

    return false
}

const createUser = () => {
    
}