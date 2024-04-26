export type UserFormDataType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password?: string;
  };

export type UserType = {
    first_name: string;
    last_name: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: number;
    email: string;
    token: string;
    phone_number: string;
    private_notes?: string;
    password: string;
    user_id: number;
    is_admin: boolean | null;
  };

export type LogInFormDataType = {
    email: string;
    password: string;
};

export type EmergencyContactType = {
    ec_id: number,
    first_name: string;
    last_name: string;
    phone_number: string;
    email: string;
    user_id: number;
};


export type DogType = {
    dog_id?: number | undefined;
    name?: string;
    breed?: string;
    birthday?: string;
    sex?: string;
    altered?: boolean;
    health_conditions?: string;
    medications?: string;
    allergies?: string;
    private_notes?: string;
    bn_favorite_activities?: string;
    bn_issues?: string;
    profile_pic_url?: string;
    feeding_schedule?: string;
    potty_schedule?: string;
    crated?: boolean;
    daily_updates?: boolean;
    user_id?: number;
}

export type VeterinarianType = {
    name: string;
    clinic: string;
    street1: string;
    street2: string;
    city: string;
    state: string;
    zip: number;
    email: string;
    phone_number: string;
    user_id: number;
}

export type ImageType = {
    image_id: number;
    image_url: string;
    client_user_id: number;
    description: string;
}

export type CategoryType = 'primary' | 'secondary' | 'success' | 'danger' | 'warning' | 'info' | 'light' | 'dark'