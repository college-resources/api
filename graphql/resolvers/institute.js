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

module.exports.addInstitute = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const institute = new Institute({
      name: args.institute.name,
      acronym: args.institute.acronym,
      feedings: args.institute.feedings
    })

    const result = await institute.save()
    req.loaders.institute.prime(result.id, result)
    return transformInstitute(req.loaders, result)
  } catch (err) {
    logger(err)
  }
}