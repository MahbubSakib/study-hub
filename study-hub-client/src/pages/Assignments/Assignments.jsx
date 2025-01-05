import React, { useEffect, useState } from "react";
import axios from "axios";
import AssignmentCard from "./AssignmentCard";
import LoadingSpinner from "../../components/LoadingSpinner";

const Assignments = () => {
    const [assignments, setAssignments] = useState([]);
    const [difficulty, setDifficulty] = useState("");
    const [search, setSearch] = useState("");
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [isLoading, setIsLoading] = useState(false);

    const fetchAssignmentData = async () => {
        setIsLoading(true);
        try {
            const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/assignments`, {
                params: { difficulty, search, page: currentPage, limit: 6 },
            });
            setAssignments(data.assignments);
            setTotalPages(data.totalPages);
        } catch (error) {
            console.error("Error fetching assignments:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchAssignmentData();
    }, [difficulty, search, currentPage]);

    const handlePageChange = (page) => {
        setCurrentPage(page);
    };

    return (
        <div className="bg-[#F8F8F8]">
            <div className="w-10/12 mx-auto py-5">
                <div className="flex flex-col md:flex-row items-center justify-between mb-5">
                    <select
                        className="p-2 border rounded-md mb-3 md:mb-0"
                        value={difficulty}
                        onChange={(e) => setDifficulty(e.target.value)}
                    >
                        <option value="">All Levels</option>
                        <option value="Easy">Easy</option>
                        <option value="Medium">Medium</option>
                        <option value="Hard">Hard</option>
                    </select>

                    <input
                        type="text"
                        placeholder="Search assignments..."
                        className="p-2 border rounded-md"
                        value={search}
                        onChange={(e) => setSearch(e.target.value)}
                    />
                </div>

                {/* Show loader or assignments */}
                {isLoading ? (
                    <div className="flex justify-center items-center min-h-[200px]">
                        <LoadingSpinner></LoadingSpinner>
                    </div>
                ) : (
                    <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                        {assignments.map((assignment) => (
                            <AssignmentCard
                                key={assignment._id}
                                assignment={assignment}
                                allAssignments={fetchAssignmentData}
                            />
                        ))}
                    </div>
                )}

                {/* Pagination */}
                {!isLoading && (
                    <div className="flex justify-center mt-6">
                        <button
                            disabled={currentPage === 1}
                            onClick={() => handlePageChange(currentPage - 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md mr-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Previous
                        </button>
                        {Array.from({ length: totalPages }, (_, index) => (
                            <button
                                key={index + 1}
                                onClick={() => handlePageChange(index + 1)}
                                className={`px-4 py-2 mx-1 ${currentPage === index + 1
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200 text-gray-600"
                                    } rounded-md`}
                            >
                                {index + 1}
                            </button>
                        ))}
                        <button
                            disabled={currentPage === totalPages}
                            onClick={() => handlePageChange(currentPage + 1)}
                            className="px-4 py-2 bg-gray-200 text-gray-600 rounded-md ml-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Next
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Assignments;
