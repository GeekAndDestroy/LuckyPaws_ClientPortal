// Assume everything is written with TailwindCSS and DaisyUI
import { getAllImages } from "../lib/apiWrapper"
import ImageCard from "../Components/ImageCard"
import { ImageType, UserType } from "../types";
import { useEffect, useState } from "react";


type HomeProps = {currentUser: UserType;}

export default function Home({}: HomeProps) {

    const [images, setImages] = useState<Partial<ImageType[]>>([]);

    useEffect(() => {
        async function getImages() {
            let response = await getAllImages();
            if (response.data) {
                setImages(response.data);
            }
        }
        console.log(images)
        getImages();
    }, []);

return (
    <div className="flex flex-wrap w-screen justify-center">
            {images.map(i => <ImageCard key={i?.image_id} image={i} />).reverse()}
    </div>
)
}