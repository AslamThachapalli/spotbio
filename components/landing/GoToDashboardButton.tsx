import Link from "next/link";

function GoToDashboardButton() {
    return (
        <Link
            className="w-96 py-3 font-bold rounded-md bg-red-300 text-white flex justify-center items-center"
            href={'/dashboard'}
        >
            GO TO DASHBOARD
        </Link>
    );
}

export default GoToDashboardButton;
