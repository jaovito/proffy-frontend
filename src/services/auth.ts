import api from './api'

export async function signIn(email: string, password: string) {
    const response = await api.get('user', {
        headers: {
            email,
            password
        }
    })

    return response.data
}