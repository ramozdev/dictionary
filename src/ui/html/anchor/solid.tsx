import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";

import { globalAnchorStyles } from "@/ui/html/anchor/global-styles";
import { twMerge } from "tailwind-merge";

const anchor = cva(globalAnchorStyles, {
  variants: {
    variant: {
      default: "border-transparent text-white",
      outline: "text-white",
      ghost: "border-transparent bg-transparent",
    },
    size: {
      normal: "px-5 h-10",
      icon: "h-10 w-10 [&_>_svg]:h-4 [&_>_svg]:w-4",
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
    // -------------OUTLINE-------------
    {
      color: "blue",
      variant: "outline",
      className: `bg-blue-600
                  border-blue-800
                  dark:border-blue-400`,
    },
    // ------------GHOST-------------
    {
      color: "blue",
      variant: "ghost",
      className: `text-blue-700
                  dark:text-blue-400`,
    },
  ],
  defaultVariants: {
    variant: "default",
    color: "blue",
    size: "normal",
  },
});

const SolidAnchor = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof anchor>
>(({ className, size, variant, color, ...props }, ref) => {
  return (
    <a
      {...props}
      ref={ref}
      className={twMerge(anchor({ size, color, variant }), className)}
    />
  );
});
SolidAnchor.displayName = "SolidAnchor";

const Solid = SolidAnchor;

export { Solid };
