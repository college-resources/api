const DataLoader = require('dataloader')

const { getImages, getLessons, getUsers } = require('../graphql/resolvers/helpers')

module.exports = (req, res, next) => {
  const loaders = {}
  req.loaders = {
    get images() {
      if (!loaders.images) {
        loaders.images = new DataLoader(getImages)
      }

      return loaders.images
    },
    get lesson() {
      if (!loaders.lesson) {
        loaders.lesson = new DataLoader(getLessons)
      }

      return loaders.lesson
    },
    get user() {
      if (!loaders.user) {
        loaders.user = new DataLoader(getUsers)
      }

      return loaders.user
    }
  }

  next()
}