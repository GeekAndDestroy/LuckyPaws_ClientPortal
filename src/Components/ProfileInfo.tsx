// Assume everything is written with TailwindCSS and DaisyUI
import { useEffect, useState } from 'react';
import { useNavigate,  useParams } from 'react-router-dom';
import { deleteUser, getUser, editUser } from '../lib/apiWrapper';
import { CategoryType, UserType } from '../types';

type ProfileInfoProps = {
    flashMessage: (newMessage: string, category:CategoryType) => void
    currentUser: UserType|null
}

export default function ProfileInfo({ flashMessage, currentUser }: ProfileInfoProps) {
    const navigate = useNavigate();
    const { userId } = useParams();

    const [user, setUser] = useState<Partial<UserType>>({
        user_id: NaN,
        first_name: '',
        last_name: '',
        street1: '',
        street2: '',
        city: '',
        state: '',
        email: '',
        zip: NaN,
        phone_number: NaN
    });

    useEffect( () => {
        const token = currentUser!.token;

        async function getUserInfo(){
            let response = await getUser(token);
            if (response.data){
                const user = response.data;
                const currentUserId = JSON.parse(localStorage.getItem('user_id')!);

                console.log(user);
                if (!currentUser){
                    console.log('No user logged in');
                } else if (user.user_id !== currentUserId){
                    flashMessage('You are not authorized to edit this profile', 'danger');
                    navigate('/');
                } else {
                    setUser({
                        first_name: user.first_name, 
                        last_name: user.last_name, 
                        street1: user.street1, 
                        street2: user.street2, 
                        city: user.city, 
                        state: user.state, 
                        email: user.email, 
                        zip: user.zip, 
                        phone_number: user.phone_number});
                    }
                } else if (response.error){
                    console.log(response.error, token);
                    // flashMessage(response.error, 'danger');
                    navigate('/');
                } else {
                    flashMessage('An error occurred', 'warning');
                    navigate('/');
                }
            }
            getUserInfo();
        } , [userId]);







return (
    <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl m-4 font-bold">User Name</h1>
                <form>
                    <div className="mx-auto w-80 sm:max-w-md md:max-w-3xl flex flex-col gap-5">
                            <input type="text" id="firstName"
                            placeholder="First Name" className="input input-bordered" />
                            <input type="text" id="lastName"
                            placeholder="Last Name" className="input input-bordered" />
                            <input type="text" id="street1"
                            placeholder="Street 1" className="input input-bordered" />
                            <input type="text" id="street2" 
                            placeholder="Street 2"
                            className="input input-bordered" />
                            <input type="text" id="city"
                            placeholder="City" 
                            className="input input-bordered" />
                            <input type="text" id="state" 
                            placeholder="State"
                            className="input input-bordered" />
                            <input type="text" id="zip"
                            placeholder="Zip Code" 
                            className="input input-bordered" />
                            <input type="email" id="email" 
                            placeholder="Email"
                            className="input input-bordered" />
                            <input type="tel" id="phone"
                            placeholder="Phone Number" className="input input-bordered" />
                    </div>
                    <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">Update Profile</button>
                </form>
            </div>
        </div>
    </div>
)
}