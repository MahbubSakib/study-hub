import { useNavigate } from "react-router-dom";

const Error404 = () => {
    const navigate = useNavigate();
    return (
        <div className="bg-slate-100">
            <div className="flex flex-col items-center justify-center min-h-screen">
                <h1 className="text-6xl font-bold text-red-600 mb-4">404</h1>
                <p className="text-xl mb-6">Oops! The page you're looking for doesn't exist.</p>
                <button
                    onClick={() => navigate("/")}
                    className="btn bg-blue-700 text-white hover:bg-blue-500"
                >
                    Go Back Home
                </button>
            </div>
        </div>
    );
};

export default Error404;