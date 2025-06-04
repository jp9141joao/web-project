// Import layout components that define the page structure.
// <PageBody>: Defines the PageBody component, representing the <body> of the page where all other structures will reside.
// <PageHeader>: Defines the component representing the page header, which should always stay at the top of the page.
// <PageMainSingleColumn>: Has the same properties as <PageMain>,
// but always with a single column regardless of screen size.
// <PageFooter>: Defines the component representing the page footer.
import { PageBody, PageFooter, PageMain, PageHeader } from "../components/LayoutPage/LayoutPage";
import Image from '../assets/Rick-and-morty-desenho-animado-warner-artpoin9-724x1024.png'; // Imports the image to be used on the page.

import { Button } from "../components/ui/button"; // Imports the <Button> component which renders styled custom buttons.
// Imports dialog (modal) components to build interactive interfaces.
// Dialog: Container component managing dialog display.
// DialogContent: Defines main content shown inside the dialog.
// DialogDescription: Provides additional descriptive text inside the dialog, usually for instructions or complementary info.
// DialogHeader: Structures the dialog header, where title and description can be placed.
// DialogTitle: Displays the dialog title.
// DialogTrigger: Component that triggers the dialog to open when activated.
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";

import { Credits } from "@/components/Credits"; // Imports the <Credits> component for project credits.
import { Link } from "react-router-dom"; // Imports <Link> component used for navigation without full page reload.

import { useEffect } from "react"; // Imports useEffect hook to perform side effects on component mount or when values change.

