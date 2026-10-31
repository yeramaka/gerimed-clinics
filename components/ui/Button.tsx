import Link from "next/link";
import type { AnchorHTMLAttributes, ReactNode } from "react";

type ButtonVariant = "primary" | "secondary";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  href: string;
  variant?: ButtonVariant;
};

const variantStyles: Record<ButtonVariant, string> = {
  primary:
    "border-brand-forest bg-brand-forest text-white hover:border-[#173b2c] hover:bg-[#173b2c]",
  secondary:
    "border-brand-forest/25 bg-brand-ivory text-brand-forest hover:border-brand-gold hover:bg-white",
};

export function Button({
  children,
  className = "",
  href,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <Link
      href={href}
      className={`inline-flex min-h-12 items-center justify-center rounded-md border px-5 py-3 text-sm font-semibold transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-brand-gold motion-reduce:transition-none sm:px-6 ${variantStyles[variant]} ${className}`}
      {...props}
    >
      {children}
    </Link>
  );
}
