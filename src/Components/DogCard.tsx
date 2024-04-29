// Assume everything is written with TailwindCSS and DaisyUI
import { DogType } from "../types"


type DogCardProps = {
  dog: DogType,

}

export default function DogCard({ dog }: DogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl w-36 sm:w-60 m-2">
  <figure><img src={ dog.profile_pic_url } alt="Dog" /></figure>
  <div className="card-body">
    <div className="card-actions justify-center">
      <button className="btn btn-secondary shadow-md shadow-fuchsia-800" onClick={() => window.location.href = `../dog/${dog.dog_id}`}>{ dog.name }</button>
    </div>
  </div>
</div>
  )
} 