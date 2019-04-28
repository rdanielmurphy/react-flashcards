import test from 'ava';
import request from 'supertest';
import app from '../../server';
import Question from '../question';
import { connectDB, dropDB } from '../../util/test-helpers';

// Initial questions added into test db
const questions = [
    new Question({ category: 'Prashant', question: 'Hello Mern', answer: 'hello-mern', cuid: 'f34gb2bh24b24b2', order: 0 }),
    new Question({ category: 'Mayank', question: 'Hi Mern', answer: 'hi-mern', cuid: 'f34gb2bh24b24b3', order: 1 })
];

test.before('connect to mockgoose', async () => {
    await connectDB();
});

test.beforeEach('connect and add two question entries', async () => {
    await Question.create(questions).catch(() => 'Unable to create questions');
});

test.afterEach.always(async () => {
    await dropDB();
});

test.serial('Should correctly give number of Questions', async t => {
    t.plan(2);

    const res = await request(app)
        .get('/api/questions')
        .set('Accept', 'application/json');

    t.is(res.status, 200);
    t.deepEqual(questions.length, res.body.questions.length);
});

// test.serial('Should send correct data when queried against a cuid', async t => {
//     t.plan(2);

//     const question = new Question({ category: 'Lipsum', question: 'Bye Mern', answer: 'bye-mern', cuid: 'ew4gb2bh24b24a5', order: 3 });
//     question.save();

//     const res = await request(app)
//         .get('/api/questions/f34gb2bh24b24b2')
//         .set('Accept', 'application/json');

//     t.is(res.status, 200);
//     t.is(res.body.question.name, question.name);
// });

// test.serial('Should correctly add a question', async t => {
//     t.plan(2);

//     const res = await request(app)
//         .post('/api/questions')
//         .send({ question: { category: 'Foo', question: 'bar', answer: 'Hello Mern says Foo' } })
//         .set('Accept', 'application/json');

//     t.is(res.status, 200);

//     const savedQuestion = await Question.findOne({ title: 'bar' }).exec();
//     t.is(savedQuestion.name, 'Foo');
// });

// test.serial('Should correctly delete a question', async t => {
//     t.plan(2);

//     const question = new Question({ category: 'Foo', question: 'bar', answer: 'bar', cuid: 'qt4gb2bh24b24b7', order: 5 });
//     question.save();

//     const res = await request(app)
//         .delete(`/api/questions/${question.cuid}`)
//         .set('Accept', 'application/json');

//     t.is(res.status, 200);

//     const queriedQuestions = await Question.findOne({ cuid: question.cuid }).exec();
//     t.is(queriedQuestions, null);
// });
