// Imports the <Credits> component created for the project.
import { Credits } from "@/components/Credits";

// Imports layout components that define the page structure.
// <PageBody>: Represents the <body> of the page where all other components will be rendered.
// <PageHeader>: Represents the topmost header of the page.
// <PageMainSingleColumn>: Similar to <PageContent> but always uses a single column regardless of screen size.
// <PageFooter>: Represents the footer of the page.
import { PageBody, PageMainSingleColumn, PageFooter, PageHeader } from "@/components/LayoutPage/LayoutPage";

// Imports the <GoBack> component that renders a paragraph with a link to return to a specified page
import { GoBack } from "@/components/GoBack";

// Functional component that represents the "Page Not Found" screen
export default function PageNotFound() {

    return (
        // Defines the main structure of the page using the PageBody component
        <PageBody>
            {/* Page header */}
            <PageHeader>
                {/* Back button/link that redirects to the "/home" route */}
                <GoBack to="home" />
            </PageHeader>

            {/* Central content area with a single-column layout */}
            <PageMainSingleColumn>
                {/* 
                    Div that centers the content, text, and applies horizontal margins.
                    grid: Sets the container as a CSS grid layout.
                    place-items-center: Centers the items both horizontally and vertically.
                    text-center: Horizontally centers the text.
                    mx-[13vw]: Adds horizontal margin of 13vw on both sides.
                */}
                <div className="grid place-items-center text-center mx-[13vw]">
                    <div>
                        {/* Main title informing the user the page wasn't found */}
                        <h1 className="text-xl font-semibold">
                            Page Not Found!
                        </h1>
                    </div>
                    <div>
                        {/* Explanation message for the user */}
                        {/* text-p-responsive: class created in tailwind.config.js for responsive <p> elements */}
                        <p className="text-p-responsive">
                            The page you are looking for does not exist. It may have been moved or deleted.
                        </p>
                    </div>
                </div>
            </PageMainSingleColumn>

            {/* Page footer */}
            <PageFooter>
                {/* Displays project credits */}
                <Credits />
            </PageFooter>
        </PageBody>
    );
}
