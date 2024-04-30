import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

import { DogType } from "../types"
import { generativeRestore } from "@cloudinary/url-gen/actions/effect";


type AdminDogCardProps = {
  dog: DogType | undefined;
}

export default function AdminDogCard({ dog }: AdminDogCardProps) {

  const cld = new Cloudinary({
    cloud: {
      cloudName: 'djchjozvp'
    }
  });

  const myImage = cld.image(dog!.profile_pic_url);

  return (
    <div className="card card-compact bg-base-100 shadow-xl m-1  w-36 sm:w-60">
      <figure><AdvancedImage cldImg={myImage.resize(fill().width(240).height(240).gravity(focusOn(FocusOn.face()))).effect(generativeRestore())} /></figure>
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