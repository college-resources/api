/* eslint-disable no-useless-catch */
const Lesson = require('../../models/lesson')
const LessonNote = require('../../models/lessonNote')
const User = require('../../models/user')

const { transformData } = require('./helpers')

module.exports.lessons = async (_, args, req) => {
  try {
    req.user.checkAuthentication()

    const lessons = await Lesson.find()
    return lessons.map(lesson => transformData(lesson))
  } catch (err) {
    throw err
  }
}

module.exports.lessonNotes = async (_, args, req) => {
  try {
    req.user.checkAuthentication()

    const lessonNotes = await LessonNote.find({ lesson: args.lesson })
    return {
      ...transformData(lessonNotes),
      lesson: async () => {
        const lesson = await Lesson.find({ _id: lessonNotes._doc.lesson })
        return transformData(lesson)
      },
      creator: async () => {
        const user = await User.find({ _id: lessonNotes._doc.creator })
        return transformData(user)
      }
    }
  } catch (err) {
    throw err
  }
}

module.exports.addLesson = async (_, args, req) => {
  try {
    req.user.checkAuthentication()

    const lesson = new Lesson({
      name: args.lesson.name,
      department: args.lesson.department,
      semester: args.lesson.semester
      // TODO: creator: req.user.id
    })

    const result = await lesson.save()
    return transformData(result)
  } catch (err) {
    throw err
  }
}

module.exports.addLessonNotes = async (_, args, req) => {
  try {
    req.user.checkAuthentication()

    const lessonNote = new LessonNote({
      images: args.lessonNote.images,
      hypertexts: args.lessonNote.hypertexts,
      lesson: args.lessonNote.lesson
      // TODO: creator: req.user.id
    })

    const result = await lessonNote.save()
    return transformData(result)
  } catch (err) {
    throw err
  }
}
