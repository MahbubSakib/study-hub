import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from 'react-hot-toast';
import { Link, useParams } from "react-router-dom";
import { format } from "date-fns";

const AssignmentDetails = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    const { id } = useParams();

    const [assignment, setAssignment] = useState({});
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [googleDocsLink, setGoogleDocsLink] = useState("");
    const [quickNote, setQuickNote] = useState("");

    // Fetch assignment data
    const fetchAssignmentData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/assignment/${id}`);
        setAssignment(data);
        setStartDate(new Date(data.due));
    };

    useEffect(() => {
        fetchAssignmentData();
    }, [id]);

    const handleSubmit = () => {
        const submissionData = {
            assignmentId: assignment._id,
            userEmail: user?.email,
            googleDocsLink,
            quickNote,
            status: "Pending",
            obtainedMarks: null,
            feedback: null,
            submittedAt: format(new Date(), "P"),
        };

        // console.log("Submission Data:", submissionData);

        axios.post(`${import.meta.env.VITE_SERVER_URL}/add-submission`, submissionData)
          .then(response => {
            toast.success("Assignment submitted successfully!");
            setIsModalOpen(false);
          })
          .catch(error => {
            toast.error("Failed to submit assignment.");
            console.error(error);
          });
    };

    return (
        <div className="my-10">
            <div className="text-xl font-semibold text-center mb-5">Assignment Details</div>
            <div className="max-w-sm mx-auto bg-white shadow-lg rounded-lg overflow-hidden transition-transform transform hover:scale-105">
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
                    <p className="text-sm text-gray-600 mt-2">
                        <span className="font-medium">Due Date:</span>{" "}
                        {assignment.due ? format(new Date(assignment.due), "P") : "No due date"}
                    </p>
                    <p className="text-sm text-gray-600 mt-1">
                        <span className="font-medium">Difficulty:</span>{" "}
                        <span
                            className={`inline-block px-2 py-1 rounded text-white text-xs ${assignment.difficulty === "Easy"
                                ? "bg-green-500"
                                : assignment.difficulty === "Medium"
                                    ? "bg-yellow-500"
                                    : "bg-red-500"
                                }`}
                        >
                            {assignment.difficulty}
                        </span>
                    </p>
                    <div className="mt-4 flex justify-between items-center">
                        <button
                            onClick={() => setIsModalOpen(true)}
                            className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700 font-medium transition duration-300"
                        >
                            Take Assignment
                        </button>
                    </div>
                </div>
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white rounded-lg p-6 w-96">
                        <h2 className="text-xl font-semibold mb-4">Submit Assignment</h2>
                        <form
                            onSubmit={(e) => {
                                e.preventDefault();
                                if (!googleDocsLink) {
                                    toast.error("Google Docs Link is required.");
                                    return;
                                }
                                handleSubmit();
                            }}
                        >
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">
                                    Google Docs Link
                                </label>
                                <input
                                    type="url"
                                    value={googleDocsLink}
                                    required
                                    onChange={(e) => setGoogleDocsLink(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    placeholder="https://docs.google.com/..."
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-sm font-medium text-gray-700">Quick Note</label>
                                <textarea
                                    value={quickNote}
                                    required
                                    onChange={(e) => setQuickNote(e.target.value)}
                                    className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                                    rows="4"
                                    placeholder="Write a quick note..."
                                />
                            </div>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    // onClick={handleSubmit}
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

export default AssignmentDetails;
