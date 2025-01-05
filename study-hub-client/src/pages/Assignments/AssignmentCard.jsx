import axios from 'axios';
import React from 'react';
import { toast } from 'react-hot-toast';
import { Link } from 'react-router-dom';
import Swal from 'sweetalert2';

const AssignmentCard = ({ assignment, allAssignments }) => {

    const handleDelete = async id => {
        try {
            Swal.fire({
                title: "Are you sure?",
                text: "You won't be able to revert this!",
                icon: "warning",
                showCancelButton: true,
                confirmButtonColor: "#3085d6",
                cancelButtonColor: "#d33",
                confirmButtonText: "Yes, delete it!",
            }).then(async (result) => {
                if (result.isConfirmed) {
                    try {
                        const { data } = await axios.delete(`${import.meta.env.VITE_SERVER_URL}/assignment/${id}`);
                        // console.log(data);
                        if (data.deletedCount > 0) {
                            Swal.fire({
                                title: "Deleted!",
                                text: "The assignment has been deleted.",
                                icon: "success",
                            });
                            allAssignments();
                        }
                    } catch (err) {
                        console.error(err);
                        Swal.fire({
                            title: "Error!",
                            text: "There was an issue deleting the assignment.",
                            icon: "error",
                        });
                    }
                }
            });
        } catch (err) {
            // console.log(err);
            toast.error(err.message);
        }
    }

    return (
        <div>
            <div className="max-w-sm bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
                <img
                    src={assignment.image}
                    alt={assignment.title}
                    className="w-full h-48 sm:h-40 lg:h-48 object-cover"
                />
                <div className="p-4">
                    <h3 className="text-lg font-semibold text-gray-800">{assignment.title}</h3>
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Marks:</span> {assignment.marks}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Difficulty:</span>{' '}
                        <span
                            className={`inline-block px-2 py-1 rounded text-white text-xs ${assignment.difficulty === 'Easy'
                                ? 'bg-green-500'
                                : assignment.difficulty === 'Medium'
                                    ? 'bg-yellow-500'
                                    : 'bg-red-500'
                                }`}
                        >
                            {assignment.difficulty}
                        </span>
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                        <Link
                            to={`/assignmentDetails/${assignment._id}`}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 font-medium transition duration-300"
                        >
                            View
                        </Link>
                        <Link
                            to={`/assignmentUpdate/${assignment._id}`}
                            className="px-4 py-2 bg-yellow-500 text-white rounded-md hover:bg-yellow-700 font-medium transition duration-300"
                        >
                            Update
                        </Link>
                        <button
                            onClick={() => handleDelete(assignment._id)}
                            className="px-4 py-2 bg-red-500 text-white rounded-md hover:bg-red-700 font-medium transition duration-300"
                        >
                            Delete
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignmentCard;