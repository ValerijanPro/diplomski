"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const mongoose_1 = __importDefault(require("mongoose"));
const body_parser_1 = __importDefault(require("body-parser"));
const people_1 = __importDefault(require("./models/people"));
const line_1 = __importDefault(require("./models/line"));
const multer = require('multer');
const app = (0, express_1.default)();
app.use((0, cors_1.default)());
app.use(body_parser_1.default.json());
mongoose_1.default.connect('mongodb://localhost:27017/diplomski', {});
const connection = mongoose_1.default.connection;
connection.once('open', () => {
    console.log('db connection ok');
});
const storage = multer.diskStorage({
    destination: (req, file, callBack) => {
        callBack(null, 'uploads');
    },
    filename: (req, fajl, callBack) => {
        nazivLogo = 'picture-' + Date.now() + '-' + fajl.originalname;
        callBack(null, nazivLogo);
    }
});
let upload = multer({ storage: storage });
//let upload = multer({dest: 'uploads/'})
let nazivLogo = "";
const getCircularReplacer = () => {
    const seen = new WeakSet();
    return (key, value) => {
        if (typeof value === 'object' && value !== null) {
            if (seen.has(value)) {
                return;
            }
            seen.add(value);
        }
        return value;
    };
};
app.post("/saveNode", upload.single('picture'), (req, res, next) => {
    let node = req.body.node;
    let lines = [];
    node.lines.forEach(temp => {
        let l = new line_1.default({
            'x0': temp.x0,
            'y0': temp.y0,
            'x1': temp.x1,
            'y1': temp.y1,
            'love': temp.love,
            'kind': temp.kind
        });
        lines.push(l);
    });
    let person = new people_1.default({
        'id': node.id,
        'broj': node.broj,
        'name': node.name,
        'surname': node.surname,
        'gender': node.gender,
        'date_of_birth': node.date_of_birth,
        'place_of_birth': node.place_of_birth,
        'date_of_death': node.date_of_death,
        'picture': node.picture,
        'profession': node.profession,
        'owner': node.owner,
        'mother': node.mother,
        'father': node.father,
        'children': node.children,
        'partner': node.partner,
        'next_sibling': node.next_sibling,
        'prev_sibling': node.prev_sibling,
        'x': node.x,
        'y': node.y,
        'r': node.r,
        'highlighted': node.highlighted,
        'lines': lines
    });
    person = JSON.stringify(person);
    //person = JSON.parse(JSON.stringify(person, getCircularReplacer()));
    /*

    person.save().then(p =>{
        res.json(p);
    }).catch(err=>{
        res.status(400).json({'message':'Bad data for person'})
    });
    */
    res.json({ 'message': 'ok' });
});
app.listen(4000, () => console.log(`Express server running on port 4000`));
//# sourceMappingURL=server.js.map