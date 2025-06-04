// Defines the Login type to be used in the authenticate function in the controller.
export type Login = {
    email: string;
    password: string;
};

// Defines the CreateAccount type to be used in the createAccount function in the controller.
export type CreateAccount = {
    name: string;
    email: string;
    password: string;
};

// Defines the UpdateInfo type to be used in the updateInfo function in the controller.
export type UpdateInfo = {
    name?: string;
    email?: string;
    password?: string;
    newPassword?: string;
    operation: string;
};
