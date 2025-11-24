import AmigurumiCard from "./AmigurumiCard"

export default function AmigurumiList({ amigurumis, onSelect }) {
  return (
    <div className="row">
      {amigurumis.map((amigurumi) => (
        <div key={amigurumi.id} className="col-md-4">
          <AmigurumiCard amigurumi={amigurumi} onSelect={onSelect} />
        </div>
      ))}
    </div>
  )
}
