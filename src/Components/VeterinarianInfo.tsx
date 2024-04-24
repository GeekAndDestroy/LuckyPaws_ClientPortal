// Assume everything is written with TailwindCSS and DaisyUI

type VeterinarianInfoProps = {}

export default function VeterinarianInfo({}: VeterinarianInfoProps) {
  return (
    
    <div className="hero w-96 lg:w-3/4 bg-base-200 rounded-lg">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl m-4 font-bold">Veterinarian Info</h1>
                <form>
                    <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <input type="text" id="name"
                            placeholder="Clinic's Name" className="input input-bordered" />
                            <input type="text" id="lastName"
                            placeholder="Doctor's Name" className="input input-bordered" />
                            <input type="text" id="street1"
                            placeholder="Street 1" className="input input-bordered" />
                            <input type="text" id="street2" 
                            placeholder="Street 2"
                            className="input input-bordered" />
                            <input type="text" id="city"
                            placeholder="City" 
                            className="input input-bordered" />
                            <input type="text" id="state" 
                            placeholder="State"
                            className="input input-bordered" />
                            <input type="text" id="zip"
                            placeholder="Zip Code" 
                            className="input input-bordered" />
                            <input type="email" id="email" 
                            placeholder="Email"
                            className="input input-bordered" />
                            <input type="tel" id="phone"
                            placeholder="Phone Number" className="input input-bordered" />
                    </div>
                    <button className="btn m-4 btn-secondary shadow-lg shadow-fuchsia-800">Update Veterinarian</button>
                </form>
            </div>
        </div>
    </div>
  )
}