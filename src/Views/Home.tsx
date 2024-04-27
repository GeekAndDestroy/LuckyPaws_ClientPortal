// Assume everything is written with TailwindCSS and DaisyUI
import { getAllImages } from "../lib/apiWrapper"
import ImageCard from "../Components/ImageCard"
import { ImageType, UserType } from "../types";
import { useEffect, useState } from "react";
import AdminDogCard from "../Components/AdminDogCard";
import ImageCard2 from "../Components/ImageCard2";

type HomeProps = {currentUser: UserType;}

export default function Home({currentUser}: HomeProps) {

    const [images, setImages] = useState<Partial<ImageType[]>>([]);

    useEffect(() => {
        async function getImages() {
            let response = await getAllImages();
            if (response.data) {
                setImages(response.data);
            }
        }
        getImages();
    }, []);

return (
    <div className="flex flex-wrap w-screen">
        <div className="w-1/2 md:w-1/4 p-2">
            {images.map(i => <ImageCard key={i?.image_id} image={i} />)}
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