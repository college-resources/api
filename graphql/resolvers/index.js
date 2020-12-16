const { lessons, lessonNotes, addLesson, addLessonNotes } = require('./lesson')
const { user, registerUser } = require('./user')
const { departments, addDepartment } = require('./department')
const { feedings, addFeeding, removeFeeding } = require('./feeding')
const { preferences, updatePreferences, deletePreference } = require('./preferences')
const { institutes, addInstitute } = require('./institute')

module.exports.Query = {
  lessons,
  lessonNotes,

  user,

  departments,

  feedings,

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
  deletePreference,

  addInstitute
}
