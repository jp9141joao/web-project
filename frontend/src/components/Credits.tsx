// The <Credits> component is a function that returns a footer with credits,
// and when clicked, it redirects to my LinkedIn profile.
export const Credits = () => {
    return (
        // Uses a <footer> element to structure the bottom section of the page,
        // clearly indicating it's a footer.
        <footer>
            {/* text-p-responsive: class created in the tailwind.config.js file to make the <p> tag responsive. */}
            <p className="text-p-responsive">
                Created by 

                {/* The <a> tag is used to redirect the user to the link defined in the href. */}
                <a className="underline ml-1" href={"https://www.linkedin.com/in/joaopedrorosadepaula/"}>
                    ©João Pedro R. de Paula
                </a>
            </p>
        </footer>
    );
}
