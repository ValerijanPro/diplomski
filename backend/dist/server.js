"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const multer_1 = __importDefault(require("multer"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json({ limit: '10mb' })); // Parse JSON data
mongoose_1.default.connect('mongodb://localhost:27017/diplomski', {});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const storage = multer_1.default.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, file, callBack) => {
        const fileName = 'picture-' + Date.now() + '-' + file.originalname;
        callBack(null, fileName);
    },
});
const upload = (0, multer_1.default)({
    storage: storage,
    limits: {
        fileSize: 10 * 1024 * 1024,
        fieldSize: 100 * 1024 * 1024, // Set the maximum field value size limit (e.g., 100MB)
    },
});
let nazivLogo = '';
// Import the People schema from the 'models/people.model.ts' file
const people_model_1 = __importDefault(require("./models/people.model"));
app.post('/saveTree', (req, res, next) => {
    const { tree } = req.body;
    const newPeople = new people_model_1.default({
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
//# sourceMappingURL=server.js.map