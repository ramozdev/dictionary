import * as React from "react";
import { type VariantProps, cva, cx } from "class-variance-authority";
import { twMerge } from "tailwind-merge";

const anchor = cva(
  `group
inline-flex
select-none
items-center
justify-center
leading-none
rounded-sm
hover:underline
focus:outline-none
disabled:pointer-events-none
disabled:opacity-75
focus:ring-offset-4
focus:ring-offset-white
focus:ring-2`,
  {
    variants: {
      color: {
        blue: cx(
          `text-blue-600`,

          // FOCUS
          `focus:ring-blue-950`,
        ),
      },
    },
    defaultVariants: {
      color: "blue",
    },
  },
);

const UnderlineAnchor = React.forwardRef<
  HTMLAnchorElement,
  React.AnchorHTMLAttributes<HTMLAnchorElement> & VariantProps<typeof anchor>
>(({ className, color, ...props }, ref) => {
  return (
    <a {...props} ref={ref} className={twMerge(anchor({ color }), className)} />
  );
});
UnderlineAnchor.displayName = "UnderlineAnchor";

const Underline = UnderlineAnchor;

export { Underline };
