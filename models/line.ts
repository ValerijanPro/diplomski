import mongoose from "mongoose";

const Schema = mongoose.Schema;


let Line = new Schema({
    x0:{
        type:Number
    },
    y0:{
        type:Number
    },
    x1:{
        type:Number
    },
    y1:{
        type:Number
    },
    love:{
        type:String
    },
    kind:{
        type:String
    }
})



export default mongoose.model('Line', Line, 'lines');