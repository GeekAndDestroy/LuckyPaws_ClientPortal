// Assume everything is written with TailwindCSS and DaisyUI

type DogCardProps = {}

export default function DogCard({}: DogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl">
  <figure><img src="./src/assets/tempdogphotos/IMG_5433.jpeg" alt="Shoes" /></figure>
  <div className="card-body">
    <div className="card-actions justify-center">
      <button className="btn btn-secondary shadow-md shadow-fuchsia-800">*Dog Name*</button>
    </div>
  </div>
</div>
  )
}