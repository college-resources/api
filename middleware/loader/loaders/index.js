const DataLoader = require('dataloader')

const {
  getDepartments,
  getImages,
  getLessons,
  getUsers
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
    get user () {
      if (!loaders.user) {
        loaders.user = new DataLoader(getUsers)
      }

      return loaders.user
    }
  }
}
