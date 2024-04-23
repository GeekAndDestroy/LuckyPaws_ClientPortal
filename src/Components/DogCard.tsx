

type DogCardProps = {}

export default function DogCard({}: DogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg" alt="Shoes" /></figure>
  <div className="card-body">
    <div className="card-actions justify-center">
      <button className="btn btn-secondary">*Dog Name*</button>
    </div>
  </div>
</div>
  )
}