const Image = require('../../models/image')
const Lesson = require('../../models/lesson')
const User = require('../../models/user')

exports.dateToString = date => new Date(date).toISOString()

exports.transformData = data => {
  if (data._doc) {
    data = data._doc
  }

  return {
    ...data,
    _id: data._id.toString(),
    createdAt: data.createdAt && exports.dateToString(data.createdAt),
    updatedAt: data.updatedAt && exports.dateToString(data.updatedAt)
  }
}

exports.transformLesson = lesson => ({
  ...exports.transformData(lesson),
  creator: exports.getUser(lesson._doc.creator)
})

exports.transformUser = user => ({
  ...exports.transformData(user),
  birthDate: exports.dateToString(user._doc.birthDate)
})

exports.getImages = _ids => async () => {
  const images = await Image.find({
    _id: { $in: _ids }
  })
  return images.map(img => exports.transformData(img))
}

exports.getLesson = _id => async () => {
  const lesson = await Lesson.findOne({ _id })
  return exports.transformLesson(lesson)
}

exports.getUser = _id => async () => {
  const user = await User.findOne({ _id })
  return exports.transformUser(user)
}