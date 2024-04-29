// Assume everything is written with TailwindCSS and DaisyUI
import { DogType } from "../types"

import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";
// import { dog } from "@cloudinary/url-gen/qualifiers/focusOn";
// import { set } from "@cloudinary/url-gen/actions/variable";


type DogCardProps = {
  dog: DogType,

}

export default function DogCard({ dog }: DogCardProps) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djchjozvp'
    }
  });

  const myImage = cld.image(dog.profile_pic_url); 


  return (
    <div className="card card-compact bg-base-100 shadow-xl w-36 sm:w-60 m-2">
  <figure><AdvancedImage cldImg={myImage.resize(fill().width(350).height(350).gravity(focusOn(FocusOn.face())))} /></figure>
  <div className="card-body">
    <div className="card-actions justify-center">
      <button className="btn btn-secondary shadow-md shadow-fuchsia-800" onClick={() => window.location.href = `../dog/${dog.dog_id}`}>{ dog.name }</button>
    </div>
  </div>
</div>
  )
} 