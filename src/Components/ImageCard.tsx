// Assume everything is written with TailwindCSS and DaisyUI


type ImageCardProps = {};

export default function ImageCard({}: ImageCardProps) {
    return (
        <div className="card image-full w-50 lg:w-25 bg-base-100 shadow-xl">
            <figure>
                <img
                    src="https://daisyui.com/images/stock/photo-1606107557195-0e29a4b5b4aa.jpg"
                    alt="Shoes"
                />
            </figure>
            <div className="card-body">
                <div className="card-actions justify-end">
                    <button className="btn-sm btn-primary">view</button>
                </div>
            </div>
        </div>
    );
}
