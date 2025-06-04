// Imports layout components that define the page structure.
// <PageBody>: Defines the PageBody component, representing the <body> of the page where all other structures will reside.
// <PageHeader>: Defines the component representing the page header, which should always stay at the top of the page.
// <PageMain>: Contains the main content of the page.
// <PageFooter>: Defines the component representing the page footer.
import { PageBody, PageFooter, PageMain, PageHeader } from "../components/LayoutPage/LayoutPage";
import Image from '../assets/rick-and-morty-31042.png'; // Imports the image to be used on the login page.

import { Button } from "../components/ui/button"; // Imports the <Button> component which renders custom styled buttons.
import { Credits } from "@/components/Credits"; // Imports the <Credits> component for project credits.
import { GoBack } from "@/components/GoBack"; // Imports the <GoBack> component that provides a paragraph with a link to navigate back to a specified page.
import { Label } from "@/components/ui/label"; // Imports the <Label> component used to label form fields and direct to the specified component.
// Imports <Input> and <PasswordInput> components to receive user data.
// <PasswordInput> includes extra features such as toggling password visibility.
import { Input, PasswordInput } from "@/components/ui/input";
// Imports React hooks useEffect and useState.
// useState: Allows creation and management of local states inside the component.
// useEffect: Allows creation of side effects when mounting the component or when a specific value changes.
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom"; // Imports useNavigate hook for programmatic navigation.
import { Spinner } from "@/components/ui/spinner"; // Imports the <Spinner> component which shows a visual loading indicator while an action is in progress.
import { Toaster } from "@/components/ui/toaster"; // Imports the <Toaster> component that manages and displays notifications to the user.
import { toast } from "@/hooks/use-toast"; // Imports the toast function, used to trigger custom notifications in the app.
import { Login } from "@/types/types"; // Imports the Login type for making authentication requests.
import { authenticate } from "@/service/service"; // Imports the authenticate function responsible for sending login data to the backend, authenticating the user, and returning the JWT token.

