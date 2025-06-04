import * as React from "react";
import { cn } from "@/lib/utils";
import { Eye, EyeOff } from "lucide-react";

export interface InputProps extends React.InputHTMLAttributes<HTMLInputElement> {}

const Input = React.forwardRef<HTMLInputElement, InputProps>(({ className, type, ...props }, ref) => {
  return (
    <input
      type={type}
      className={cn(
        "flex h-10 w-full rounded-md border border-2 border-[#bfbfbf] bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus:border-3 focus:border-[#707070] hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
        className
      )}
      ref={ref}
      {...props}
    />
  );
});
Input.displayName = "Input";

// The <IntegratedInput> component is a custom input that has the same properties as <Input>
// but with some small adjustments.
const IntegratedInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        /*
          rounded-l-md: Rounds the left corners with medium radius.
          border-t-2: Sets the top border thickness to 2px.
          border-b-2: Sets the bottom border thickness to 2px.
          border-l-2: Sets the left border thickness to 2px.
          border-r-1: Sets the right border thickness to 1px.
          border-[#bfbfbf]: Sets border color to a shade of gray.
          focus:border-[#707070]: On focus, border color changes to darker gray.
          hover:border-[#707070]: On hover, border color changes to darker gray.
        */
        className={cn(
          "flex h-10 w-full border rounded-l-md border-t-2 border-b-2 border-l-2 border-r-1 border-[#bfbfbf] bg-transparent px-3 py-1 xxs5:px-3 xxs5:py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none hover:border-[#707070] disabled:cursor-not-allowed disabled:opacity-50",
          className
        )}
        ref={ref}
        {...props}
      />
    );
  }
);
// Sets the component's displayName to make it easier to identify in dev tools.
IntegratedInput.displayName = "IntegratedInput";


// The <PasswordInput> component is a specialized input for passwords,
// allowing toggling the visibility of the content.
const PasswordInput = React.forwardRef<HTMLInputElement, InputProps>(
  ({ className, ...props }, ref) => {
    // Creates a state "show" to control if the password is visible or hidden.
    const [show, setShow] = React.useState<boolean>(true);

    return (
      // Combines <IntegratedInput> with a Button, styled to look like a single element.
      <div className="flex w-full select-none">
        {/*
          Renders <IntegratedInput> reusing its styles.
          Input type is conditionally defined: "text" if "show" is true, otherwise "password".
          The placeholder also changes based on the state to give the user a visual hint.
        */}
        <IntegratedInput
          className={className}
          type={show ? "text" : "password"}
          placeholder={show ? "Abc1234#" : "********"}
          ref={ref}
          {...props}
        />
        {/*
          grid: Sets the element as a grid container.
          place-items-center: Centers items both vertically and horizontally.
          items-center: Vertically centers items.
          text-[#bfbfbf]: Sets text color to light gray.
          hover:text-[#707070]: On hover, changes text color to darker gray.
          h-10: Sets height to 10.
          border: Adds border to the element.
          rounded-r-md: Rounds the right corners.
          rounded-l-none: Removes rounding on the left corners.
          border-t-2, border-b-2, border-r-2, border-l-1: Sets individual border thicknesses.
          border-[#bfbfbf]: Sets border color to light gray.
          hover:border-[#707070]: On hover, sets border color to darker gray.
          hover:border-r-2: On hover, right border thickness becomes 2.
        */}
        <div
          className={cn(
            "grid place-items-center items-center text-[#bfbfbf] hover:text-[#707070] h-10 border rounded-r-md rounded-l-none border-t-2 border-b-2 border-r-2 border-l-1 border-[#bfbfbf] bg-transparent px-2 py-1 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground hover:border-[#707070] hover:border-r-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          // On click, toggles the "show" state between true and false.
          onClick={() => setShow(!show)}
        >
          {/*
            Conditionally renders an icon:
            If "show" is true, shows the <Eye> icon.
            Otherwise, shows the <EyeOff> icon.
            Both icons have classes for size and responsiveness.
          */}
          {
            show ? 
            <Eye className="w-4 lg:w-5 h-auto xxs5:w-auto p-0" /> :
            <EyeOff className="w-4 lg:w-5 h-auto p-0" />
          }
        </div>
      </div>
    );
  }
);
// Sets the displayName to make it easier to identify in dev tools.
PasswordInput.displayName = "PasswordInput";

export { Input, IntegratedInput, PasswordInput };
