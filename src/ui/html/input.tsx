import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const input = cva(
  `appearance-none
  rounded-md
  block
  w-[260px]
  px-3
  py-2
  m-px
  border
  transition
  focus:outline-none
  disabled:pointer-events-none
  disabled:opacity-75
  [color-scheme:white]
  dark:[color-scheme:dark]

  focus-visible:ring-offset-0
  focus-visible:ring-0`,
  {
    variants: {
      variant: {
        outline: "",
        plane: "border-transparent",
      },
      color: {
        neutral: cx(
          `bg-neutral-50
        text-neutral-900`,

          // PLACEHOLDER
          `placeholder:text-neutral-500`,

          // FOCUS VISIBLE
          `focus-visible:border-neutral-950`,
        ),
      },
    },
    compoundVariants: [
      {
        color: "neutral",
        variant: "outline",
        className: `border-neutral-300`,
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "neutral",
    },
  },
);

const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & VariantProps<typeof input>
>(({ className, color, variant, ...props }, ref) => {
  return (
    <input
      {...props}
      ref={ref}
      className={twMerge(input({ color, variant }), className)}
    />
  );
});
Input.displayName = "Input";

export { Input };
