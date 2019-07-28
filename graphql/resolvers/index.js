const { lessons, lessonNotes, addLesson } = require('./lesson')

module.exports.Query = {
  lessons,
  lessonNotes
}

module.exports.Mutation = {
  addLesson
}
