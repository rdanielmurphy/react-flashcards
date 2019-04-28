import mongoose from 'mongoose';
const Schema = mongoose.Schema;

const questionSchema = new Schema({
    category: { type: 'String', required: true },
    question: { type: 'String', required: true },
    answer: { type: 'String', required: true },
    order: { type: 'Number', required: true },
    cuid: { type: 'String', required: true }
});

export default mongoose.model('Question', questionSchema);
