// Assume everything is written with TailwindCSS and DaisyUI
import { Cloudinary } from "@cloudinary/url-gen";
import { AdvancedImage, responsive, placeholder, accessibility } from "@cloudinary/react";
import { fill } from "@cloudinary/url-gen/actions/resize";
import {autoGravity} from "@cloudinary/url-gen/qualifiers/gravity";

import { ImageType } from "../types";
import { generativeRestore } from "@cloudinary/url-gen/actions/effect";

type ImageCardProps = {
    image: ImageType | undefined;
};

export default function ImageCard({ image }: ImageCardProps) {
    const cld = new Cloudinary({
        cloud: {
            cloudName: "djchjozvp",
        },
    });

    const myImageThumb = cld.image(image!.image_url);
    const myImageModal = cld.image(image!.image_url);
    return (
        <>
            <div className="w-max mt-3">
                <div className="z-0 bg-base-100 shadow-xl mx-1">
                <button
                        
                        onClick={() =>
                            (
                                document.getElementById(
                                    `image_card_modal${image!.image_id}`
                                ) as HTMLDialogElement
                            ).showModal()
                        }
                    >
                    <AdvancedImage
                        cldImg={myImageThumb
                            .resize(
                                fill()
                                    .width(230)
                                    .height(230)
                                    .gravity(autoGravity())
                            )
                            .effect(generativeRestore())}
                    />
                    </button>
                </div>
            </div>
            <dialog
                id={`image_card_modal${image!.image_id}`}
                className="modal modal-bottom sm:modal-middle"
            >
                <div className="modal-box glass">
                    <button
                        className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2"
                        onClick={() =>
                            (
                                document.getElementById(
                                    `image_card_modal${image!.image_id}`
                                ) as HTMLDialogElement
                            ).close()
                        }
                    >
                        ✕
                    </button>
                    <div className="z-0 mx-1">
                    <AdvancedImage 
                        cldImg={myImageModal.resize(fill()
                            .height(800))
                            .effect(generativeRestore())}
                    />
                    <div className="rounded m-2 ">
                    <h1 className="text-center p-2  rounded">{image!.description}</h1>
                    </div>
                </div>
                    <div className="modal-action"></div>
                </div>
            </dialog>
        </>
    );
}
