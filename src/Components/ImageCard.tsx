// Assume everything is written with TailwindCSS and DaisyUI
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder } from "@cloudinary/react";
import {fill} from "@cloudinary/url-gen/actions/resize";
import {focusOn} from "@cloudinary/url-gen/qualifiers/gravity";
import {FocusOn} from "@cloudinary/url-gen/qualifiers/focusOn";

import { ImageType } from "../types";
import { generativeRestore } from "@cloudinary/url-gen/actions/effect";


type ImageCardProps = {
    image: ImageType | undefined;
};

export default function ImageCard({image}: ImageCardProps) {
    const cld = new Cloudinary({
        cloud: {
          cloudName: 'djchjozvp'
        }
      });
    
      const myImage = cld.image(image!.image_url); 
    return (
        // <></>
        // <div className="w-1/2 md:w-1/4">
        <div className="w-max mt-2">
        <div className="z-0 bg-base-100 shadow-xl mx-1">
            <AdvancedImage cldImg={myImage.resize(fill().width(230).height(230).gravity(focusOn(FocusOn.face()))).effect(generativeRestore())} />
        </div>
        </div>
    );
}
