type UserFormDataType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
    confirm_password: string;
  };

  type UserFormType = {
    first_name: string;
    last_name: string;
    email: string;
    password: string;
  };

  type LogInFormDataType = {
    email: string;
    password: string;
};

  export type { 
    UserFormDataType,
    LogInFormDataType,

};