// Functional component representing the login page
export default function LoginPage() {
    // useState to store the email input by the user.
    const [email, setEmail] = useState<string>('');
    // useState to store the password input by the user.
    const [password, setPassword] = useState<string>('');
    // useState to control the loading indicator.
    const [loading, setLoading] = useState<boolean>(false);
    // useState to store the reference of the field providing error feedback.
    const [inputWarning, setInputWarning] = useState<string>("");
    // useNavigate hook for programmatic route navigation.
    const navigate = useNavigate();

    // Function to handle the submission of the login form.
    // Performs user authentication and handles different error types.
    const handleSubmit = async (e: React.FormEvent) => {
        try {
            // Prevents the default form behavior of reloading the page.
            e.preventDefault();
            // Activates the loading indicator.
            setLoading(true);

            // Checks if email or password is empty, and returns error feedback to the user via toast,
            // and indicates the error location by formatting the input border in red.
            if (email === "") {
                setInputWarning("Email");
                toast({
                    variant: 'destructive',
                    title: 'Email Not Provided',
                    description: 'Email was not provided. Please provide an email to continue.',
                }); 
                return;
            } else if (password === "") {
                setInputWarning("Password");
                toast({
                    variant: 'destructive',
                    title: 'Password Not Provided',
                    description: 'Password was not provided. Please provide a password to continue.',
                });
                return;
            }

            // Calls the authenticate function passing email and password.
            const response = await authenticate({ email, password } as Login);

            // If authentication is successful:
            if (response.success) {
                // Stores the received token in localStorage under the key "authToken".
                localStorage.setItem("authToken", response.data);
                // Redirects the user to the dashboard page since login was successful.
                navigate("/dashboard");
            } else {
                // Handles different error types returned in the response and shows
                // the error message to the user via toast, while setting inputWarning
                // to provide feedback on which field the error occurred.
                if (response.error === "Error: Email Not Provided!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Email Not Provided',
                        description: 'Email was not provided. Please provide an email to continue.',
                    });
                } else if (response.error === "Error: Invalid Email Format!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Email Format',
                        description: 'The email address format entered is invalid. Please check and try again.',
                    });
                } else if (response.error === "Error: Password Not Provided!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Password Not Provided',
                        description: 'Password was not provided. Please provide a password to continue.',
                    });
                } else if (response.error === "Error: Invalid Password Format!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Password Format',
                        description: 'The password format entered is invalid. Provide a password that meets minimum criteria, including at least one uppercase letter, one number, one special character, and a minimum of 8 characters.',
                    });
                } else if (response.error === "Error: Incorrect Email or Password!") {
                    setInputWarning("Email-Password");
                    toast({
                        variant: 'destructive',
                        title: 'Incorrect Email or Password',
                        description: 'The email or password entered is incorrect. Please try again.',
                    });
                } else {
                    // Throws a generic error if none of the previous cases are met.
                    throw new Error("Request failed. Please check your data and try again.");
                }
            }
        } catch (error: any) {
            // In case of error, displays a notification informing that something went wrong.
            toast({
                variant: 'destructive',
                title: "Oh no! Something went wrong.",
                description: "There was a problem with your request. Please try again later!",
            });
            // Logs the error to the console.
            console.error(error);
        } finally {
            // Deactivates the loading indicator regardless of success or failure.
            setLoading(false);
        }
    };

    // useEffect to remove the authentication token when the page loads.
    // Ensures no user is logged in when accessing the login page.
    useEffect(() => {
        const token = localStorage.getItem('authToken');

        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []); // Empty array ensures the effect runs only once when the component mounts.

    return (
        // <PageBody> is the main container wrapping the entire page structure.
        <PageBody>
            {/* <PageHeader> defines the page header with the <GoBack> button to return to the home page. */}
            <PageHeader>
                <GoBack to="home" />
            </PageHeader>

            {/* <PageMain> contains the main page content. */}
            <PageMain>
                {/* 
                    Displays the image responsively.
                    hidden: Component is hidden by default (display: none).
                    lg:block: On screens larger than 1024px, the component becomes visible,
                    necessary because on screens larger than 1024px the layout has two columns.
                */}
                <div className="hidden lg:block">
                    <img 
                        src={Image}
                        className="px-[4vw]" // Sets horizontal padding of 4vw.
                    />
                </div>
                {/* 
                    Container for form elements and image for smaller screens.
                    grid: Defines the container as a grid display to organize child elements in rows and columns.
                    place-items-center: Centers items both horizontally and vertically inside the grid.
                    items-start: Aligns items at the start of the cross axis.
                    gap-5: Sets a spacing of 5 units between grid items.
                    xxs:gap-8: On screens wider than 390px, sets spacing of 8 units between grid items.
                    xs:gap-5: On screens wider than 450px, resets spacing back to 5 units.
                    mx-[6.8vw]: Sets horizontal margin of 6.8vw on both sides.
                    mb-[4vw]: Sets bottom margin of 4vw.
                */}
                <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] mb-[4vw]">
                    {/* 
                        Shows the image only on screens less than 1024px.
                        Since it’s inside the same container as the rest, the image renders in the same column,
                        unlike the one outside that only appears on larger screens.
                    */}
                    <div className="lg:hidden">
                        <img 
                            src={Image}
                            className="px-[13vw] xxs:px-[8vw] xs:px-[20vw]" // Adjusts horizontal padding depending on screen size.
                        />
                    </div>
                    {/* Form container */}
                    <form
                        onSubmit={handleSubmit} // Handles form submission.
                        className="w-full max-w-[30rem] rounded-lg border border-gray-200 bg-white px-6 py-5 dark:border-gray-700 dark:bg-gray-800"
                    >
                        {/* Title */}
                        <h1 className="mb-4 text-2xl font-bold text-gray-800 dark:text-white">
                            Sign in
                        </h1>
                        {/* Email label and input */}
                        <Label htmlFor="email">Email</Label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Enter your email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className={inputWarning === "Email" || inputWarning === "Email-Password" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                        />
                        {/* Password label and input */}
                        <Label htmlFor="password" className="mt-4">
                            Password
                        </Label>
                        <PasswordInput
                            id="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className={inputWarning === "Password" || inputWarning === "Email-Password" ? "border-red-500 focus:border-red-500 focus:ring-red-500" : ""}
                        />
                        {/* Submit button */}
                        <Button type="submit" className="mt-5 w-full" disabled={loading}>
                            {loading ? <Spinner size="small" /> : "Sign In"}
                        </Button>
                    </form>
                </div>
            </PageMain>

            {/* <PageFooter> contains the page footer with credits */}
            <PageFooter>
                <Credits />
            </PageFooter>

            {/* <Toaster> component responsible for rendering toast notifications */}
            <Toaster />
        </PageBody>
    );
}
