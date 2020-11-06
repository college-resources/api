const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')
const { departments, addDepartment } = require('./department')
const { feeding, addFeeding, removeFeeding } = require('./feeding')
const { preference, updatePreferences } = require('./preference')

module.exports.Query = {
  lessons,
  lessonNotes,

  user,

  departments,

  feeding,

  preference
}

module.exports.Mutation = {
  addLesson,
  addLessonNotes,

  registerUser,

  addDepartment,

  addFeeding,
  removeFeeding,

  updatePreferences
}
