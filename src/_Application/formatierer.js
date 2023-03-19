class Formatierer {
  dateFuerInput(date) {
    return new Date(date).toISOString().split('T')[0]
  }
}

export default new Formatierer()
