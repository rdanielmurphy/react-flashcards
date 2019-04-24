import Question from './models/question';
import crypto from 'crypto';
const readData = require('./readData');

export default function () {
  Question.count().exec((err, count) => {
    console.log('db count', count);
    if (count > 0) {
      Question.deleteMany({}, (error) => {
        if (!error) {
          console.log('DB cleared....');

          readData().then((data) => {
            let list = [];

            for (var key in data) {
              const category = key;
              const questions = data[key];
              let i = 0;
              questions.forEach(element => {
                const uuid = crypto.randomBytes(16).toString("hex");
                list.push(new Question({ category: category, question: element.question, answer: element.answer, cuid: uuid, order: i++ }));
              });
            }

            Question.create(list, (error) => {
              if (!error) {
                console.log('DB is ready to go....');
              } else {
                console.log('DB setup failed....');
                console.log(error);
              }
            });
          });
        } else {
          console.log('DB clear failed....');
          console.log(error);
        }
      });
    }
  });
}
