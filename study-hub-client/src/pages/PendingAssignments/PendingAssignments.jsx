import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { AuthContext } from "../../provider/AuthProvider";
import { toast } from "react-hot-toast";

const PendingAssignments = () => {
    const [pendingAssignments, setPendingAssignments] = useState([]);
    const [selectedAssignment, setSelectedAssignment] = useState(null);
    const [marks, setMarks] = useState("");
    const [feedback, setFeedback] = useState("");
    const {user} = useContext(AuthContext);

    useEffect(() => {
        fetchPendingAssignments();
    }, []);

    const fetchPendingAssignments = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/pending-assignments`);
        setPendingAssignments(data);
    };

    const handleGiveMarkClick = (assignment) => {
        // Check if the assignment belongs to the current user
        if (assignment.userEmail === user.email) {
            toast.error("You cannot mark your own assignment!");
            return;
        }
        setSelectedAssignment(assignment);
    };

    const handleGiveMark = async (e) => {
        e.preventDefault();

        try {
            await axios.put(`${import.meta.env.VITE_SERVER_URL}/mark-assignment/${selectedAssignment._id}`, {
                marks,
                feedback
            });
            toast.success("Marks submitted successfully!");
            setSelectedAssignment(null);
            fetchPendingAssignments();
        } catch (error) {
            console.error(error);
            toast.error("Error while submitting marks.");
        }
    };

    return (
        <div className="w-10/12 mx-auto my-5">
            <h2 className="text-xl font-semibold text-center mb-5">Pending Assignments</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    <thead>
                        <tr>
                            <th>#</th>
                            <th>Title</th>
                            <th>Marks</th>
                            <th>Examinee</th>
                            <th>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {pendingAssignments.map((assignment, index) => (
                            <tr key={assignment._id}>
                                <td>{index + 1}</td>
                                <td>{assignment.title}</td>
                                <td>{assignment.marks}</td>
                                <td>{assignment.userEmail}</td>
                                <td>
                                    <button
                                        className="px-3 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                        onClick={() => handleGiveMarkClick(assignment)}
                                    >
                                        Give Mark
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Modal */}
            {selectedAssignment && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h3 className="text-xl font-semibold mb-4">Mark Assignment</h3>
                        <p className="mb-2">
                            <strong>Title:</strong> {selectedAssignment.title}
                        </p>
                        <p className="mb-2">
                            <strong>Examinee:</strong> {selectedAssignment.userEmail}
                        </p>
                        <p className="mb-4">
                            <a
                                href={selectedAssignment.googleDocsLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="text-blue-500 underline"
                            >
                                View Submission
                            </a>
                        </p>
                        <form onSubmit={handleGiveMark}>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Marks</label>
                                <input
                                    type="number"
                                    value={marks}
                                    onChange={(e) => setMarks(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Feedback</label>
                                <textarea
                                    value={feedback}
                                    onChange={(e) => setFeedback(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="4"
                                    required
                                ></textarea>
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    type="button"
                                    className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
                                    onClick={() => setSelectedAssignment(null)}
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
                                >
                                    Submit
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default PendingAssignments;
