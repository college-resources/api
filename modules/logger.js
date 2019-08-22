exports = err => {
  if (process.env.NODE_ENV === 'development') {
    console.trace(err)
  } else {
    console.log(err.message)
  }
}
