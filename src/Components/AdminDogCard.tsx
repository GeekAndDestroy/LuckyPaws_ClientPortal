// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { CategoryType, DogType, UserType } from "../types"


type AdminDogCardProps = {
  dog: DogType | undefined;
}

export default function AdminDogCard({ dog }: AdminDogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl m-4">
  <figure><img src={ dog!.profile_pic_url } alt="Dog" /></figure>
  <div className="card-body">
    <div className="card-title text-center">
      { dog!.name }
    </div>
    <div className="card-actions justify-center">
      <button className="btn btn-secondary shadow-md shadow-fuchsia-800">View Info</button>
    </div>
  </div>
</div>
  )
}