import axios from 'axios';
import { 
    DogType, 
    EmergencyContactType,
    ImageType, 
    LogInFormDataType, 
    UserFormDataType, 
    UserType, 
    VeterinarianType } from '../types';


const baseURL:string = 'https://luckypaws-db.onrender.com'
const userEndpoint:string = '/users'
const EditUserEndpoint:string = '/users/me'
const veterinariansEndpoint:string = '/veterinarians'
const emergencyContactsEndpoint:string = '/emergency-contacts'
const dogsEndpoint:string = '/dogs'
const imagesEndpoint:string = '/images'
const loginEndpoint:string = '/login'



const apiClientNoAuth = () => axios.create({
    baseURL: baseURL
})

const apiClientBasicAuth = (username:string, password:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Basic ' + btoa(username + ':' + password)
    }
})

const apiClientTokenAuth = (token:string) => axios.create({
    baseURL: baseURL,
    headers: {
        Authorization: 'Bearer ' + token
    }
})

type APIResponse<T> = {
    data?: T,
    error?: string
}

async function register(newUser:UserFormDataType):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().post(userEndpoint, newUser)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function login(email:string, password:string): Promise<APIResponse<UserType>> {
    let data;
    let error;
    try{
        const response = await apiClientBasicAuth(email, password).get(loginEndpoint);
        data = response.data
    } catch(err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = 'Something went wrong'
        }
    }
    return { data, error }
}

async function editUser(user:Partial<UserType>, token:string):Promise<APIResponse<Partial<UserType>>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(EditUserEndpoint, user)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteUser(token:string):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(EditUserEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getUser(token:string):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(EditUserEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)){
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function createEmergencyContact(newEmergencyContact:EmergencyContactType, token:string):Promise<APIResponse<EmergencyContactType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(emergencyContactsEndpoint, newEmergencyContact)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getEmergencyContacts(token:string):Promise<APIResponse<EmergencyContactType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(emergencyContactsEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function editEmergencyContact(emergencyContact:Partial<EmergencyContactType>, id:number, token:string):Promise<APIResponse<Partial<EmergencyContactType>>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(`${emergencyContactsEndpoint}/${id}`, emergencyContact)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteEmergencyContact(id:number, token:string):Promise<APIResponse<EmergencyContactType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(`${emergencyContactsEndpoint}/${id}`)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function createVeterinarian(newVeterinarian:VeterinarianType, token:string):Promise<APIResponse<VeterinarianType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(veterinariansEndpoint, newVeterinarian)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getVeterinarians(token:string):Promise<APIResponse<VeterinarianType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(veterinariansEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function editVeterinarian(veterinarian:Partial<VeterinarianType>, id:number, token:string):Promise<APIResponse<Partial<VeterinarianType>>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(`${veterinariansEndpoint}/${id}`, veterinarian)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteVeterinarian(id:number, token:string):Promise<APIResponse<VeterinarianType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(`${veterinariansEndpoint}/${id}`)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function createDog(newDog:DogType, token:string):Promise<APIResponse<DogType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(dogsEndpoint, newDog)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getDogs(token:string):Promise<APIResponse<DogType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(dogsEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function editDog(dog:Partial<DogType>, id:number, token:string):Promise<APIResponse<Partial<DogType>>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(`${dogsEndpoint}/${id}`, dog)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteDog(id:number, token:string):Promise<APIResponse<DogType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(`${dogsEndpoint}/${id}`)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function uploadImage(image:ImageType, token:string):Promise<APIResponse<ImageType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(imagesEndpoint, image)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getImages(token:string):Promise<APIResponse<ImageType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(imagesEndpoint)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function deleteImage(id:number, token:string):Promise<APIResponse<ImageType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).delete(`${imagesEndpoint}/${id}`)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

async function getImageByID(id:number, token:string):Promise<APIResponse<ImageType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${imagesEndpoint}/${id}`)
        data = response.data
    } catch (err) {
        if (axios.isAxiosError(err)) {
            error = err.response?.data.error
        } else {
            error = "Something went wrong"
        }
    }
    return { data, error }
}

export { 
    register, 
    login, 
    editUser, 
    deleteUser,
    getUser, 
    createEmergencyContact, 
    getEmergencyContacts, 
    editEmergencyContact, 
    deleteEmergencyContact, 
    createVeterinarian, 
    getVeterinarians, 
    editVeterinarian, 
    deleteVeterinarian, 
    createDog, 
    getDogs, 
    editDog, 
    deleteDog, 
    uploadImage, 
    getImages, 
    deleteImage, 
    getImageByID 
}