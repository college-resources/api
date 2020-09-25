exports.dateToString = date => date ? new Date(date).toISOString() : ''

exports.transformData = data => {
  if (data._doc) {
    data = data._doc
  }

  return {
    ...data,
    createdAt: data.createdAt && this.dateToString(data.createdAt),
    updatedAt: data.updatedAt && this.dateToString(data.updatedAt)
  }
}

exports.transformDepartment = async department => {
  return {
    ...this.transformData(department)
  }
}

exports.transformImage = async (loaders, image) => {
  const uploaderId = image._doc.uploader.toString()

  const [uploader] = await Promise.all([
    loaders.user.load(uploaderId) // uploader
  ])

  return {
    ...this.transformData(image),
    uploader: () => this.transformUser(uploader)
  }
}

exports.transformLesson = async (loaders, lesson) => {
  const creatorId = lesson._doc.creator.toString()
  const departmentId = lesson._doc.department.toString()

  const [creator, department] = await Promise.all([
    loaders.user.load(creatorId), // creator
    loaders.department.load(departmentId) // department
  ])

  return {
    ...this.transformData(lesson),
    creator: () => this.transformUser(creator),
    department: () => this.transformDepartment(department)
  }
}

exports.transformLessonNote = async (loaders, lessonNote) => {
  const imagesIds = lessonNote._doc.images.map(img => img.toString())
  const lessonId = lessonNote._doc.lesson.toString()
  const creatorId = lessonNote._doc.creator.toString()
  const date = lessonNote._doc.date

  const [images, lesson, creator] = await Promise.all([
    loaders.images.loadMany(imagesIds), // images
    loaders.lesson.load(lessonId), // lesson
    loaders.user.load(creatorId) // creator
  ])

  return {
    ...this.transformData(lessonNote),
    images: () => images.map(this.transformImage.bind(this, loaders)),
    lesson: () => this.transformLesson(loaders, lesson),
    creator: () => this.transformUser(creator),
    date: () => this.dateToString(date)
  }
}

exports.transformUser = user => {
  const birthDate = user._doc.birthDate

  return {
    ...this.transformData(user),
    birthDate: this.dateToString(birthDate)
  }
}

exports.transformFeeding = async feeding => {
  return {
    ...this.transformData(feeding)
  }
}

exports.transformPreference = async (loaders, preference) => {
  const userId = preference._doc.user.toString()
  const feedingId = preference._doc.feeding.toString()
  const departmentId = preference._doc.department.toString()
  const coursesIds = preference._doc.courses.map(course => course.toString())

  const [user, feeding, department, courses] = await Promise.all([
    loaders.user.load(userId), // user
    loaders.feeding.load(feedingId), // feeding
    loaders.department.load(departmentId), // department
    loaders.courses.loadMany(coursesIds) // courses
  ])

  return {
    ...this.transformData(preference),
    user: () => this.transformUser(user),
    feeding: () => this.transformFeeding(feeding),
    department: () => this.transformDepartment(department),
    courses: () => courses.map(this.transformLesson.bind(this, loaders))
  }
}
