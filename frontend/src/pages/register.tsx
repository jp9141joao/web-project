// Import layout components that define the structure of the page.
// <PageBody>: Represents the <body> of the page where all other structures will reside.
// <PageHeader>: Represents the page header that should always remain at the top.
// <PageMain>: Contains the main content of the page.
// <PageFooter>: Represents the page footer.
import { PageBody, PageFooter, PageMain, PageHeader } from "../components/LayoutPage/LayoutPage";
import Image from '../assets/rick-and-morty-partying.png'; // Import the image used on the registration page.

// Import the <Button> component, which renders custom-styled buttons.
import { Button } from "../components/ui/button";
// Import the <Credits> component, which displays project credits.
import { Credits } from "@/components/Credits";
// Import the <GoBack> component, which provides a paragraph with a link to navigate back to a specified page.
import { GoBack } from "@/components/GoBack";
// Import the <Label> component, used to label form fields and point to the associated input.
import { Label } from "@/components/ui/label";
// Import the <Input> and <PasswordInput> components for user input.
// <PasswordInput> includes extra functionality, such as toggling password visibility.
import { Input, PasswordInput } from "@/components/ui/input";
// Import React hooks useEffect and useState.
// useState: Allows creation and management of local state within the component.
// useEffect: Allows creation of side effects when the component mounts or when a value changes.
import { useEffect, useState } from "react";
// Import the <Spinner> component, which shows a loading indicator while an action is in progress.
import { Spinner } from "@/components/ui/spinner";
// Import the <Toaster> component, which manages and displays notifications to the user.
import { Toaster } from "@/components/ui/toaster";
// Import the toast function, used to trigger custom notifications in the application.
import { toast } from "@/hooks/use-toast";
// Import the User type for making the registration request.
import { User } from "@/types/types";
// Import the register function, responsible for sending registration data to the backend and creating a new user.
import { register } from "@/service/service";

