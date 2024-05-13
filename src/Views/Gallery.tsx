// Assume everything is written with TailwindCSS and DaisyUI
import { getImagesByClientUserId } from "../lib/apiWrapper"
import ImageCard from "../Components/ImageCard"
import { ImageType, UserType } from "../types";
import { useEffect, useState } from "react";
import ImageCard2 from "../Components/ImageCard2"


type GalleryProps = {currentUser: UserType;}

export default function Gallery({currentUser}: GalleryProps) {
    
    const [images, setImages] = useState<Partial<ImageType[]>>([]);
    // const id = currentUser.user_id;
    // const token = currentUser.token;
    const id = parseInt(localStorage.getItem('user_id')!);
    const token = localStorage.getItem('token')!;


    const getImages = async () => {
        let response = await getImagesByClientUserId(id, token);
        if (response.data) {
            setImages(response.data);
        }
    }



    // async function getImages() {
    //     let response = await getImagesByClientUserId(id, token);
    //     console.log(currentUser)
    //     if (response.data) {
    //         setImages(response.data);
    //     }
    // }
    console.log(images)

    useEffect(() => {
        getImages();
    }, []);
  
  
  
  
  
  
  
    return (
        <div className="flex flex-wrap w-screen justify-center">       
            {images.map(i => <ImageCard key={i?.image_id} image={i} />).reverse()}
    </div>
  )
}