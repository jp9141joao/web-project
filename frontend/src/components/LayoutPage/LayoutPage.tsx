// Defines the layout structure of the page with a <navbar>, page content, and <footer>.
// These components receive the { children } prop, allowing other components or elements to be inserted within them.

import { cn } from '@/lib/utils'; // Imports the cn function, which is used to concatenate, manipulate, and combine classes dynamically.
import { useEffect } from 'react';

// Defines the { PageBody } component, which represents the body of the page where all other structures will reside.
export const PageBody = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty('--vh', `${vh}px`);
    };

    setVh();
    window.addEventListener('resize', setVh);
    return () => window.removeEventListener('resize', setVh);
  }, []);

  return (
    // Uses a <div> to wrap the other layout components of the page.
    // flex: Organizes elements using flexbox, making alignment and arrangement easier.
    // min-h-screen: Ensures content occupies at least the full screen height, facilitating implementation of <navbar> and <footer>.
    // flex-col: Stacks elements vertically.
    <div
      className="flex flex-col"
      style={{ height: `calc(var(--vh,1vh)*100)` }}
    >
      {/* Renders the child elements passed to the component */}
      {children}
    </div>
  );
};

// Defines the <PageHeader> component, which represents the top of the page and should always remain at the highest point.
export const PageHeader = ({ children }: { children: React.ReactNode }) => {
  return (
    // Uses a <header> element to structure the top of the page, making it explicit that this is a <header>.
    // w-full: Makes the header span the entire width of the screen.
    // font-semibold: Makes the font of this component and its children semibold.
    // text-gray-900: Sets the text color to a gray shade, with the numeric value defining the intensity.
    <header className="w-full font-semibold text-gray-900">
      {/* Renders the child elements inside the header */}
      {children}
    </header>
  );
};

// Defines the <PageMain> component, which represents the main section of the page with a two-column layout on large screens and a single column on screens narrower than 1024px.
export const PageMain = ({ children }: { children: React.ReactNode }) => {
  return (
    // Creates a flexible container that grows as content increases, always keeping <PageHeader> at the top and <PageFooter> at the bottom.
    <div className="grid flex-grow">
      {/* Defines a grid class with two columns on large screens (lg:grid-cols-2) and one column on smaller screens (implicitly defined by the responsive lg modifier). */}
      {/* place-items-center: Centers items within the grid container. */}
      {/* lg:mx-[5.5vw]: Adds horizontal margin for better spacing on large screens. */}
      <div className="grid lg:grid-cols-2 place-items-center lg:mx-[5.5vw]">
        {/* Renders the child elements inside this section */}
        {children}
      </div>
    </div>
  );
};

// Defines the <PageMainSingleColumn> component, same behavior as <PageMain> but always with a single column regardless of screen size.
export const PageMainSingleColumn = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    // Creates a flexible container that grows as content increases, always keeping <PageHeader> at the top and <PageFooter> at the bottom.
    <div className="grid flex-grow">
      {/* Defines a grid class with one column on all screen sizes. */}
      {/* place-items-center: Centers items within the grid container. */}
      {/* lg:mx-[5.5vw]: Adds horizontal margin for better spacing on large screens. */}
      {/* cn(): Allows concatenating classes, enabling the user to add classes via the optional className prop. */}
      <div className={cn('grid grid-cols-1 place-items-center lg:mx-[5.5vw]', className)}>
        {/* Renders the child elements inside this section */}
        {children}
      </div>
    </div>
  );
};

// Defines the <PageFooter> component, which represents the footer of the page.
export const PageFooter = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => {
  return (
    // Uses the grid class to center elements in the footer.
    // place-items-center: Centers items within the grid container.
    // cn(): Allows concatenating classes, enabling the user to add classes via the optional className prop. 
    <div className={cn('grid place-items-center', className)}>
      {/* Renders the child elements inside the footer */}
      {children}
    </div>
  );
};