// Functional component representing the registration page.
export default function Register() {
  // useState to store the full name entered by the user.
  const [fullName, setFullName] = useState<string>('');
  // useState to store the email entered by the user.
  const [email, setEmail] = useState<string>('');
  // useState to store the password entered by the user.
  const [password, setPassword] = useState<string>('');
  // useState to control the loading indicator.
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // useState to store which input field should receive error feedback.
  const [inputWarning, setInputWarning] = useState<string>("");

  // Function to handle registration form submission.
  // Performs user registration and handles different error types.
  const handleSubmit = async (e: React.FormEvent) => {
    try {
      // Prevent the default form behavior of reloading the page.
      e.preventDefault();
      // Activate the loading indicator.
      setIsLoading(true);

      // Check if fullName, email, or password is empty and return an error via toast,
      // highlighting the corresponding input with a red border.
      if (fullName === "") {
        setInputWarning("Name");
        toast({
          variant: 'destructive',
          title: 'Full Name Not Provided',
          description: 'Full name was not provided. Please provide a full name to continue.',
        });
        return;
      } else if (email === "") {
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

      // Call the register function, passing fullName, email, and password.
      const response = await register({ fullName, email, password } as User);

      // If registration is successful:
      if (response.success) {
        // Show a success message indicating the account was created.
        toast({
          variant: 'success',
          title: 'Account Created Successfully!',
          description: 'Welcome! Your account has been created. You can now plan your adventures with us.',
        });

        // Clear the input fields.
        setFullName("");
        setEmail("");
        setPassword("");
      } else {
        // Handle different error types returned in the response and provide feedback via toast,
        // setting inputWarning to indicate which field had an error.
        if (response.error === "Error: Full Name Not Provided!") {
          setInputWarning("Name");
          toast({
            variant: 'destructive',
            title: 'Full Name Not Provided',
            description: 'Full name was not provided. Please provide a full name to continue.',
          });
        } else if (response.error === "Error: Invalid Full Name Format!") {
          setInputWarning("Name");
          toast({
            variant: 'destructive',
            title: 'Invalid Full Name Format',
            description: 'The full name format is invalid. Provide a valid full name containing only letters and spaces.',
          });
        } else if (response.error === "Error: Full Name Too Long!") {
          setInputWarning("Name");
          toast({
            variant: 'destructive',
            title: 'Full Name Too Long',
            description: 'The full name entered is too long. Please enter a shorter full name.',
          });
        } else if (response.error === "Error: Email Not Provided!") {
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
            description: 'The email format is invalid. Check and try again.',
          });
        } else if (response.error === "Error: Email Too Long!") {
          setInputWarning("Email");
          toast({
            variant: 'destructive',
            title: 'Email Too Long',
            description: 'The email entered is too long. Please enter a shorter email.',
          });
        } else if (response.error === "Error: Email Already Registered!") {
          setInputWarning("Email");
          toast({
            variant: 'destructive',
            title: 'Email Already Registered',
            description: 'The email entered is already registered. Please provide a different email.',
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
            description: 'The password format is invalid. Provide a password that meets the minimum criteria, including at least one uppercase letter, one number, one special character, and at least 8 characters long.',
          });
        } else if (response.error === "Error: Password Too Short!") {
          setInputWarning("Password");
          toast({
            variant: 'destructive',
            title: 'Password Too Short',
            description: 'Your password is too short. Please enter a password with at least 8 characters.',
          });
        } else if (response.error === "Error: Password Too Long!") {
          setInputWarning("Password");
          toast({
            variant: 'destructive',
            title: 'Password Too Long',
            description: 'The password entered is too long. Please enter a shorter password.',
          });
        } else {
          // Throw a generic error if none of the above cases match.
          throw new Error("Registration request failed. Please verify the data and try again.");
        }
      }
    } catch (error: any) {
      // In case of an unexpected error, show a notification indicating something went wrong.
      toast({
        variant: 'destructive',
        title: "Oh no! Something went wrong.",
        description: "There was a problem processing your request. Please try again later.",
      });
      console.error(error);
    } finally {
      // Deactivate the loading indicator, regardless of success or failure.
      setIsLoading(false);
    }
  };

  // useEffect to remove any existing authentication token when the page loads.
  // Ensures no user is logged in when accessing the registration page.
  useEffect(() => {
    const token = localStorage.getItem('authToken');
    if (token) {
      localStorage.removeItem('authToken');
    }
  }, []); // The empty array ensures this effect runs only once when the component mounts.

  return (
    // <PageBody> is the main container wrapping the entire page structure.
    <PageBody>
      {/* <PageHeader> defines the header of the page, with the <GoBack> button to return to the login page. */}
      <PageHeader>
        <GoBack to="login" />
      </PageHeader>
      {/* <PageMain> contains the main content of the page. */}
      <PageMain>
        {/*
          Container for the registration form elements.
          grid: Defines the container as a CSS grid, allowing children to be organized into rows and columns.
          place-items-center: Centers items both horizontally and vertically within the grid.
          items-start: Aligns items at the start of the cross axis.
          gap-5: Sets a gap of 5 between grid items.
          xxs:gap-8: On screens wider than 390px, sets the gap to 8.
          xs:gap-5: On screens wider than 450px, resets the gap to 5.
          mx-[6.8vw]: Sets horizontal margin to 6.8vw on each side.
          lg:mb-[4vw]: On screens wider than 1024px, adds a bottom margin of 4vw.
        */}
        <div className="grid place-items-center items-start gap-5 xxs:gap-8 xs:gap-5 mx-[6.8vw] lg:mb-[4vw]">
          {/*
            Registration form.
            onSubmit: When the user clicks the submit-type button, handleSubmit is triggered.
            grid: Defines the container as a CSS grid.
            place-items-center: Centers items both horizontally and vertically.
            items-center: Aligns items at the center along the row axis, reinforcing centering.
            gap-1: Sets a gap of 1 between grid items.
            xxs:gap-2: On screens wider than 390px, sets the gap to 2.
            xs:gap-1: On screens wider than 450px, resets the gap to 1.
            sm:gap-2: On screens wider than 640px, sets the gap to 2.
          */}
          <form onSubmit={handleSubmit} className="grid place-items-center items-center gap-1 xxs:gap-2 xs:gap-1 sm:gap-2">
            {/*
              <div> containing the form title and description.
              text-center: Centers the text horizontally.
              text-gray-900: Sets the text color to a dark gray shade.
            */}
            <div className="text-center text-gray-900">
              {/*
                <h1>: Title with responsive font size and adjusted alignment based on screen size.
                font-semibold: Uses a semibold font weight.
                text-[8.9vw]: Default font size of 8.9vw.
                xxs:text-[10vw]: On screens wider than 390px, sets font size to 10vw.
                xs:text-[7.3vw]: On screens wider than 450px, sets font size to 7.3vw.
                lg:text-[4vw]: On screens wider than 1024px, sets font size to 4vw.
                xl:text-[3.4vw]: On screens wider than 1536px, sets font size to 3.4vw.
                leading-[1.2]: Sets line-height to 1.2, ensuring proper line spacing.
              */}
              <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4vw] xl:text-[3.4vw] leading-[1.2]">
                Join Us!
              </h1>
              {/*
                <p>: Paragraph with responsive font size and alignment.
                xxs:text-lg: On screens wider than 390px, sets font size to "lg".
                xs:text-xl: On screens wider than 450px, sets font size to "xl".
                sm:text-[2.7vw]: On screens wider than 640px, sets font size to 2.7vw.
                lg:text-base: On screens wider than 1024px, sets font size back to "base".
                xl:text-[1.3vw]: On screens wider than 1536px, sets font size to 1.3vw.
                xl:leading-[1.2]: On screens wider than 1536px, sets line-height to 1.2.
              */}
              <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-base xl:text-[1.3vw] xl:leading-[1.2]">
                Create your account and enjoy our features.
              </p>
            </div>
            {/*
              Container for input fields.
              w-full: Input container takes 100% width of its parent.
              grid: Defines container as a CSS grid.
              gap-1: Sets a gap of 1 between grid items.
              xxs:gap-2: On screens wider than 390px, sets the gap to 2.
              xs:gap-1: On screens wider than 450px, resets the gap to 1.
              sm:mt-2: On screens wider than 640px, adds a top margin of 2.
            */}
            <div className="w-full grid gap-1 xxs:gap-2 xs:gap-1 sm:mt-2">
              {/* Full Name Field */}
              <div>
                {/*
                  htmlFor: References the element with the specified id.
                */}
                <Label htmlFor="full-name">
                  Full Name
                </Label>
                <Input
                  // Assign an ID so the Label references this input.
                  id="full-name"
                  // Placeholder text when the input is empty.
                  placeholder="Your full name"
                  // The input value is tied to the fullName state.
                  value={fullName}
                  // Update fullName state when the user types.
                  onChange={(e) => setFullName(e.target.value)}
                  // If inputWarning indicates an error on "Name", add a red border.
                  className={inputWarning === "Name" ? "border-red-500" : ""}
                  // On click, if the input has a red border, reset to the default border.
                  onClick={() => setInputWarning("")}
                />
              </div>
              {/* Email Field */}
              <div>
                {/*
                  htmlFor: References the element with the specified id.
                */}
                <Label htmlFor="email">
                  Email
                </Label>
                <Input
                  // Assign an ID so the Label references this input.
                  id="email"
                  // Placeholder text when the input is empty.
                  placeholder="name@example.com"
                  // The input value is tied to the email state.
                  value={email}
                  // Update email state when the user types.
                  onChange={(e) => setEmail(e.target.value)}
                  // If inputWarning indicates an error on "Email", add a red border.
                  className={inputWarning === "Email" ? "border-red-500" : ""}
                  // On click, if the input has a red border, reset to the default border.
                  onClick={() => setInputWarning("")}
                />
              </div>
              {/* Password Field */}
              <div>
                {/*
                  htmlFor: References the element with the specified id.
                */}
                <Label htmlFor="password">
                  Password
                </Label>
                <PasswordInput
                  // Assign an ID so the Label references this input.
                  id="password"
                  // The input value is tied to the password state.
                  value={password}
                  // Update password state when the user types.
                  onChange={(e) => setPassword(e.target.value)}
                  // If inputWarning indicates an error on "Password", add a red border.
                  className={inputWarning === "Password" ? "border-red-500" : ""}
                  // On click, if the input has a red border, reset to the default border.
                  onClick={() => setInputWarning("")}
                />
              </div>
            </div>
            {/*
              Form submission button.
              w-full: Button takes 100% width of its parent.
              mt-1: Adds a top margin of 1 for spacing.
              xxs:mt-2: On screens wider than 390px, sets top margin to 2.
              xs:mt-1: On screens wider than 450px, resets top margin to 1.
              sm:mt-2: On screens wider than 640px, sets top margin to 2.
            */}
            <div className="w-full mt-1 xxs:mt-2 xs:mt-1 sm:mt-2">
              <Button
                // type="submit": Defines the button as a submit type, triggering the form onSubmit.
                type="submit"
                // w-full: Button takes 100% width of its parent.
                className="w-full"
              >
                {/*
                  Show <Spinner> if loading; otherwise, display "Create".
                */}
                {isLoading ? <Spinner /> : "Create"}
              </Button>
            </div>
            {/* Component to display notifications. */}
            <Toaster />
          </form>
        </div>
        {/*
          Image display.
          my-4: Adds vertical margin of 4 units.
          px-[18vw]: Sets horizontal padding to 18vw.
          xxs:px-[12vw]: On screens wider than 390px, sets horizontal padding to 12vw.
          xs:px-[24vw]: On screens wider than 450px, sets horizontal padding to 24vw.
          sm:px-[26vw]: On screens wider than 640px, sets horizontal padding to 26vw.
          lg:px-[8vw]: On screens wider than 1024px, sets horizontal padding to 8vw.
        */}
        <div>
          <img
            src={Image}
            className="my-4 px-[18vw] xxs:px-[12vw] xs:px-[24vw] sm:px-[26vw] lg:px-[8vw]"
          />
        </div>
      </PageMain>
      {/* <PageFooter> contains the page footer, where the credits are displayed. */}
      <PageFooter>
        <Credits />
      </PageFooter>
    </PageBody>
  );
}
