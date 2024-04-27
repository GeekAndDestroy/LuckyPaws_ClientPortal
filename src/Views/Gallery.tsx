// Assume everything is written with TailwindCSS and DaisyUI

import ImageCard2 from "../Components/ImageCard2"

type GalleryProps = {}

export default function Gallery({}: GalleryProps) {
  return (
    <div className="flex flex-wrap w-screen">
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard2 />
        </div>
    </div>
  )
}