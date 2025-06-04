import { Link } from "react-router-dom"; // Imports the <Link> component used for client-side navigation without reloading the page.

// Defines the <GoBack> component used to navigate back to a route.
// It receives the "to" property of type string, which specifies where the user will be redirected.
export function GoBack({ to }: { to: string }) {

    return (
        // The <nav> component is used to wrap navigation links.
        // flex: Uses Flexbox to organize layout and align components.
        // justify-start: Aligns items to the start of the flex container.
        // mx-5: Adds horizontal margin of 5 units to both sides.
        // my-3: Adds vertical margin of 3 units to both sides.
        <nav className="flex justify-start mx-5 my-3">
            {/* 
                The <Link> component is responsible for navigating the user.
                The 'to' prop defines the target route and receives the value from the "to" prop.
            */}
            <Link to={`/${to}`}>
                {/* text-p-responsive: class created in the tailwind.config.js file to enable responsive <p> tags. */}
                <p className="text-p-responsive">
                    Go back
                </p>
            </Link>
        </nav>
    );
}
