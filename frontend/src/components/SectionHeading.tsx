type SectionHeadingProps = {
  eyebrow: string
  title: string
  action?: string
  href?: string
}

function SectionHeading({ eyebrow, title, action, href }: SectionHeadingProps) {
  return (
    <div className="section-heading">
      <div>
        <p className="eyebrow">{eyebrow}</p>
        <h2>{title}</h2>
      </div>
      {action && href && (
        <a className="text-link" href={href}>
          {action} <span>→</span>
        </a>
      )}
    </div>
  )
}

export default SectionHeading
