const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')
const { departments, addDepartment } = require('./department')
const { feeding, addFeeding } = require('./feeding')

module.exports.Query = {
  lessons,
  lessonNotes,

  user,

  departments,

  feeding
}

module.exports.Mutation = {
  addLesson,
  addLessonNotes,

  registerUser,

  addDepartment,

  addFeeding
}
