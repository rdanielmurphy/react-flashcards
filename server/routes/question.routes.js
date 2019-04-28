import { Router } from 'express';
import * as QuestionController from '../controllers/question.controller';
const router = new Router();

// Get all Questions
router.route('/questions').get(QuestionController.getQuestions);

export default router;
