import axios from 'axios';
import { 
    DogType, 
    EmergencyContactType,
    ImageType, 
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

async function getUserById(id:number, token:string):Promise<APIResponse<UserType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${userEndpoint}/${id}`)
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

async function getAllUsers():Promise<APIResponse<UserType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(userEndpoint)
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

async function getEmergencyContactByUserID(id:number, token:string):Promise<APIResponse<EmergencyContactType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${emergencyContactsEndpoint}/user/${id}`)
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

async function getVeterinariansByUserID(id:number, token:string):Promise<APIResponse<VeterinarianType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${veterinariansEndpoint}/user/${id}`)
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
    console.log(newDog)
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

async function getDogs():Promise<APIResponse<DogType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(dogsEndpoint)
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

async function getDogById(id:number, token:string):Promise<APIResponse<DogType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${dogsEndpoint}/${id}`)
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

async function getDogsByUserID(id:number, token:string):Promise<APIResponse<DogType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${dogsEndpoint}/user/${id}`)
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

async function uploadImage(token:string, newImage:Partial<ImageType>):Promise<APIResponse<ImageType>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(imagesEndpoint, newImage)
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

async function getAllImages():Promise<APIResponse<ImageType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientNoAuth().get(imagesEndpoint)
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


async function getImagesByClientUserId(id:number, token:string):Promise<APIResponse<ImageType[]>> {
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).get(`${imagesEndpoint}/client/${id}`)
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

async function updateImage(image:Partial<ImageType>, id:number, token:string):Promise<APIResponse<Partial<ImageType>>>{
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).put(`${imagesEndpoint}/${id}`, image)
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

async function uploadToCloudinary(image:Partial<ImageType>, id:number, token:string):Promise<APIResponse<Partial<ImageType>>>{
    let data;
    let error;
    try {
        const response = await apiClientTokenAuth(token).post(`${imagesEndpoint}/${id}`, image)
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


export async function uploadImageToCloudinary(file: File) {
    let data;
    let error;

    const url = "https://api.cloudinary.com/v1_1/djchjozvp/image/upload";

    // const username = import.meta.env.VITE_API_KEY
    // const password = import.meta.env.VITE_API_SECRET

 
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'np97uesu')


        const response = await fetch(url, {
            method: "post",
            body: formData 
        })
        // const response = await apiClientBasicAuth(username, password).post(url, file)
        data = await response.json()
        console.log(data)
        console.log(data.secure_url)
        console.log(data.public_id)
    } catch (err) {
            error = "Something went wrong"       
    } 
    return { data, error }
}

export async function uploadUpdateToCloudinary(file: File, token:string, id:number, desc:string) {
    let data;
    let error;

    const url = "https://api.cloudinary.com/v1_1/djchjozvp/image/upload";

    // const username = import.meta.env.VITE_API_KEY
    // const password = import.meta.env.VITE_API_SECRET

 
    try{
        const formData = new FormData()
        formData.append('file', file)
        formData.append('upload_preset', 'np97uesu')
        console.log('from wrapper:', formData);
        console.log('from wrapper:', file);
        console.log('from wrapper:', id);
        console.log('from wrapper:', desc);


        const response = await fetch(url, {
            method: "post",
            body: formData 
        })
        // const response = await apiClientBasicAuth(username, password).post(url, file)
        data = await response.json()
        console.log(data)
        console.log(data.public_id)

        let image = {
            image_url: data.public_id,
            client_user_id: id,
            description: desc,
        }

        console.log('image in wrapper:', image);

        const response2 = await uploadImage(token, image);

        if (response2.error) {
            console.log(response2.error);
        } else {
            console.log('response2', response2.data);
        }

    } catch (err) {
            error = "Something went wrong"       
    } 
    return { data, error }
}



    



export {
    createDog,
    createEmergencyContact,
    createVeterinarian,
    deleteDog,
    deleteEmergencyContact,
    deleteImage,
    deleteVeterinarian,
    deleteUser,
    editDog,
    editEmergencyContact,
    editUser,
    editVeterinarian,
    getAllImages,
    getAllUsers,
    getDogs,
    getDogById,
    getDogsByUserID,
    getEmergencyContactByUserID,
    getEmergencyContacts,
    getImagesByClientUserId,
    getImageByID,
    getImages,
    getUser,
    getUserById,
    getVeterinarians,
    getVeterinariansByUserID,
    login,
    register,
    updateImage,
    uploadImage,
    uploadToCloudinary,
}