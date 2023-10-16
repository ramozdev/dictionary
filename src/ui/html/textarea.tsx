import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const DEFAULT_COLOR = "neutral";
const DEFAULT_VARIANT = "outline";

const textarea = cva(
  `appearance-none
  rounded-md
  block
  px-3
  py-2
  m-px
  border
  transition
  focus:outline-none`,
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

          // FOCUS
          `focus:ring-neutral-950`,
        ),
      },
    },
    compoundVariants: [
      {
        color: "neutral",
        variant: "outline",
        className: `border-neutral-300
          dark:border-neutral-800`,
      },
    ],
    defaultVariants: {
      variant: DEFAULT_VARIANT,
      color: DEFAULT_COLOR,
    },
  },
);

const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> &
    VariantProps<typeof textarea>
>(({ className, color, variant, ...props }, ref) => {
  return (
    <textarea
      {...props}
      ref={ref}
      className={twMerge(textarea({ color, variant }), className)}
    />
  );
});
Textarea.displayName = "Textarea";

export { Textarea };
