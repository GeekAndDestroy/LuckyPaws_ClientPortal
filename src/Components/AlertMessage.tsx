import { CategoryType } from "../types";

type AlertMessageProps = {
    message: string | undefined;
    category: CategoryType | undefined;
    flashMessage: (
        newMessage: string | undefined,
        newCategory: CategoryType | undefined
    ) => void;
};

export default function AlertMessage({
    message,
    category,
    flashMessage,
}: AlertMessageProps) {
    return (
        <div className="toast toast-center toast-middle z-50">
            <div className={`alert alert-${category}`}>
                <div className="flex-1">
                    <label>{message}</label>
                </div>
                <button
                    className="btn btn-ghost"
                    onClick={() => flashMessage(undefined, undefined)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        className="w-6 h-6"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M6 18L18 6M6 6l12 12"
                        />
                    </svg>
                </button>
            </div>
        </div>
    );
}
