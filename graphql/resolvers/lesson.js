const Image = require('../../models/image')
const Lesson = require('../../models/lesson')
const LessonNote = require('../../models/lessonNote')

const { transformData, transformLesson, getUser, getLesson, getImages } = require('./helpers')

module.exports.lessons = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const lessons = await Lesson.find({})
    return lessons.map(transformLesson)
  } catch (err) {
    throw err
  }
}

module.exports.lessonNotes = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const lessonNotes = await LessonNote.find({ lesson: args.lesson })
    return lessonNotes.map(async lessonNote => ({
      ...transformData(lessonNote),
      images: getImages(lessonNote._doc.images),
      lesson: getLesson(lessonNote._doc.lesson),
      creator: getUser(lessonNote._doc.creator)
    }))
  } catch (err) {
    throw err
  }
}

module.exports.addLesson = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const lesson = new Lesson({
      name: args.lesson.name,
      department: args.lesson.department,
      semester: args.lesson.semester,
      creator: req.user.id
    })

    const result = await lesson.save()
    return transformLesson(result)
  } catch (err) {
    throw err
  }
}

module.exports.addLessonNotes = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const images = await Image.insertMany(
      args.lessonNote.images.map(img => ({
        url: img.url,
        uploader: req.user.id
      }))
    )

    const lessonNote = new LessonNote({
      images: images.map(img => img._doc._id),
      hypertexts: args.lessonNote.hypertexts,
      lesson: args.lessonNote.lesson,
      creator: req.user.id
    })

    const result = await lessonNote.save()
    return {
      ...transformData(result),
      images: getImages(lessonNote._doc.images),
      lesson: getLesson(lessonNote._doc.lesson),
      creator: getUser(lessonNote._doc.creator)
    }
  } catch (err) {
    throw err
  }
}
