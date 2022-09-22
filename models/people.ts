import mongoose from "mongoose";

const Schema = mongoose.Schema;


let People = new Schema({
    id:{
        type:Number
    },
    broj:{
        type:Number
    },
    name:{
        type:String
    },
    surname:{
        type:String
    }, 
    gender:{
        type:String
    },
    date_of_birth:{
        type:String
    },
    date_of_death:{
        type:String
    },
    place_of_birth:{
        type:String
    },
    picture:{
        type:String
    },
    profession:{
        type:String
    },
    other:{
        type:String
    },
    x:{
        type:Number
    },
    y:{
        type:Number
    },
    r:{
        type:Number
    },
    highlighted:{
        type:String
    },
    children:{
        type:Array
    },
    partner:{
        type:Array
    },
    lines:{
        type:Array
    },
    owner:{
        type: String
    }
    
})

People.add({
    mother: [People],
    father: [People],
    next_sibling: [People],
    prev_sibling: [People]
})

export default mongoose.model('People', People, 'people');