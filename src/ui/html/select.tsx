import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const select = cva(
  `appearance-none
  rounded-md
  block
  px-3
  py-2
  m-px
  border
  transition
  focus:outline-none

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

const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & VariantProps<typeof select>
>(({ className, color, variant, ...props }, ref) => {
  return (
    <select
      {...props}
      ref={ref}
      className={twMerge(select({ color, variant }), className)}
    />
  );
});
Select.displayName = "Select";

export { Select };
