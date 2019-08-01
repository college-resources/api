const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')

module.exports.Query = {
  lessons,
  lessonNotes,

  user
}

module.exports.Mutation = {
  addLesson,
  addLessonNotes,

  registerUser
}
