const Image = require('../../models/image')
const Lesson = require('../../models/lesson')
const LessonNote = require('../../models/lessonNote')
const User = require('../../models/user')

const { transformData } = require('./helpers')

module.exports.lessons = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const lessons = await Lesson.find({})
    return lessons.map(lesson => ({
      ...transformData(lesson),
      creator: async () => {
        const user = await User.findOne({ _id: lesson._doc.creator })
        return transformData(user)
      }
    }))
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
      images: async () => {
        const images = await Image.find({
          _id: {
            $in: lessonNote._doc.images
          }
        })
        return images.map(img => transformData(img))
      },
      lesson: async () => {
        const lesson = await Lesson.findOne({ _id: lessonNote._doc.lesson })
        return transformData(lesson)
      },
      creator: async () => {
        const user = await User.findOne({ _id: lessonNote._doc.creator })
        return transformData(user)
      }
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
    return transformData(result)
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
      images: async () => {
        const images = await Image.find({
          _id: {
            $in: result._doc.images
          }
        })
        return images.map(img => transformData(img))
      },
      lesson: async () => {
        const lesson = await Lesson.findById(result._doc.lesson)
        return transformData(lesson)
      },
      creator: async () => {
        const user = await User.findOne({ _id: result._doc.creator })
        return transformData(user)
      }
    }
  } catch (err) {
    throw err
  }
}
