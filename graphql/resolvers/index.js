const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')
const { departments, addDepartment } = require('./department')

module.exports.Query = {
  lessons,
  lessonNotes,

  user,

  departments
}

module.exports.Mutation = {
  addLesson,
  addLessonNotes,

  registerUser,

  addDepartment
}
