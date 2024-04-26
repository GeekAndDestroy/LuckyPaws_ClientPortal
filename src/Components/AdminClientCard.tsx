// Assume everything is written with TailwindCSS and DaisyUI
import { useState, useEffect } from "react";
import { CategoryType, DogType, UserType } from "../types";

type AdminClientCardProps = {
    client: UserType | undefined;
};

export default function AdminClientCard({ client }: AdminClientCardProps) {
    return (
        <div className="card card-compact bg-base-100 shadow-xl m-4">
            <div className="card-body ">
                <h2 className="card-title text-center">
                    {client!.first_name} {client!.last_name}
                </h2>
                <div className="card-actions justify-center">
                    <button className="btn btn-secondary shadow-md shadow-fuchsia-800">
                        View Info
                    </button>
                    <button className="btn btn-secondary shadow-md shadow-fuchsia-800">
                        Upload Photo
                    </button>
                </div>
            </div>
        </div>
    );
}
