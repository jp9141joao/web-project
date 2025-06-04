// Import layout components that define the page structure.
// <PageBody>: Represents the <body> of the page where all other structures will be.
// <PageHeader>: Represents the page header and remains at the top.
// <PageMainSingleColumn>: Same as <PageMain> but always with a single column regardless of screen size.
// <PageFooter>: Represents the page footer.
import { PageBody, PageFooter, PageMainSingleColumn, PageHeader } from "../components/LayoutPage/LayoutPage";

import { Check, ChevronDown, Menu, MoveRight } from "lucide-react"; // Icons from "lucide-react" for UI elements.
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"; // Dropdown menu components.
import { useEffect, useState } from "react"; // React hooks for state and side effects.
import { Button } from "@/components/ui/button"; // Custom-styled <Button> component.
import { Sheet, SheetContent, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"; // "Drawer" or sidebar panel components.
import { Input, PasswordInput } from "@/components/ui/input"; 
// <Input>: Standard text input.
// <PasswordInput>: Password input with visibility toggle.
import { Info, Filter, Navigation, Character, User } from "@/types/types"; 
// Data types for the application:
// Info: Structure for updating user information.
// Filter: Structure for filtering characters.
// Navigation: Structure for API page navigation.
// Character: Structure for character data from the API.
// User: Structure for user data.
import { toast } from "@/hooks/use-toast"; // Function to show custom notifications.
import { Toaster } from "@/components/ui/toaster"; // Component that manages and displays notifications.
import { getUser, updateInfo } from "@/service/service"; 
// Functions to fetch and update user information from the backend.
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"; // Card components for displaying data.
import { Label } from "@/components/ui/label"; // <Label> component for form fields.
import { Pagination, PaginationContent, PaginationItem, PaginationNext, PaginationPrevious } from "@/components/ui/pagination"; // Pagination components.
import { Spinner } from "@/components/ui/spinner"; // <Spinner> component to show a loading indicator.
import { Credits } from "@/components/Credits"; // Credits component.

export default function Overview() {
    // State to store user data.
    const [user, setUser] = useState<User>();
    // State to store the user's full name.
    const [fullName, setFullName] = useState<string>();
    // State to store the user's email.
    const [email, setEmail] = useState<string>();
    // State to control whether the submit button is disabled.
    const [disableButton, setDisableButton] = useState<boolean>(false);
    // State to store the current password input.
    const [password, setPassword] = useState<string>('');
    // State to store the new password input.
    const [newPassword, setNewPassword] = useState<string>('');
    // State to control the loading indicator.
    const [isLoading, setIsLoading] = useState<boolean>(false);
    // State to store which input field should show error feedback.
    const [inputWarning, setInputWarning] = useState<string>('');
    // State to store the content displayed in the sidebar.
    const [content, setContent] = useState<string>('Menu');
    // State to store the filter applied to the character list.
    const [filter, setFilter] = useState<Filter>({ by: 'Filter', value: '' });
    // State to store the list of characters fetched from the API.
    const [characters, setCharacters] = useState<Character[]>([]);
    // State to store the currently selected filter item.
    const [selectedItem, setSelectedItem] = useState<string>('Filter');
    // State to store the current page number in the character list.
    const [pageNumber, setPageNumber] = useState<number>(1);
    // State to store whether the dropdown is open or closed.
    const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
    // State to store navigation info for previous/next pages.
    const [navigation, setNavigation] = useState<Navigation>({ previous: null, next: '' });
    // Array of filter options.
    const filterOptions: string[] = ['Name', 'Status', 'Species', 'Gender', 'Location'];
    // API URL incorporating the current page number.
    const apiUrl = `https://rickandmortyapi.com/api/character?page=${pageNumber}`;

    // Function to handle updating user information.
    const handleUpdateInfo = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await updateInfo({ fullName, email, operation: "Info" } as Info);
            if (response.success) {
                loadUser();
                setDisableButton(true);
                toast({
                    variant: 'success',
                    title: 'Information Updated!',
                    description: 'Your information was updated successfully.',
                });
            } else {
                if (response.error == "Error: Full Name Not Provided!") {
                    setInputWarning("Name");
                    toast({
                        variant: 'destructive',
                        title: 'Full Name Not Provided',
                        description: 'Please provide a full name to continue.',
                    });
                } else if (response.error == "Error: Invalid Full Name Format!") {
                    setInputWarning("Name");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Full Name Format',
                        description: 'Full name must contain only letters and spaces.',
                    });
                } else if (response.error == "Error: Full Name Too Long!") {
                    setInputWarning("Name");
                    toast({
                        variant: 'destructive',
                        title: 'Full Name Too Long',
                        description: 'Please enter a shorter full name.',
                    });
                } else if (response.error == "Error: Email Not Provided!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Email Not Provided',
                        description: 'Please provide an email to continue.',
                    });
                } else if (response.error == "Error: Invalid Email Format!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Email Format',
                        description: 'The email format is invalid. Please verify and try again.',
                    });
                } else if (response.error == "Error: Email Too Long!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Email Too Long',
                        description: 'Please enter a shorter email.',
                    });
                } else if (response.error == "Error: Email Already Registered!") {
                    setInputWarning("Email");
                    toast({
                        variant: 'destructive',
                        title: 'Email Already Registered',
                        description: 'The email you entered is already in use. Please use a different email.',
                    });
                } else if (response.error == "Error: Password Not Provided!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Password Not Provided',
                        description: 'Please provide a password to continue.',
                    });
                } else if (response.error == "Error: Invalid Password Format!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Password Format',
                        description: 'Password must have at least one uppercase letter, one number, one special character, and be at least 8 characters long.',
                    });
                } else if (response.error == "Error: Incorrect Password!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Incorrect Password',
                        description: 'The password you entered is incorrect. Please try again.',
                    });
                } else if (response.error == "Error: New Password Not Provided!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Not Provided',
                        description: 'Please provide a new password to continue.',
                    });
                } else if (response.error == "Error: Invalid New Password Format!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid New Password Format',
                        description: 'New password must have at least one uppercase letter, one number, one special character, and be at least 8 characters long.',
                    });
                } else if (response.error == "Error: New Password Too Short!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Too Short',
                        description: 'Your new password is too short. Please enter a password with at least 8 characters.',
                    });
                } else if (response.error == "Error: New Password Too Long!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Too Long',
                        description: 'Your new password is too long. Please enter a shorter password.',
                    });
                } else if (response.error == "Error: New Password Same as Old!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Same as Old',
                        description: 'The new password cannot be the same as the old password. Please choose a different password.',
                    });
                } else {
                    throw new Error("Request failed. Please check your data and try again.");
                }
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Oh no! Something went wrong.",
                description: "There was a problem processing your request. Try again later.",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to handle updating the user's password.
    const handleChangePassword = async (e: React.FormEvent) => {
        try {
            e.preventDefault();
            setIsLoading(true);

            const response = await updateInfo({ password, newPassword, operation: "Password" } as Info);
            if (response.success) {
                loadUser();
                setPassword("");
                setNewPassword("");
                toast({
                    variant: 'success',
                    title: 'Password Changed!',
                    description: 'Your password was changed successfully. Use your new password to log in.',
                });
            } else {
                if (response.error == "Error: Password Not Provided!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Password Not Provided',
                        description: 'Please provide your current password to continue.',
                    });
                } else if (response.error == "Error: Invalid Password Format!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid Password Format',
                        description: 'Password must have at least one uppercase letter, one number, one special character, and be at least 8 characters long.',
                    });
                } else if (response.error == "Error: Incorrect Password!") {
                    setInputWarning("Password");
                    toast({
                        variant: 'destructive',
                        title: 'Incorrect Password',
                        description: 'The password you entered does not match your account password. Please try again.',
                    });
                } else if (response.error == "Error: New Password Not Provided!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Not Provided',
                        description: 'Please provide a new password to continue.',
                    });
                } else if (response.error == "Error: Invalid New Password Format!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'Invalid New Password Format',
                        description: 'New password must have at least one uppercase letter, one number, one special character, and be at least 8 characters long.',
                    });
                } else if (response.error == "Error: New Password Too Long!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Too Long',
                        description: 'Your new password is too long. Please enter a shorter password.',
                    });
                } else if (response.error == "Error: New Password Same as Old!") {
                    setInputWarning("New-Password");
                    toast({
                        variant: 'destructive',
                        title: 'New Password Same as Old',
                        description: 'The new password cannot be the same as the current password. Please choose a different password.',
                    });
                } else {
                    throw new Error("Request failed. Please check your data and try again.");
                }
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Oh no! Something went wrong.",
                description: "There was a problem processing your request. Try again later.",
            });
            console.error(error);
        } finally {
            setIsLoading(false);
        }
    };

    // Function to log out the user.
    const handleLogout = () => {
        localStorage.removeItem("authToken");
        window.location.reload();
    };

    // Function to load user data from the backend.
    const loadUser = async () => {
        try {
            const response = await getUser();
            if (response.success) {
                setUser(response.data);
                setFullName(response.data.fullName);
                setEmail(response.data.email);
            } else {
                throw new Error("Request failed. Please check your data and try again.");
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Oh no! Something went wrong.",
                description: "There was a problem processing your request. Try again later.",
            });
            console.error(error);
        }
    };

    // Function to load characters from the API.
    const loadCharacters = async () => {
        try {
            const response = await fetch(apiUrl).then(res => res.json());
            if (response.results.length > 0) {
                let formattedCharacters: Character[] = response.results.map((charData: any) => {
                    return {
                        id: charData.id,
                        name: charData.name,
                        status:
                            charData.status == "Alive" ? "Alive" :
                            charData.status == "Dead" ? "Dead" :
                            "Unknown",
                        species: charData.species == "unknown" ? "Unknown" : charData.species,
                        gender:
                            charData.gender == "Female" ? "Female" :
                            charData.gender == "Male" ? "Male" :
                            "Unknown",
                        location: charData.location.name == "unknown" ? "Unknown" : charData.location.name,
                        image: charData.image
                    };
                });

                setNavigation({
                    previous: response.info.prev,
                    next: response.info.next
                });

                setCharacters(formattedCharacters);
            } else {
                throw new Error("Request failed. Please check your data and try again.");
            }
        } catch (error: any) {
            toast({
                variant: 'destructive',
                title: "Oh no! Something went wrong.",
                description: "There was a problem fetching characters. Try again later.",
            });
            console.error(error);
        }
    };

    // Enable or disable the submit button based on input changes.
    useEffect(() => {
        if (user) {
            if (((fullName != user.fullName || email != user.email) && (fullName != "" && email != "")) || (password != "" && newPassword != "")) {
                setDisableButton(false);
            } else {
                setDisableButton(true);
            }
        }
    }, [fullName, email, password, newPassword]);

    // Load characters whenever the API URL changes (page navigation).
    useEffect(() => {
        loadCharacters();
    }, [apiUrl]);

    // Load user info when the component mounts.
    useEffect(() => {
        loadUser();
    }, []);

    return (
        <PageBody>
            <PageHeader>
                <nav className="flex justify-between items-center xxs:text-lg xl:text-xl mx-5 my-3">
                    <div className="flex justify-center items-center gap-2">
                        <h1 className="font-semibold text-[5vw] xs:text-[3.5vw] sm:text-[3vw] lg:text-[1.6vw] xl:text-xl break-all">
                            Hello, { user?.fullName.split(' ')[0] }! 👋
                        </h1>
                    </div>
                    <div>
                        <Sheet
                            onOpenChange={(open) => {
                                if (!open) {
                                    setPassword("");
                                    setNewPassword("");
                                    setInputWarning("");
                                    setContent("Menu");
                                }
                            }}
                        >
                            <SheetTrigger className="ml-20" asChild>
                                <Menu className="cursor-pointer" />
                            </SheetTrigger>
                            <SheetContent>
                                <SheetHeader className="grid place-items-center">
                                    <SheetTitle className="text-xl ml-3 mt-3">
                                        {
                                            content == "Menu" ? "Menu" :
                                            content == "Change-Info" ? "Change Information" :
                                            content == "Change-Password" ? "Change Password" :
                                            null
                                        }
                                    </SheetTitle>
                                </SheetHeader>
                                <div className="grid gap-2 mt-3">
                                    {
                                        content == "Menu" ?
                                        <>
                                            <div onClick={() => setContent("Change-Info")}>
                                                <p className="text-lg hover:-translate-y-1 transition-all">
                                                    Change Information
                                                </p>
                                            </div>
                                            <div onClick={() => setContent("Change-Password")}>
                                                <p className="text-lg hover:-translate-y-1 transition-all">
                                                    Change Password
                                                </p>
                                            </div>
                                            <div className="flex gap-1 hover:translate-x-2 transition-all" onClick={handleLogout}>
                                                <p className="text-lg">
                                                    <strong>
                                                        Logout
                                                    </strong>
                                                </p>
                                                <MoveRight className="mt-1" />
                                            </div>
                                        </> :
                                        content == "Change-Password" ?
                                        <>
                                            <div className="grid items-center gap-1">
                                                <Label htmlFor="password">
                                                    Current Password
                                                </Label>
                                                <PasswordInput
                                                    id="password"
                                                    placeholder="Your password"
                                                    value={password}
                                                    onChange={(e) => setPassword(e.target.value)}
                                                    className={inputWarning == "Password" ? "border-red-500" : ""}
                                                    onClick={() => setInputWarning("")}
                                                />
                                            </div>
                                            <div className="grid items-center gap-1">
                                                <Label htmlFor="new-password">
                                                    New Password
                                                </Label>
                                                <PasswordInput
                                                    id="new-password"
                                                    placeholder="Your new password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className={inputWarning == "New-Password" ? "border-red-500" : ""}
                                                    onClick={() => setInputWarning("")}
                                                />
                                            </div>
                                        </> :
                                        content == "Change-Info" ?
                                        <>
                                            <div>
                                                <Label htmlFor="full-name">
                                                    Full Name
                                                </Label>
                                                <Input
                                                    id="full-name"
                                                    placeholder="Your full name"
                                                    value={fullName}
                                                    onChange={(e) => setFullName(e.target.value)}
                                                    className={inputWarning == "Name" ? "border-red-500" : ""}
                                                    onClick={() => setInputWarning("")}
                                                />
                                            </div>
                                            <div>
                                                <Label htmlFor="email">
                                                    Email
                                                </Label>
                                                <Input
                                                    id="email"
                                                    placeholder="name@example.com"
                                                    value={email}
                                                    onChange={(e) => setEmail(e.target.value)}
                                                    className={inputWarning == "Email" ? "border-red-500" : ""}
                                                    onClick={() => setInputWarning("")}
                                                />
                                            </div>
                                        </> : null
                                    }
                                </div>
                                {
                                    content != "Menu" && content != "" ?
                                    <div className="grid gap-2 w-full mt-3">
                                        <Button
                                            className="w-full"
                                            type="button"
                                            disabled={disableButton}
                                            onClick={
                                                content == "Change-Password" ?
                                                handleChangePassword :
                                                handleUpdateInfo
                                            }
                                        >
                                            {
                                                isLoading ?
                                                <Spinner /> :
                                                "Submit"
                                            }
                                        </Button>
                                        <Button
                                            variant={"outline"}
                                            className="w-full"
                                            type="button"
                                            onClick={() => {
                                                setFullName("");
                                                setEmail("");
                                                setPassword("");
                                                setNewPassword("");
                                                setContent("Menu");
                                            }}
                                        >
                                            Back
                                        </Button>
                                    </div> : null
                                }
                                <SheetFooter className="absolute bottom-0">
                                    <Credits />
                                </SheetFooter>
                            </SheetContent>
                        </Sheet>
                    </div>
                </nav>
            </PageHeader>
            <PageMainSingleColumn className="place-items-start px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">
                <div className="w-full">
                    <div className="flex gap-2 pt-[8vw]">
                        <Input
                            placeholder={filter.by == "Filter" ? "Select a category for filter" : `Filter character`}
                            className="w-full"
                            value={filter.by == "Filter" ? '' : filter.value}
                            onChange={(e) => setFilter(
                                { ...filter, value: e.target.value }
                            )}
                            onClick={() => {
                                filter.by == "Filter" ?
                                setIsDropdownOpen(true) : null
                            }}
                        />
                        <DropdownMenu
                            open={isDropdownOpen}
                            onOpenChange={(open) => setIsDropdownOpen(open)}
                        >
                            <DropdownMenuTrigger asChild>
                                <Button className="h-10 ml-auto">
                                    <p>
                                        { selectedItem }
                                    </p>
                                    <ChevronDown />
                                </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                                <DropdownMenuGroup>
                                    {
                                        filterOptions.map((item: string, index: number) => (
                                            <DropdownMenuItem
                                                key={index}
                                                className="flex justify-end"
                                                onClick={() => {
                                                    if (selectedItem == item) {
                                                        setSelectedItem("Filter");
                                                        setFilter(
                                                            { by: "Filter", value: "" }
                                                        );
                                                    } else {
                                                        setSelectedItem(item);
                                                        setFilter(
                                                            { ...filter, by: item }
                                                        );
                                                    }
                                                }}
                                            >
                                                {
                                                    selectedItem == item ?
                                                    <Check className="mt-0.5" /> : null
                                                }
                                                { item }
                                            </DropdownMenuItem>
                                        ))
                                    }
                                </DropdownMenuGroup>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </div>
                    <div className="grid place-items-center items-start xs:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 lg:gap-8 mt-6">
                        {
                            (() => {
                                const data = characters.map((character: Character) => {
                                    const key = filter.by.toLowerCase() as keyof Character;
                                    return (
                                        filter.by === "Filter" ||
                                        (filter.by !== "Filter" &&
                                        character[key].toLowerCase().includes(filter.value.toLowerCase())
                                        ) ? (
                                        <Card key={character.id} className="hover:-translate-y-3 transition-all">
                                            <CardHeader>
                                                <CardTitle>
                                                    {character.name}
                                                </CardTitle>
                                                <CardDescription>
                                                    <p className="xs:grid text-sm font-medium leading-none">
                                                        Last Location:
                                                        <span className="ml-1 break-words underline">
                                                            {
                                                                character.location !== "Unknown" ? character.location : "Unknown"
                                                            }
                                                        </span>
                                                    </p>
                                                </CardDescription>
                                            </CardHeader>
                                            <CardContent className="relative bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] rounded-lg">
                                                <div>
                                                    <img
                                                        className="rounded-lg"
                                                        src={character.image}
                                                    />
                                                </div>
                                                <div className="rounded-lg text-center">
                                                    <p className="text-xl lg:text-lg text-white font-semibold lg:my-1 lg:leading-[1.1]">
                                                        { character.species }
                                                    </p>
                                                </div>
                                                <div
                                                    className={`${
                                                        ["Alive"].includes(character.status) ? "bg-green-600" :
                                                        ["Dead"].includes(character.status) ? "bg-red-500" :
                                                        "bg-[#707070]"
                                                    } font-semibold px-5 py-0.5 rounded-r-lg absolute top-0 mt-4 text-white`}
                                                >
                                                    <p className="text-center">
                                                        { character.status }
                                                    </p>
                                                </div>
                                            </CardContent>
                                        </Card>
                                        ) : null
                                    );
                                });
                                const validData = data.filter((item) => item !== null);
                                return validData.length > 0 ? validData : (
                                    <p className="text-p-responsive text-center absolute px-[13.3vw] xxs:px-[14.8vw] lg:px-[20vw]">
                                        No characters were returned on this page!
                                    </p>
                                );
                            })()
                        }
                    </div>
                </div>
                <Toaster />
            </PageMainSingleColumn>
            <PageFooter className="px-[13.3vw] xxs:px-[14.8vw] lg:px-[25.4vw] text-center mt-6">
                <Pagination>
                    <PaginationContent>
                        <PaginationItem
                            className={navigation.previous == null ? "opacity-50" : ""}
                            onClick={() => {
                                if (navigation.previous != null) {
                                    setPageNumber(pageNumber - 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } else {
                                    toast({
                                        variant: 'destructive',
                                        title: "You're on the first page!",
                                        description: "Cannot go back, you are already on the first page.",
                                    });
                                }
                            }}
                        >
                            <PaginationPrevious />
                        </PaginationItem>
                        <PaginationItem className="text-sm font-semibold text-gray-900">
                            Page { pageNumber }
                        </PaginationItem>
                        <PaginationItem
                            className={navigation.next == null ? "opacity-50" : ""}
                            onClick={() => {
                                if (navigation.next != null) {
                                    setPageNumber(pageNumber + 1);
                                    window.scrollTo({ top: 0, behavior: "smooth" });
                                } else {
                                    toast({
                                        variant: 'destructive',
                                        title: "You're on the last page!",
                                        description: "Cannot advance, you are already on the last page.",
                                    });
                                }
                            }}
                        >
                            <PaginationNext />
                        </PaginationItem>
                    </PaginationContent>
                </Pagination>
            </PageFooter>
        </PageBody>
    );
}
