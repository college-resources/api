const Department = require('../../models/department')

module.exports.departments = async (_, args, req) => {
  try {
    const departments = await Department.find()
    return departments.map(d => d._doc)
  } catch (err) {
    throw err
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
    return result._doc
  } catch (err) {
    throw err
  }
}
