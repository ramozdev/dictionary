import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const checkbox = cva(
  `rounded
  shadow-sm

  focus:ring-offset-2
  focus:ring-offset-white
  dark:focus:ring-offset-black
  focus:ring-2

  w-5
  h-5

  m-px
  border
  transition
  focus:outline-none
  disabled:pointer-events-none
  disabled:opacity-75`,
  {
    variants: {
      variant: {
        outline: "",
        plane: "border-transparent",
      },
      color: {
        blue: cx(
          `bg-blue-50
        dark:bg-blue-950`,

          // CHECKED
          `checked:text-blue-500
          dark:checked:text-blue-900`,

          // HOVER CHECKED
          `hover:checked:text-blue-700
        dark:hover:checked:text-blue-900`,

          // FOCUS
          `focus:ring-blue-950
          dark:focus:ring-blue-300`
        ),
      },
    },
    compoundVariants: [
      {
        color: "blue",
        variant: "outline",
        className: `border-blue-300
          dark:border-blue-800`,
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "blue",
    },
  }
);

const Checkbox = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof checkbox>
>(({ className, color, variant, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      type="checkbox"
      className={twMerge(checkbox({ color, variant }), className)}
    />
  );
});
Checkbox.displayName = "Checkbox";

export { Checkbox };
