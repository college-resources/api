const dateToString = date => new Date(date).toISOString()

module.exports.transformData = data => {
  if (data._doc) {
    data = data._doc
  }

  return {
    ...data,
    _id: data._id.toString(),
    createdAt: data.createdAt && dateToString(data.createdAt),
    updatedAt: data.updatedAt && dateToString(data.updatedAt)
  }
}

module.exports.dateToString = dateToString
