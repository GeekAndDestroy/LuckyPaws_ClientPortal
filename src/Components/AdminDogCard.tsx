// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { CategoryType, DogType, UserType } from "../types"


type AdminDogCardProps = {
  dog: DogType | undefined;
}

export default function AdminDogCard({ dog }: AdminDogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl m-1  w-36 sm:w-60 p-4">
      <figure><img src={dog!.profile_pic_url} alt="Dog" /></figure>
      <div className="card-body flex items-center">
        <div className="card-title">
          {dog!.name}
        </div>
        <div className="card-actions justify-center">
          <button className="btn btn-secondary shadow-md shadow-fuchsia-800"  onClick={() => window.location.href = `/dogadmin/${dog?.dog_id}`}>View Info</button>
        </div>
      </div>
    </div>
  )
}