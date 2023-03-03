import { cn } from "@/lib/utils"

export function TypographyH1({children}) {
  return (
    <h1 className="scroll-m-20 text-4xl font-extrabold tracking-tight lg:text-5xl">
      {children}
    </h1>
  )
}

export function TypographyP({children, className}) {
  return (
    <p className={cn("leading-7", className)}>
      {children}
    </p>
  )
}

export function TypographyH3({children, className}) {
  return (
    <h3 className={cn("scroll-m-20 text-2xl font-semibold tracking-tight", className)}>
      {children}
    </h3>
  )
}