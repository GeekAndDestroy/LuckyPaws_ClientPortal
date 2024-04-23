

type EmergencyContactInfoProps = {}

export default function EmergencyContactInfo({}: EmergencyContactInfoProps) {
  return (
    <div className="hero w-96 lg:w-3/4 bg-base-200">
        <div className="hero-content text-center">
            <div className="max-w-md">
                <h1 className="text-5xl m-4 font-bold">Emergency Contact Info</h1>
                <form>
                    <div className="mx-auto w-80 sm:max-w-md md:max-w-lg flex flex-col gap-5">
                            <input type="text" id="firstName"
                            placeholder="First Name" className="input input-bordered" />
                            <input type="text" id="lastName"
                            placeholder="Last Name" className="input input-bordered" />
                            <input type="email" id="email" 
                            placeholder="Email"
                            className="input input-bordered" />
                            <input type="tel" id="phone"
                            placeholder="Phone Number" className="input input-bordered" />
                    </div>
                    <button className="btn m-4 btn-secondary">Update Emergency Contact</button>
                </form>
            </div>
        </div>
    </div>
  )
}