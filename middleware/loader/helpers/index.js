const Department = require('../../../models/department')
const Image = require('../../../models/image')
const Lesson = require('../../../models/lesson')
const LessonNote = require('../../../models/lessonNote')
const User = require('../../../models/user')
const Feeding = require('../../../models/feeding')
const Preferences = require('../../../models/preferences')
const Institute = require('../../../models/institute')

const sorter = sortingArr => (a, b) => (sortingArr.indexOf(a.id) - sortingArr.indexOf(b.id))

exports.getDepartments = _ids => Department.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getImages = _ids => Image.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getLessons = _ids => Lesson.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getLessonNotes = _ids => LessonNote.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getUsers = _ids => User.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getFeedings = _ids => Feeding.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getPreferences = _ids => Preferences.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))

exports.getInstitute = _ids => Institute.find({
  _id: { $in: _ids }
}).then(items => items.sort(sorter(_ids)))
