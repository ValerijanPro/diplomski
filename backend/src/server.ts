import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import multer from 'multer';

const app = express();
app.use(cors());
app.use(bodyParser.json({ limit: '10mb' })); // Parse JSON data
mongoose.connect('mongodb://localhost:27017/diplomski', {});
const connection = mongoose.connection;
connection.once('open', () => {
  console.log('db connection ok');
});

const storage = multer.diskStorage({
  destination: (req, file, callBack) => {
    callBack(null, 'uploads');
  },
  filename: (req, file, callBack) => {
    const fileName = 'picture-' + Date.now() + '-' + file.originalname;
    callBack(null, fileName);
  },
});

const upload = multer({
    storage: storage,
    limits: {
      fileSize: 10 * 1024 * 1024, // Set the maximum file size limit
      fieldSize: 100 * 1024 * 1024, // Set the maximum field value size limit (e.g., 100MB)
    },
  });
let nazivLogo = '';

// Import the People schema from the 'models/people.model.ts' file
import  People from './models/people.model';
app.post('/saveTree', (req, res, next) => {
  const { tree } = req.body;

  const newPeople = new People({
    id: tree.id,
    name: tree.name,
    surname: tree.surname,
    gender: tree.gender,
    date_of_birth: tree.date_of_birth,
    picture: tree.picture
  });

  newPeople.save()
    .then(savedPeople => {
      res.status(201).json(savedPeople);
    })
    .catch(error => {
      console.error('Failed to save People to the database:', error);
      res.status(500).json({ error: 'Failed to save People to the database' });
    });
});
  

app.listen(4000, () => console.log(`Express server running on port 4000`));