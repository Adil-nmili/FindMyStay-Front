import { api } from "./api"

export const AuthService = {
    getCSRFToken : async () => {
        return await api.get('/sanctum/csrf-cookie')
    },
    login :  (payload) => {
        return  api.post('/api/login',payload,{
            method:'POST'
        });
    },
    register : (payload) => {
        return api.post('/api/register',payload, {
            headers:{
                'Content-Type' :  'multipart/form-data'
            },
            method: 'POST'
        })
    },
    logout : (id) => {
        return api.post('/api/logout',id)
    },
    fetchUser : () => {
        return api.get('/api/user')
    }
}