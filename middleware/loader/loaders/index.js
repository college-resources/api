const DataLoader = require('dataloader')

const {
  getDepartments,
  getImages,
  getLessons,
  getLessonNotes,
  getUsers,
  getFeedings
} = require('../helpers')

module.exports = () => {
  const loaders = {}

  return {
    get department () {
      if (!loaders.department) {
        loaders.department = new DataLoader(getDepartments)
      }

      return loaders.department
    },
    get images () {
      if (!loaders.images) {
        loaders.images = new DataLoader(getImages)
      }

      return loaders.images
    },
    get lesson () {
      if (!loaders.lesson) {
        loaders.lesson = new DataLoader(getLessons)
      }

      return loaders.lesson
    },
    get lessonNote () {
      if (!loaders.lessonNote) {
        loaders.lessonNote = new DataLoader(getLessonNotes)
      }

      return loaders.lessonNote
    },
    get user () {
      if (!loaders.user) {
        loaders.user = new DataLoader(getUsers)
      }

      return loaders.user
    },
    get feeding () {
      if (!loaders.feeding) {
        loaders.feeding = new DataLoader(getFeedings)
      }

      return loaders.feeding
    }
  }
}
