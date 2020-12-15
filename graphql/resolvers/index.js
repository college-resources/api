const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')
const { departments, addDepartment } = require('./department')
const { feeding, addFeeding, removeFeeding } = require('./feeding')
const { preferences, updatePreferences, deletePreference } = require('./preferences')
const { institutes } = require('./institute')

module.exports.Query = {
  lessons,
  lessonNotes,

  user,

  departments,

  feeding,

  preferences,

  institutes
}

module.exports.Mutation = {
  addLesson,
  addLessonNotes,

  registerUser,

  addDepartment,

  addFeeding,
  removeFeeding,

  updatePreferences,
  deletePreference
}
