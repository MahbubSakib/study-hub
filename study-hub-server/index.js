const express = require('express');
const cors = require('cors');
const app = express();
const port = process.env.PORT || 5000;
require('dotenv').config();
const { MongoClient, ServerApiVersion, ObjectId } = require('mongodb');
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');

//middleware
app.use(cors({
    origin: [
        'http://localhost:5173',
        'https://study-hub-483c1.web.app',
        'https://study-hub-483c1.firebaseapp.com'
    ],
    credentials: true
}));
app.use(express.json());
app.use(cookieParser());

const verifyToken = (req, res, next) => {
    const token = req.cookies?.token;
    if (!token) {
        return res.status(401).send({ message: 'Unauthorized' })
    }

    // verify token
    jwt.verify(token, process.env.SECRET_KEY, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Unauthorized' });
        }
        req.user = decoded;
        next();
    })


}

const uri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@cluster0.mt3kx.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`;
// console.log(uri);
// Create a MongoClient with a MongoClientOptions object to set the Stable API version
const client = new MongoClient(uri, {
    serverApi: {
        version: ServerApiVersion.v1,
        strict: true,
        deprecationErrors: true,
    }
});

async function run() {
    try {
        const assignmentCollection = client.db('assignmentDB').collection('assignments');
        const submissionCollection = client.db('assignmentDB').collection('submissions');

        // generate jwt
        app.post('/jwt', async (req, res) => {
            const user = req.body;
            // create token
            const token = jwt.sign(user, process.env.SECRET_KEY, { expiresIn: '100d' })
            res.cookie('token', token, {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            })
                .send({ success: true })
        })

        app.post('/signout', (req, res) => {
            res.clearCookie('token', {
                httpOnly: true,
                secure: process.env.NODE_ENV === "production",
                sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
            })
                .send({ success: true })
        })


        // add a new assignment
        app.post('/add-assignment', async (req, res) => {
            const assignmentData = req.body;
            const result = await assignmentCollection.insertOne(assignmentData);
            // console.log(assignmentData);
            res.send(result)
        })

        // get assignments
        app.get('/assignments', async (req, res) => {
            const { difficulty, search, page = 1, limit = 6 } = req.query; 
            const filter = {};
        
            // Filter by difficulty
            if (difficulty) {
                filter.difficulty = difficulty;
            }
        
            // Search by title or description
            if (search) {
                filter.$or = [
                    { title: { $regex: search, $options: 'i' } },
                    { description: { $regex: search, $options: 'i' } }
                ];
            }
        
            try {
                // Pagination
                const skip = (parseInt(page) - 1) * parseInt(limit); 
                const totalCount = await assignmentCollection.countDocuments(filter);
                const totalPages = Math.ceil(totalCount / limit);
        
                // Fetch with pagination
                const assignments = await assignmentCollection
                    .find(filter)
                    .skip(skip)
                    .limit(parseInt(limit))
                    .toArray();
        
                res.send({
                    assignments,
                    totalPages,
                });
            } catch (error) {
                res.status(500).send({ message: 'Error fetching assignments', error });
            }
        });
        

        // delete an assignment
        app.delete('/assignment/:id', async (req, res) => {
            const id = req.params.id;
            const query = { _id: new ObjectId(id) };
            const result = await assignmentCollection.deleteOne(query);
            res.send(result)
        })

        // get an assignment details to update
        app.get('/assignment/:id', async (req, res) => {
            const id = req.params.id
            const query = { _id: new ObjectId(id) };
            const result = await assignmentCollection.findOne(query);
            res.send(result)
        })

        // update an assignment
        app.put('/update-assignment/:id', async (req, res) => {
            const id = req.params.id;
            const assignmentData = req.body;
            const updated = {
                $set: assignmentData,
            }
            const query = { _id: new ObjectId(id) }
            const options = { upsert: true }
            const result = await assignmentCollection.updateOne(query, updated, options);
            // console.log(assignmentData);
            res.send(result)
        })

        // add a new submission
        app.post('/add-submission', async (req, res) => {
            const submissionData = req.body;
            const result = await submissionCollection.insertOne(submissionData);
            // console.log(submissionData);
            res.send(result)
        })

        // get submitted assignment of a specific user
        app.get('/my-submitted-assignment/:email', verifyToken, async (req, res) => {
            const email = req.params.email;

            const submissions = await submissionCollection.find({ userEmail: email }).toArray();

            if (!submissions.length) {
                return res.send([]);
            }

            const assignmentIds = submissions.map(submission => new ObjectId(submission.assignmentId));

            const assignments = await assignmentCollection
                .find({ _id: { $in: assignmentIds } })
                .toArray();

            const result = submissions.map(submission => {
                const assignment = assignments.find(
                    assignment => assignment._id.toString() === submission.assignmentId
                );
                return {
                    ...submission,
                    title: assignment?.title || "Unknown",
                    marks: assignment?.marks || "Unknown"
                };
            });

            res.send(result);
        });

        app.get('/pending-assignments', async (req, res) => {
            const submissions = await submissionCollection.find({ status: "Pending" }).toArray(); // Filter for pending
            const assignmentIds = submissions.map(submission => new ObjectId(submission.assignmentId));

            const assignments = await assignmentCollection
                .find({ _id: { $in: assignmentIds } })
                .toArray();

            const result = submissions.map(submission => {
                const assignment = assignments.find(
                    assignment => assignment._id.toString() === submission.assignmentId
                );
                return {
                    ...submission,
                    title: assignment?.title || "Unknown",
                    marks: assignment?.marks || "Unknown"
                };
            });

            res.send(result);
        });

        // Update assignment marks and status
        app.put('/mark-assignment/:id', async (req, res) => {
            const id = req.params.id;
            const { marks, feedback } = req.body;

            const updateSubmission = {
                $set: {
                    obtainedMarks: marks,
                    feedback,
                    status: "Completed"
                }
            };

            const result = await submissionCollection.updateOne(
                { _id: new ObjectId(id) },
                updateSubmission
            );

            res.send(result);
        });


        // Connect the client to the server	(optional starting in v4.7)
        // await client.connect();
        // Send a ping to confirm a successful connection
        // await client.db("admin").command({ ping: 1 });
        // console.log("Pinged your deployment. You successfully connected to MongoDB!");
    } finally {
        // Ensures that the client will close when you finish/error
        // await client.close();
    }
}
run().catch(console.dir);



app.get('/', (req, res) => {
    res.send('study hub server running');
})

app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
})