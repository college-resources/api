const dateToString = date => new Date(date).toISOString()

module.exports.transformData = data => ({
  ...data._doc,
  _id: data.id,
  createdAt: data._doc.createdAt && dateToString(data._doc.createdAt),
  updatedAt: data._doc.updatedAt && dateToString(data._doc.updatedAt)
})

module.exports.dateToString = dateToString