// Functional component representing the home page
export default function Home() {

    // useEffect to handle authentication token on page load,
    // meaning if the user enters the home page and there is a token stored in localStorage,
    // it will log out the user automatically.
    useEffect(() => {
        // Get the stored token from localStorage, if any.
        const token = localStorage.getItem('authToken');

        // If there is a token, remove it to ensure user cannot change route without authenticating.
        if (token) {
            localStorage.removeItem('authToken');
        }
    }, []); // Empty array ensures the effect runs only once on component render.

    return (
        // <PageBody> is the main container wrapping the entire page structure
        <PageBody>
            {/* <PageHeader> defines the page header */}
            <PageHeader>
                {/* 
                    Header with a <header> element including a <nav> for navigation
                    flex: Uses flexbox for layout to easily align and organize components.
                    justify-end: Aligns items to the right horizontally in a flex container.
                    xxs:text-lg: On screens larger than 390px, text size is "lg".
                    xl:text-xl: On screens larger than 1536px, text size is "xl".
                    mx-5: Horizontal margin of 5 units each side.
                    my-3: Vertical margin of 3 units each side.
                */}
                <nav className="flex justify-end xxs:text-lg xl:text-xl mx-5 my-3">
                    {/* Link directing to login page */}
                    <Link to="/login">
                        Login
                    </Link>
                </nav>
            </PageHeader>

            {/* <PageMain> contains the main content of the page */}
            <PageMain>
                {/* 
                    grid: Sets the container as a CSS grid, allowing layout in rows and columns.
                    gap-8: Sets spacing of 8 units between grid items.
                    sm:gap-14: On screens 640px+, spacing increases to 14 units.
                    mx-[6.8vw]: Horizontal margin of 6.8vw each side.
                    xs:mx-[14.2vw]: On screens 450px+, horizontal margin increases to 14.2vw.
                    lg:mx-0: On screens 1024px+, horizontal margin removed, full width used.
                    lg:mb-[10vw]: On screens 1024px+, bottom margin of 10vw for extra spacing.
                */}
                <div className="grid gap-8 sm:gap-14 mx-[6.8vw] xs:mx-[14.2vw] lg:mx-0 lg:mb-[10vw]">
                    {/* 
                        grid: Defines the container as CSS grid.
                        place-items-center: Centers items horizontally and vertically.
                        items-center: Aligns items in the center along the row axis.
                        gap-4: Spacing of 4 units between grid items.
                        lg:gap-6: On screens 1024px+, spacing increases to 6 units.
                    */}
                    <div className="grid place-items-center items-center gap-4 lg:gap-6">
                        {/* 
                            text-center: Centers text horizontally.
                            lg:text-start: On screens 1024px+, aligns text left.
                            text-gray-900: Sets text color to dark gray.
                        */}
                        <div className="text-center lg:text-start text-gray-900">
                            {/* 
                                <h1>: Responsive font size and alignment according to screen size.
                                font-semibold: Applies semi-bold font weight.
                                text-[8.9vw]: Default text size 8.9vw.
                                xxs:text-[10vw]: On screens 390px+, text size 10vw.
                                xs:text-[7.3vw]: On screens 450px+, text size 7.3vw.
                                lg:text-[4.5vw]: On screens 1024px+, text size 4.5vw.
                                leading-[1.2]: Sets line height to 1.2 for proper spacing.
                            */}
                            <h1 className="font-semibold text-[8.9vw] xxs:text-[10vw] xs:text-[7.3vw] lg:text-[4.5vw] leading-[1.2]">
                                Explore the universe of Rick and Morty!
                            </h1>
                            {/* 
                                <p>: Responsive font size and alignment paragraph.
                                xxs:text-lg: On screens 390px+, text size "lg".
                                xs:text-xl: On screens 450px+, text size "xl".
                                sm:text-[2.7vw]: On screens 640px+, text size 2.7vw.
                                lg:text-xl: On screens 1024px+, text size "xl".
                                xl:text-[1.8vw]: On screens 1536px+, text size 1.8vw.
                                xl:leading-[1.2]: On screens 1536px+, line height 1.2.
                                mt-2: Top margin 2 units.
                            */}
                            <p className="xxs:text-lg xs:text-xl sm:text-[2.7vw] lg:text-xl xl:text-[1.8vw] xl:leading-[1.2] mt-2">
                                An interactive experience to explore characters through an API.
                            </p>
                        </div>

                        {/* 
                            Button triggering a dialog to show information about the animation
                            lg:w-full: On screens 1024px+, button width fills parent container.
                        */}
                        <div className="lg:w-full">
                            <Dialog>
                                {/* 
                                    DialogTrigger wraps the button and triggers dialog open on interaction.
                                    hover:-translate-y-1: On hover, moves element slightly upward.
                                    transition-all: Smooth transition for all animatable properties.
                                    asChild: Passes props to the first child, allowing any element to act as trigger.
                                */}
                                <DialogTrigger className="hover:-translate-y-1 transition-all" asChild>
                                    <div>
                                        {/* 
                                            size={"xl"}: Button size extra-large.
                                            xxs:text-lg: On screens 390px+, text size "lg".
                                            text-lg: Default text size "lg".
                                            sm:text-xl: On screens 640px+, text size "xl".
                                            xl:text-xl: On screens 1536px+, text size "xl".
                                            sm:h-12: On screens 640px+, button height 12.
                                            lg:h-10: On screens 1024px+, button height 10.
                                            sm:px-16: On screens 640px+, horizontal padding 16.
                                            xl:h-12: On screens 1536px+, button height 12.
                                            xl:px-18: On screens 1536px+, horizontal padding 18.
                                            shadow-xl: Adds large shadow for depth effect.
                                        */}
                                        <Button 
                                            size={"xl"} 
                                            className="xxs:text-lg text-lg sm:text-xl xl:text-xl sm:h-12 lg:h-10 sm:px-16 xl:h-12 xl:px-18 shadow-xl "
                                        >
                                            About the animation
                                        </Button>
                                    </div>
                                </DialogTrigger>
                                {/* DialogContent contains the content shown when dialog is triggered */}
                                <DialogContent>
                                    <DialogHeader>
                                        <DialogTitle>
                                            About Rick and Morty
                                        </DialogTitle>
                                        {/* 
                                            DialogDescription with a grid organizing explanatory paragraphs
                                            asChild: Passes props to the first child, allowing any element as trigger.
                                        */}
                                        <DialogDescription asChild>
                                            {/* 
                                                grid: Sets container as CSS grid.
                                                gap-3: Spacing of 3 units between items.
                                            */}
                                            <div className="grid gap-3">
                                                <p>
                                                    It is one of the most popular animated series right now. It combines science fiction, dark humor, and social critiques. Created by Justin Roiland and Dan Harmon, the animation premiered in 2013 on Adult Swim and quickly gained fans worldwide.
                                                </p>
                                                <p>
                                                    The animation follows the interdimensional adventures of an eccentric scientist, Rick Sanchez, and his good-hearted but easily influenced grandson, Morty Smith. Their escapades often lead to dangerous, absurd, and hilarious situations.
                                                </p>
                                                <p>
                                                    The series explores various themes such as family dynamics, the meaning of existence, the consequences of technology, and the human condition, all mixed with intelligent writing and sharp satire.
                                                </p>
                                            </div>
                                        </DialogDescription>
                                    </DialogHeader>
                                </DialogContent>
                            </Dialog>
                        </div>
                    </div>

                    {/* 
                        Image showing the Rick and Morty picture
                        w-full: Full width.
                        max-w-[65vw]: Max width 65vw.
                        lg:max-w-[35vw]: On screens 1024px+, max width 35vw.
                        justify-self-center: Centers the image horizontally in the grid cell.
                        rounded-lg: Applies rounded corners.
                        shadow-lg: Adds shadow for visual depth.
                        aspect-auto: Maintains automatic aspect ratio.
                    */}
                    <img
                        src={Image}
                        alt="Rick and Morty cartoon"
                        className="w-full max-w-[65vw] lg:max-w-[35vw] justify-self-center rounded-lg shadow-lg aspect-auto"
                    />
                </div>
            </PageMain>

            {/* Page footer */}
            <PageFooter>
                <Credits />
            </PageFooter>
        </PageBody>
    );
}