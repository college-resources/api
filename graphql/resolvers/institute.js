const logger = require('../../modules/logger')
const Institute = require('../../models/institute')

const { transformInstitute } = require('./helpers')

module.exports.institutes = async (_, args, req) => {
  try {
    const institutes = await Institute.find()
    return institutes.map(i => transformInstitute(req.loaders, i))
  } catch (err) {
    logger(err)
  }
}