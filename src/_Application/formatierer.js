class Formatierer {
  dateFuerInput(date) {
    return new Date(date).toISOString().split('T')[0]
  }

  dateFuerQuasarInput(date) {
    return new Date(date).toISOString().split('T')[0].replaceAll('-', '/')
  }
}

export default new Formatierer()
