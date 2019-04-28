## Simple MERN stack flashcard app! ##

Qustion and answers are in Markdown format, giving you some formatting flexibility.

Flashcard data under server/data folder and is loaded into Mongo at startup.  Categories file is at server/categories.json.  Update it when adding/removing/modifiying a category.   Add flashcards by creating .fc files, copying question/answer format from examples.

try static example at http://flashcards.rdanielmurphy.com

Started from flashcard example here:
https://codepen.io/mattgreenberg/pen/ggOpOr

### To run: ###
```
 docker-compose build
 docker-compose up
```
