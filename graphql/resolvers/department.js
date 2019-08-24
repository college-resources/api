const logger = require('../../modules/logger')
const Department = require('../../models/department')

const { transformDepartment } = require('./helpers')

module.exports.departments = async (_, args, req) => {
  try {
    const departments = await Department.find()
    return departments.map(transformDepartment)
  } catch (err) {
    logger(err)
  }
}

module.exports.addDepartment = async (_, args, req) => {
  try {
    await req.user.checkAuthentication()

    const department = new Department({
      name: args.department.name,
      institute: args.department.institute
    })

    const result = await department.save()
    req.loaders.department.prime(result.id, result)
    return transformDepartment(result)
  } catch (err) {
    logger(err)
  }
}
