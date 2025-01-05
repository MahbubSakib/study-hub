import React from "react";

const FAQ = () => {
    return (
        <section className="py-16 px-4 bg-gray-50">
            <div className="w-8/12 mx-auto">
                <h2 className="text-3xl font-bold text-center mb-8 text-gray-800">Frequently Asked Questions</h2>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" defaultChecked />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        What is the purpose of this online group study application?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            This application allows users to create and complete assignments together with friends. It promotes collaborative learning by allowing users to grade their friends' assignments and track progress.
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        How do I create an assignment?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            You can create an assignment by logging into the application and navigating to the "Create Assignment" section. There, you can enter the assignment details and set a deadline.
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        How do I complete an assignment?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            To complete an assignment, visit the "Assignments" section and choose the one you need to work on. Once you've finished, submit it for grading.
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        How can I grade my friend's assignment?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            Once your friend has submitted their assignment, you will receive a notification. You can then view the assignment and provide your feedback or grade it based on the criteria.
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        Can I add multiple friends to the same assignment?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            Yes, you can add multiple friends to an assignment. You can collaborate, share tasks, and grade each other’s work.
                        </p>
                    </div>
                </div>

                <div className="collapse collapse-arrow bg-white shadow-md rounded-lg mb-4">
                    <input type="radio" name="my-accordion" />
                    <div className="collapse-title text-xl font-medium text-gray-800 p-4">
                        Is there a way to track my progress in assignments?
                    </div>
                    <div className="collapse-content p-4">
                        <p>
                            Yes, the application provides a progress tracker that shows you the status of your assignments, including completed tasks, pending work, and grades given or received.
                        </p>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default FAQ;
