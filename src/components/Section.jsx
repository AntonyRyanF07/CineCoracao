export default function Section({ title, children, action }) {
  return (
    <section className="content-section">
      <div className="section-heading">
        <h2>{title}</h2>
        {action}
      </div>
      {children}
    </section>
  )
}
