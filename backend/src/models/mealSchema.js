import mongoose from 'mongoose';

const mealSchema = new mongoose.Schema({
    title: {
        type: String,
        trim: true,
        minLength: [5, "The meal title must have atleast 5 characters"],
        maxLength: [30, "The meal title must have atmost 30 characters"],
        required: true
    },

    description: {
        type: String,
        trim: true,
        minLength: [10, "The meal title must have atleast 10 characters"],
        maxLength: [50, "The meal title must have atmost 50 characters"],
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    image: {
        type: String
    },

     chefId: {  
        type: mongoose.Schema.Types.ObjectId,
        ref: "User", 
        required: true
    }
}, {timestamps: true});

const Meal = mongoose.model("Meal", mealSchema);
export default Meal;