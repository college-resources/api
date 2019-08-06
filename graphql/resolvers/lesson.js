const Image = require('../../models/image')
const Lesson = require('../../models/lesson')
const LessonNote = require('../../models/lessonNote')

const { transformLesson, transformLessonNote } = require('./helpers')

module.exports.lessons = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    // TODO: Implement search
    // TODO: Implement loader
    const lessons = await Lesson.find()
    return lessons.map(transformLesson.bind(this, req.loaders))
  } catch (err) {
    throw err
  }
}

module.exports.lessonNotes = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    // TODO: Implement search
    // TODO: Implement loader
    const lessonNotes = await LessonNote.find({ lesson: args.lesson })
    return lessonNotes.map(transformLessonNote.bind(this, req.loaders))
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
    req.loaders.lesson.prime(result.id, result)
    return transformLesson(req.loaders, result)
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

    images.forEach(image => req.loaders.image.prime(image.id, image))

    const lessonNote = new LessonNote({
      images: images.map(img => img._doc._id),
      hypertexts: args.lessonNote.hypertexts,
      lesson: args.lessonNote.lesson,
      creator: req.user.id
    })

    const result = await lessonNote.save()
    req.loaders.lessonNote.prime(result.id, result)
    return transformLessonNote(req.loaders, result)
  } catch (err) {
    throw err
  }
}
