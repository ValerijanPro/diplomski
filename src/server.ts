import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';

import bodyParser from 'body-parser';
const multer = require('multer');
import people from '../models/people';
import line from '../models/line';

const app = express();
app.use(cors());
app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/diplomski',{  });
const connection = mongoose.connection;
connection.once('open',()=>{
    console.log('db connection ok');
})

const storage = multer.diskStorage({
    destination: (req: any, file: any, callBack: any) => {
        callBack(null, 'uploads')
    },
    filename: (req:any, fajl:any, callBack:any) => {
        nazivLogo = 'picture-'+Date.now() + '-'+fajl.originalname;
        callBack(null, nazivLogo);
    }
});

let upload = multer({storage:storage});
//let upload = multer({dest: 'uploads/'})
let nazivLogo = "";

app.post("/ddd",(req,res)=>{
    console.log("Pera");
})

app.post("/saveNode", upload.single('picture'), (req, res, next)=>{
    console.log("KURCINA");
    /*
    let node = req.body.node;
    let lines = [];
    node.lines.forEach(temp => {
        let l = new line({
            'x0':temp.x0,
            'y0':temp.y0,
            'x1':temp.x1,
            'y1':temp.y1,
            'love':temp.love,
            'kind':temp.kind
        })
        lines.push(l);
    });

    let person = new people({
        'id':node.id,
        'broj':node.broj,
        'name':node.name,
        'surname':node.surname,
        'gender':node.gender,
        'date_of_birth':node.date_of_birth,
        'place_of_birth':node.place_of_birth,
        'date_of_death':node.date_of_death,
        'picture':node.picture,
        'profession':node.profession,
        'owner':node.owner,

        'mother':node.mother,
        'father':node.father,
        'children':node.children,
        'partner':node.partner,
        'next_sibling':node.next_sibling,
        'prev_sibling':node.prev_sibling,

        'x':node.x,
        'y':node.y,
        'r':node.r,
        'highlighted':node.highlighted,
        'lines':lines
    })

    person.save().then(p =>{
        res.json(p);
    }).catch(err=>{
        res.status(400).json({'message':'Bad data for person'})
    });*/
})

app.listen(4000, () => console.log(`Express server running on port 4001`));


