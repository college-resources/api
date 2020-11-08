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

exports.transformUser = async (loaders, user) => {
  if (user._doc) {
    user = user._doc
  }

  const birthDate = user.birthDate
  const preferencesId = user.preferences?.toString()

  const [preferences] = await Promise.all([
    preferencesId ? loaders.preferences.load(preferencesId) : Promise.resolve(null)
  ])

  return {
    ...this.transformData(user),
    birthDate: this.dateToString(birthDate),
    preferences: () => preferences && this.transformPreferences(loaders, preferences)
  }
}

exports.transformFeeding = async feeding => {
  return {
    ...this.transformData(feeding)
  }
}

exports.transformPreferences = async (loaders, preferences) => {
  if (preferences._doc) {
    preferences = preferences._doc
  }

  const userId = preferences.user.toString()
  const feedingId = preferences.feeding?.toString()
  const departmentId = preferences.department?.toString()
  const coursesIds = preferences.courses?.map(course => course.toString())

  const [user, feeding, department, courses] = await Promise.all([
    loaders.user.load(userId), // user
    feedingId ? loaders.feeding.load(feedingId) : Promise.resolve(null), // feeding
    departmentId ? loaders.department.load(departmentId) : Promise.resolve(null), // department
    coursesIds ? loaders.lesson.loadMany(coursesIds) : Promise.resolve(null) // courses
  ])

  return {
    ...this.transformData(preferences),
    user: () => this.transformUser(loaders, user),
    feeding: () => feeding && this.transformFeeding(feeding),
    department: () => department && this.transformDepartment(department),
    courses: () => coursesIds && courses.map(this.transformLesson.bind(this, loaders))
  }
}
