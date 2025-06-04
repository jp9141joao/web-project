import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0",
  {
    variants: {
      variant: {
        default:
          "bg-gradient-to-tr from-[#1a9f9a] to-[#b6c937] text-primary-foreground shadow-lg hover:from-[#178681] hover:to-[#9cb12f]",
          /* 
            bg-gradient-to-tr: Sets a background with a gradient directed toward the top right corner.
            from-[#1a9f9a]: Sets the starting color of the gradient with a bluish tone.
            to-[#b6c937]: Sets the ending color of the gradient with a greenish tone.
            shadow-lg: Applies a large shadow for deeper visual impact, matching the gradient nicely.
            hover:from-[#178681]: When the user hovers over the element, the gradient start color changes to a darker blue.
            hover:to-[#9cb12f]: When the user hovers over the element, the gradient end color changes to a darker green.
          */
        destructive:
          "bg-destructive text-destructive-foreground shadow-sm hover:bg-destructive/90",
        outline:
          "rounded-md border-2 border-[#bfbfbf] bg-transparent px-3 py-1 text-sm hover:bg-gray-200 hover:border-[#707070]",
          /*
            border-2: Applies a border with a width of 2.
            border-[#bfbfbf]: Sets the border color to a gray tone.
            px-3: Adds horizontal padding of size 3.
            py-1: Adds vertical padding of size 1.
            hover:bg-gray-200: On hover, the background changes to a light gray.
            hover:border-[#707070]: On hover, the border color changes to a darker gray tone.
          */
        secondary:
          "bg-secondary text-secondary-foreground shadow-sm hover:bg-secondary/80",
        ghost: "hover:bg-accent hover:text-accent-foreground",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-9 px-4 py-2",
        sm: "h-8 rounded-md px-3 text-xs",
        lg: "h-10 rounded-md px-8",
        xl: "h-10 rounded-md px-12",
        /*
          xl: Defines a new size for the button.
          px-12: Adds horizontal padding of size 12.
        */
        icon: "h-9 w-9",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

export interface ButtonProps
  extends React.ButtonHTMLAttributes<HTMLButtonElement>,
    VariantProps<typeof buttonVariants> {
  asChild?: boolean
}

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, asChild = false, ...props }, ref) => {
    const Comp = asChild ? Slot : "button"
    return (
      <Comp
        className={cn(buttonVariants({ variant, size, className }))}
        ref={ref}
        {...props}
      />
    )
  }
)
Button.displayName = "Button"

export { Button, buttonVariants }
