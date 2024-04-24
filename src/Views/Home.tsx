// Assume everything is written with TailwindCSS and DaisyUI

import ImageCard from "../Components/ImageCard"

type HomeProps = {}

export default function Home({}: HomeProps) {
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