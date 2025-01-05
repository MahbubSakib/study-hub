import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../provider/AuthProvider";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import useAxiosSecure from "../../hooks/useAxiosSecure";

const MyAttemptedAssignments = () => {

    const { user } = useContext(AuthContext);
    const [submissions, setSubmissions] = useState();
    const [startDate, setStartDate] = useState(new Date());
    const axiosSecure = useAxiosSecure();

    const fetchSubmittedData = async () => {
        const { data } = await axiosSecure.get(`/my-submitted-assignment/${user.email}`);
        setSubmissions(data);
        setStartDate(new Date(data.due));
    }

    useEffect(() => {
        fetchSubmittedData();
    }, []);
    // console.log(submissions);

    return (
        <div className="w-10/12 mx-auto my-5">
        <h2 className="text-xl font-semibold text-center mb-5">My Attempted Assignments</h2>
            <div className="overflow-x-auto">
                <table className="table">
                    {/* head */}
                    <thead>
                        <tr>
                            <th></th>
                            <th>Title</th>
                            <th>Status</th>
                            <th>Total Marks</th>
                            <th>Obtained Marks</th>
                            <th>Feedback</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            submissions && (
                            submissions.map((submission, index) => <tr key={submission._id}>
                            <th>{index+1}</th>
                            <td>{submission.title}</td>
                            <td>{submission.status}</td>
                            <td>{submission.marks}</td>
                            <td>{submission.obtainedMarks ? submission.obtainedMarks : 'Not Graded Yet'}</td>
                            <td>{submission.feedback ? submission.feedback : '-'}</td>
                        </tr>)
                        )}
                        
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default MyAttemptedAssignments;