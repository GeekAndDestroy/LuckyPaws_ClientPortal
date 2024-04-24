// Assume everything is written with TailwindCSS and DaisyUI

import ImageCard from "../Components/ImageCard"

type GalleryProps = {}

export default function Gallery({}: GalleryProps) {
  return (
    <div className="flex flex-wrap w-screen">
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
        <div className="w-1/2 md:w-1/4 p-2">
            <ImageCard />
        </div>
    </div>
  )
}