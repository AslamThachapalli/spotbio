import { isUsernameAvailable } from "@/actions/auth"

export type InputValidationType = {
    isValid: boolean,
    error?: string
}

export const validateEmail = (email: string): InputValidationType => {
    if (!email) {
        return {
            isValid: false,
            error: 'Email is required'
        }
    } else {
        return {
            isValid: true,
        }
    }
}

export const validatePassword = (password: string): InputValidationType => {
    if (!password) {
        return {
            isValid: false,
            error: 'Password is required'
        }
    } else if (password.length < 6) {
        return {
            isValid: false,
            error: 'Atleast 6 letters required'
        }
    } else {
        return {
            isValid: true,
        }
    }
}

export const validateUsername = async (username: string): Promise<InputValidationType> => {
    if (!username) {
        return {
            isValid: false,
            error: 'username is required'
        }
    }

    if(!(await isUsernameAvailable(username))){
        return {
            isValid: false,
            error: 'username already taken'
        }
    }

    return {
        isValid: true,
    }
}