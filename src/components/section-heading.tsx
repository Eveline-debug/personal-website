type SectionHeadingProps = {
  title: string
  subtitle?: string
}

export function SectionHeading({ title, subtitle }: SectionHeadingProps) {
  return (
    <div className="space-y-2">
      <p className="text-sm uppercase tracking-[0.3em] text-muted-foreground">
        Section
      </p>
      <h2 className="text-3xl font-semibold text-foreground sm:text-4xl">
        {title}
      </h2>
      {subtitle ? (
        <p className="max-w-2xl whitespace-pre-line text-base text-muted-foreground">
          {subtitle}
        </p>
      ) : null}
    </div>
  )
}
