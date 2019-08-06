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
    createdAt: data.createdAt && this.dateToString(data.createdAt),
    updatedAt: data.updatedAt && this.dateToString(data.updatedAt)
  }
}

exports.transformImage = async (loaders, image) => {
  const uploaderId = image._doc.uploader.toString()

  const [uploader] = await Promise.all([
    loaders.user.load(uploaderId) // uploader
  ])

  return {
    ...this.transformData(image),
    uploader: () => this.transformUser(uploader)
  }
}

exports.transformLesson = async (loaders, lesson) => {
  const creatorId = lesson._doc.creator.toString()

  const [creator] = await Promise.all([
    loaders.user.load(creatorId) // creator
  ])

  return {
    ...this.transformData(lesson),
    creator: () => this.transformUser(creator)
  }
}

exports.transformLessonNote = async (loaders, lessonNote) => {
  const imagesIds = lessonNote._doc.images.map(img => img.toString())
  const lessonId = lessonNote._doc.lesson.toString()
  const creatorId = lessonNote._doc.creator.toString()

  const [images, lesson, creator] = await Promise.all([
    loaders.images.loadMany(imagesIds), // images
    loaders.lesson.load(lessonId), // lesson
    loaders.user.load(creatorId) // creator
  ])

  return {
    ...this.transformData(lessonNote),
    images: () => images.map(this.transformImage.bind(this, loaders)),
    lesson: () => this.transformLesson(loaders, lesson),
    creator: () => this.transformUser(creator)
  }
}

exports.transformUser = user => {
  const birthDate = user._doc.birthDate

  return {
    ...this.transformData(user),
    birthDate: this.dateToString(birthDate)
  }
}

exports.getImages = _ids => Image.find({
  _id: { $in: _ids }
})

exports.getLessons = _ids => Lesson.find({
  _id: { $in: _ids }
})

exports.getUsers = _ids => User.find({
  _id: { $in: _ids }
})

exports.getLesson = Lesson.findById

exports.getUser = User.findById