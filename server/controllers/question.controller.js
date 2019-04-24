import Question from '../models/question';
import categories from '../categories.json';

/**
 * Get all posts
 * @param req
 * @param res
 * @returns void
 */
export function getQuestions(req, res) {
    Question.find().sort('category').exec((err, questions) => {
        if (err) {
            res.status(500).send(err);
        }
        res.json({ categories, questions });
    });
}
