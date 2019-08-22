const Department = require('../../../models/department')
const Image = require('../../../models/image')
const Lesson = require('../../../models/lesson')
const User = require('../../../models/user')

exports.getDepartments = _ids => Department.find({
  _id: { $in: _ids }
})

exports.getImages = _ids => Image.find({
  _id: { $in: _ids }
})

exports.getLessons = _ids => Lesson.find({
  _id: { $in: _ids }
})

exports.getUsers = _ids => User.find({
  _id: { $in: _ids }
})
