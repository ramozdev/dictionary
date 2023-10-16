import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const button = cva(
  `group
inline-flex
select-none
items-center
justify-center
leading-none
rounded-md
transition
m-px
border
focus:outline-none
disabled:pointer-events-none
disabled:opacity-75
focus:ring-offset-2
focus:ring-offset-white
dark:focus:ring-offset-black
focus:ring-2`,
  {
    variants: {
      variant: {
        default: "border-transparent text-white",
        outline: "text-white",
        ghost: "border-transparent bg-transparent",
      },
      size: {
        default: "px-5 h-10",
      },
      color: {
        blue: cx(
          // HOVER
          `hover:bg-blue-700
          hover:text-white
          dark:hover:text-white`,

          // FOCUS
          `focus:ring-blue-950
          dark:focus:ring-blue-300`,

          // ACTIVE
          `active:bg-blue-800
          active:text-white
          dark:active:text-white`
        ),
      },
    },
    compoundVariants: [
      {
        color: "blue",
        variant: "default",
        className: `bg-blue-600`,
      },
      {
        color: "blue",
        variant: "outline",
        className: `bg-blue-600
                border-blue-800
                dark:border-blue-400`,
      },
    ],
    defaultVariants: {
      variant: "default",
      color: "blue",
      size: "default",
    },
  }
);

const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement> & VariantProps<typeof button>
>(({ className, size, variant, color, ...props }, ref) => {
  return (
    <button
      {...props}
      ref={ref}
      className={twMerge(button({ size, color, variant }), className)}
    />
  );
});
Button.displayName = "Button";

export { Button };
