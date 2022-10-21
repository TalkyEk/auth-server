import mongoose from 'mongoose';

export const mongo = async () => await mongoose.connect(`mongodb+srv://yehor:yehorauth@cluster0.h1uhz.mongodb.net/?retryWrites=true&w=majority`);
