// Assume everything is written with TailwindCSS and DaisyUI

import { ImageType } from "../types";


type ImageCardProps = {
    image: ImageType
};

export default function ImageCard({image}: ImageCardProps) {
    return (
        // <></>
        <div className="z-0 bg-base-100 shadow-xl">
            <img
                src={image.image_url}
                alt="Dog!"
            />
        </div>
    );
}
