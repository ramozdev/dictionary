import * as React from "react";
import { type VariantProps, cva } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const card = cva(
  `rounded-md
  shadow-sm
  w-full
  p-4
  m-px
  border
  `,
  {
    variants: {
      variant: {
        outline: "",
        plane: "border-transparent",
      },
      color: {
        "white-black": "bg-white",
      },
    },
    compoundVariants: [
      {
        color: "white-black",
        variant: "outline",
        className: `border-neutral-300`,
      },
    ],
    defaultVariants: {
      variant: "outline",
      color: "white-black",
    },
  },
);

const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement> & VariantProps<typeof card>
>(({ className, color, variant, ...props }, ref) => {
  return (
    <div
      {...props}
      ref={ref}
      className={twMerge(card({ color, variant }), className)}
    />
  );
});
Card.displayName = "Card";

export { Card };
