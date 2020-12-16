const ogs = require('open-graph-scraper')

const logger = require('../../modules/logger')
const Image = require('../../models/image')
const Lesson = require('../../models/lesson')
const LessonNote = require('../../models/lessonNote')

const { transformLesson, transformLessonNote } = require('./helpers')

module.exports.lessons = async (_, args, req) => {
  try {
    // TODO: Implement loader

    const lessons = await Lesson.find({ department: args.departmentId })

    return lessons.map(transformLesson.bind(this, req.loaders))
  } catch (err) {
    logger(err)
  }
}

module.exports.lessonNotes = async (_, args, req) => {
  try {
    // TODO: Implement search
    // TODO: Implement loader
    const lessonNotes = await LessonNote.find({ lesson: args.lesson })
    return lessonNotes.map(transformLessonNote.bind(this, req.loaders))
  } catch (err) {
    logger(err)
  }
}

module.exports.addLesson = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const lesson = new Lesson({
      name: args.lesson.name,
      department: args.lesson.department,
      semester: args.lesson.semester,
      lessonCode: args.lesson.lessonCode,
      hoursLab: args.lesson.hoursLab,
      hoursTheory: args.lesson.hoursTheory,
      credit: args.lesson.credit,
      type: args.lesson.type,
      creator: req.user.id
    })

    const result = await lesson.save()
    req.loaders.lesson.prime(result.id, result)
    return transformLesson(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}

module.exports.addLessonNotes = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const images = args.lessonNote.images
      ? await Image.insertMany(await Promise.all(
        args.lessonNote.images.map(async img => ({
          url: img.url,
          uploader: req.user.id,
          details: await ogs({ url: img.url })
            .then(({ result }) => result.ogImage || {})
            .then(({ url, width, height, type }) => ({ url, width, height, type }))
            .catch(() => null) || {}
        }))
      ))
      : []

    images.forEach(image => req.loaders.images.prime(image.id, image))

    const lessonNote = new LessonNote({
      title: args.lessonNote.title,
      date: args.lessonNote.date
        ? new Date(args.lessonNote.date)
        : new Date(0),
      examMonth: args.lessonNote.examMonth,
      images: images.map(img => img._doc._id),
      hypertexts: args.lessonNote.hypertexts,
      lesson: args.lessonNote.lesson,
      creator: req.user.id
    })

    const result = await lessonNote.save()
    req.loaders.lessonNote.prime(result.id, result)
    return transformLessonNote(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}
