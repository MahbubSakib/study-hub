import Swal from "sweetalert2";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import axios from "axios";
import { toast } from 'react-hot-toast'
import { useParams } from "react-router-dom";

const AssignmentUpdate = () => {
    const { user } = useContext(AuthContext);
    const [startDate, setStartDate] = useState(new Date());
    // console.log(user?.displayName);
    const { id } = useParams();

    const [assignment, setAssignment] = useState({});

    // fetching data using async await
    const fetchAssignmentData = async () => {
        const { data } = await axios.get(`${import.meta.env.VITE_SERVER_URL}/assignment/${id}`);
        setAssignment(data);
        setStartDate(new Date(data.due));
    }

    useEffect(() => {
        fetchAssignmentData();
    }, [id]);

    // console.log(assignment);

    const handleSubmit = async (e) => {
        e.preventDefault();
        const form = e.target;
        const title = form.title.value;
        const description = form.description.value;
        const marks = form.marks.value;
        const image = form.image.value;
        const difficulty = form.difficulty.value;
        const due = startDate;
        const email = form.email.value;
        const name = form.name.value;

        const newAssignment = { title, description, marks, image, difficulty, due, email, name };

        // Get today's date
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        // marks have to be at least 50
        if (marks < 50) {
            Swal.fire({
                title: 'Error',
                text: 'Marks must be at least 50.',
                icon: 'warning',
                confirmButtonText: 'Close'
            });
            return;
        }

        // due date
        if (due < today) {
            Swal.fire({
                title: 'Error',
                text: 'Due date cannot be before today.',
                icon: 'warning',
                confirmButtonText: 'Close'
            });
            return;
        }

        try {
            const { data } = await axios.put(`${import.meta.env.VITE_SERVER_URL}/update-assignment/${id}`, newAssignment);

            if (data.modifiedCount > 0) {
                Swal.fire({
                    title: "Updated!",
                    text: "Your campaign has been updated successfully.",
                    icon: "success",
                });
            }
        } catch (error) {
            console.error('Error creating assignment:', error);
            Swal.fire({
                title: 'Error!',
                text: error.response?.data?.message || 'Failed to create the assignment. Please try again.',
                icon: 'error',
                confirmButtonText: 'Close'
            });
        }
    };

    return (
        <div>
            <div className="w-10/12 mx-auto my-10">
                <div className="w-8/12 mx-auto bg-slate-100 rounded-xl p-6 shadow-lg">
                    <h2 className="text-2xl font-semibold text-center mb-6">Create an Assignment</h2>

                    <form onSubmit={handleSubmit}>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                            {/*Title */}
                            <div className="flex flex-col">
                                <label htmlFor="title" className="text-lg font-medium text-gray-700">Title:</label>
                                <input
                                    type="text"
                                    name="title"
                                    defaultValue={assignment.title}
                                    placeholder="Enter title"
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* Description */}
                            <div className="flex flex-col">
                                <label htmlFor="description" className="text-lg font-medium text-gray-700">Description:</label>
                                <textarea
                                    name="description"
                                    defaultValue={assignment.description}
                                    placeholder="Enter a brief description"
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                    rows="4"
                                ></textarea>
                            </div>

                            {/* Marks */}
                            <div className="flex flex-col">
                                <label htmlFor="marks" className="text-lg font-medium text-gray-700">Marks:</label>
                                <input
                                    type="number"
                                    name="marks"
                                    defaultValue={assignment.marks}
                                    placeholder="Enter the mark"
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>

                            {/* image */}
                            <div className="flex flex-col">
                                <label htmlFor="image" className="text-lg font-medium text-gray-700">Image/Thumbnail (Image URL):</label>
                                <input
                                    type="text"
                                    name="image"
                                    defaultValue={assignment.image}
                                    placeholder="Enter image URL"
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                    required
                                />
                            </div>



                            {/* difficulty level */}
                            {assignment?.difficulty && (
                                <div className="flex flex-col">
                                    <label htmlFor="difficulty" className="text-lg font-medium text-gray-700">Difficulty Level:</label>
                                    <select
                                        name="difficulty"
                                        defaultValue={assignment.difficulty}
                                        className="w-full p-3 border-2 border-slate-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                                        required
                                    >
                                        <option value="Easy">Easy</option>
                                        <option value="Medium">Medium</option>
                                        <option value="Hard">Hard</option>
                                    </select>
                                </div>
                            )}

                            {/* Due date */}
                            <div className="flex flex-col">
                                <label htmlFor="dueDate" className="text-lg font-medium text-gray-700">Due Date:</label>
                                <DatePicker
                                    className='border p-2 rounded-md'
                                    selected={startDate}
                                    onChange={date => setStartDate(date)}
                                />
                            </div>

                            {/* User Email */}
                            <div className="flex flex-col">
                                <label htmlFor="email" className="text-lg font-medium text-gray-700">User Email (Read Only):</label>
                                <input
                                    type="email"
                                    name="email"
                                    value={user?.email}
                                    readOnly
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg bg-gray-100 focus:outline-none"
                                    required
                                />
                            </div>

                            {/* User Name */}
                            <div className="flex flex-col">
                                <label htmlFor="name" className="text-lg font-medium text-gray-700">User Name (Read Only):</label>
                                <input
                                    type="text"
                                    name="name"
                                    value={user?.displayName}
                                    readOnly
                                    className="w-full p-3 border-2 border-slate-300 rounded-lg bg-gray-100 focus:outline-none"
                                />
                            </div>
                        </div>


                        <div className="mt-6 flex justify-center">
                            <button type="submit"
                                className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
                            >
                                Update
                            </button>
                        </div>
                    </form>
                </div>

            </div>
        </div>
    );
};

export default AssignmentUpdate;