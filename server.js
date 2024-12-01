require('dotenv').config(); // Load environment variables

const express = require('express');
const mongoose = require('mongoose');
const multer = require('multer');
const bodyParser = require('body-parser');
const session = require('express-session');
const path = require('path');


// Models
const Student = require('./models/Student');
const Trainer = require('./models/Trainer');
const Fee = require("./models/Fee");
const Attendance = require('./models/Attendance');
const CourseOverview = require('./models/CourseOverview');
const CourseStatus = require('./models/CourseStatus');
const Progress = require('./models/progress');
const Exam = require('./models/Exam');

const app = express();

// Middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(session({
    secret: process.env.SESSION_SECRET, // Use secret from .env file
    resave: false,
    saveUninitialized: true,
}));


// MongoDB Connection
mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Connected to MongoDB'))
.catch((err) => console.log('Failed to connect to MongoDB:', err));


app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'page1.html'));
});


// Student Routes
app.post('/api/students', async (req, res) => {
    try {
        const student = new Student(req.body);
        await student.save();
        res.status(201).send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/api/students', async (req, res) => {
    const search = req.query.search || '';
    try {
        const students = await Student.find({ name: new RegExp(search, 'i') });
        res.send(students);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/api/students/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const student = await Student.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!student) {
            return res.status(404).send({ error: 'Student not found' });
        }
        res.send(student);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Trainer Routes
app.post('/api/trainers', async (req, res) => {
    try {
        const trainer = new Trainer(req.body);
        await trainer.save();
        res.status(201).send(trainer);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

app.get('/api/trainers', async (req, res) => {
    const search = req.query.search || '';
    try {
        const trainers = await Trainer.find({ name: new RegExp(search, 'i') });
        res.send(trainers);
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
});

app.put('/api/trainers/:id', async (req, res) => {
    const { id } = req.params;
    try {
        const trainer = await Trainer.findByIdAndUpdate(id, req.body, { new: true, runValidators: true });
        if (!trainer) {
            return res.status(404).send({ error: 'Trainer not found' });
        }
        res.send(trainer);
    } catch (error) {
        res.status(400).send({ error: error.message });
    }
});

// Document Schema for file storage in MongoDB
const documentSchema = new mongoose.Schema({
    identityProof: { data: Buffer, contentType: String, filename: String },
    addressProof: { data: Buffer, contentType: String, filename: String },
    qualificationCertificate: { data: Buffer, contentType: String, filename: String },
    resume: { data: Buffer, contentType: String, filename: String },
    profilePhoto: { data: Buffer, contentType: String, filename: String }
});
const Document = mongoose.model("Document", documentSchema);

// Configure multer for file uploads
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// File Upload Route
app.post('/upload', upload.fields([
    { name: 'identityProof', maxCount: 1 },
    { name: 'addressProof', maxCount: 1 },
    { name: 'qualificationCertificate', maxCount: 1 },
    { name: 'resume', maxCount: 1 },
    { name: 'profilePhoto', maxCount: 1 }
]), async (req, res) => {
    try {
        const newDocument = new Document({
            identityProof: req.files['identityProof'] ? {
                data: req.files['identityProof'][0].buffer,
                contentType: req.files['identityProof'][0].mimetype,
                filename: req.files['identityProof'][0].originalname
            } : null,
            addressProof: req.files['addressProof'] ? {
                data: req.files['addressProof'][0].buffer,
                contentType: req.files['addressProof'][0].mimetype,
                filename: req.files['addressProof'][0].originalname
            } : null,
            qualificationCertificate: req.files['qualificationCertificate'] ? {
                data: req.files['qualificationCertificate'][0].buffer,
                contentType: req.files['qualificationCertificate'][0].mimetype,
                filename: req.files['qualificationCertificate'][0].originalname
            } : null,
            resume: req.files['resume'] ? {
                data: req.files['resume'][0].buffer,
                contentType: req.files['resume'][0].mimetype,
                filename: req.files['resume'][0].originalname
            } : null,
            profilePhoto: req.files['profilePhoto'] ? {
                data: req.files['profilePhoto'][0].buffer,
                contentType: req.files['profilePhoto'][0].mimetype,
                filename: req.files['profilePhoto'][0].originalname
            } : null
        });

        await newDocument.save();
        res.status(200).send("Files uploaded successfully!");
    } catch (error) {
        console.error(error);
        res.status(500).send("An error occurred during file upload.");
    }
});

// Preview Route
app.get('/preview/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const document = await Document.findOne({
            $or: [
                { "identityProof.filename": filename },
                { "addressProof.filename": filename },
                { "qualificationCertificate.filename": filename },
                { "resume.filename": filename },
                { "profilePhoto.filename": filename }
            ]
        });

        if (!document) return res.status(404).send({ error: 'Document not found' });

        let documentData;
        let contentType;

        if (document.identityProof && document.identityProof.filename === filename) {
            documentData = document.identityProof.data;
            contentType = document.identityProof.contentType;
        } else if (document.addressProof && document.addressProof.filename === filename) {
            documentData = document.addressProof.data;
            contentType = document.addressProof.contentType;
        } else if (document.qualificationCertificate && document.qualificationCertificate.filename === filename) {
            documentData = document.qualificationCertificate.data;
            contentType = document.qualificationCertificate.contentType;
        } else if (document.resume && document.resume.filename === filename) {
            documentData = document.resume.data;
            contentType = document.resume.contentType;
        } else if (document.profilePhoto && document.profilePhoto.filename === filename) {
            documentData = document.profilePhoto.data;
            contentType = document.profilePhoto.contentType;
        }

        res.set('Content-Type', contentType);
        res.send(documentData);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving the document' });
    }
});

// Download Route
app.get('/download/:filename', async (req, res) => {
    const filename = req.params.filename;

    try {
        const document = await Document.findOne({
            $or: [
                { "identityProof.filename": filename },
                { "addressProof.filename": filename },
                { "qualificationCertificate.filename": filename },
                { "resume.filename": filename },
                { "profilePhoto.filename": filename }
            ]
        });

        if (!document) return res.status(404).send({ error: 'Document not found' });

        let documentData;
        let contentType;

        if (document.identityProof && document.identityProof.filename === filename) {
            documentData = document.identityProof.data;
            contentType = document.identityProof.contentType;
        } else if (document.addressProof && document.addressProof.filename === filename) {
            documentData = document.addressProof.data;
            contentType = document.addressProof.contentType;
        } else if (document.qualificationCertificate && document.qualificationCertificate.filename === filename) {
            documentData = document.qualificationCertificate.data;
            contentType = document.qualificationCertificate.contentType;
        } else if (document.resume && document.resume.filename === filename) {
            documentData = document.resume.data;
            contentType = document.resume.contentType;
        } else if (document.profilePhoto && document.profilePhoto.filename === filename) {
            documentData = document.profilePhoto.data;
            contentType = document.profilePhoto.contentType;
        }

        res.set('Content-Disposition', `attachment; filename="${filename}"`);
        res.set('Content-Type', contentType);
        res.send(documentData);
    } catch (error) {
        res.status(500).send({ error: 'An error occurred while retrieving the document' });
    }
});


// Route to add a new fee record
app.post('/addFee', async (req, res) => {
    const { email, DateofBirth, feesDue, lastPaidDate } = req.body;

    try {
        const newFee = new Fee({ email, DateofBirth, feesDue, lastPaidDate });
        await newFee.save();
        res.json({ success: true });
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to add fee record' });
    }
});

// Route to get all fee records
app.get('/getFees', async (req, res) => {
    try {
        const fees = await Fee.find();
        res.json({ fees });
    } catch (err) {
        console.error(err);
        res.json({ fees: [] });
    }
});

// Route to delete a fee record
app.delete('/deleteFee/:id', async (req, res) => {
    const feeId = req.params.id;

    try {
        const deletedFee = await Fee.findByIdAndDelete(feeId);
        if (deletedFee) {
            res.json({ success: true });
        } else {
            res.json({ success: false, message: 'Fee record not found' });
        }
    } catch (err) {
        console.error(err);
        res.json({ success: false, message: 'Failed to delete fee record' });
    }
});
// Attendance Route
app.post('/api/attendance', async (req, res) => {
    try {
      const { email, dob, name, attendanceDetails } = req.body;
      const attendance = new Attendance({ email, dob, name, attendanceDetails });
      await attendance.save();
      res.status(200).json({ message: 'Attendance uploaded successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  // Course Overview Route
  app.post('/api/course-overview', async (req, res) => {
    try {
      const { email, dob, name, courseDescription, courseName } = req.body;
      const overview = new CourseOverview({ email, dob, name, courseDescription, courseName });
      await overview.save();
      res.status(200).json({ message: 'Course overview uploaded successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  
  
  app.post('/api/course-status', upload.single('certificate'), async (req, res) => {
    try {
        const { email, dob, name, courseName, status } = req.body;

        const certificate = req.file
            ? {
                  data: req.file.buffer,
                  contentType: req.file.mimetype,
                  filename: req.file.originalname,
              }
            : null;

        const courseStatus = new CourseStatus({
            email,
            dob,
            name,
            courseName,
            status,
            certificate,
        });

        await courseStatus.save();
        res.status(200).json({ message: 'Course status uploaded successfully.' });
    } catch (error) {
        console.error('Error saving course status:', error.message);
        res.status(500).json({ error: error.message });
    }
});

// Route to fetch course status
app.get('/api/course-status/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const courseStatus = await CourseStatus.findOne({ email });

        if (!courseStatus) {
            return res.status(404).json({ message: 'Course status not found.' });
        }

        res.json(courseStatus);
    } catch (error) {
        console.error('Error fetching course status:', error.message);
        res.status(500).json({ error: error.message });
    }
});
// Save progress
app.post('/api/progress', async (req, res) => {
    try {
        const { email, weeklyAssessment, monthlyAssessment, practicalExam, finalExam, totalMarks, grade } = req.body;
        const progress = new Progress({ email, weeklyAssessment, monthlyAssessment, practicalExam, finalExam, totalMarks, grade });
        await progress.save();
        res.status(201).json({ message: 'Progress saved successfully.' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// Fetch progress
app.get('/api/progress/:email', async (req, res) => {
    try {
        const { email } = req.params;
        const progress = await Progress.findOne({ email });
        if (!progress) {
            return res.status(404).json({ message: 'Progress not found.' });
        }
        res.json(progress);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// API to save exam details
app.post('/api/exams', async (req, res) => {
    try {
        const { email, name, dob, registrationNumber, courseName } = req.body;

        const exam = new Exam({
            email,
            name,
            dob,
            registrationNumber,
            courseName,
        });

        await exam.save();
        res.status(201).json({ message: 'Exam details saved successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error saving exam details', error });
    }
});

  

  
// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
