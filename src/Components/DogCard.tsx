// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { CategoryType, DogType, UserType } from "../types"


type DogCardProps = {
  dog: DogType,
  currentUser: UserType,
  flashMessage: (newMessage: string, category: CategoryType) => void;
}

export default function DogCard({ dog, currentUser, flashMessage }: DogCardProps) {
  return (
    <div className="card card-compact bg-base-100 shadow-xl w-36 sm:w-60 m-2 p-4">
  <figure><img src={ dog.profile_pic_url } alt="Dog" /></figure>
  <div className="card-body">
    <div className="card-actions justify-center">
      <button className="btn btn-secondary shadow-md shadow-fuchsia-800" onClick={() => window.location.href = `../dog/${dog.dog_id}`}>{ dog.name }</button>
    </div>
  </div>
</div>
  )
}