import 'es6-promise/auto'
import 'isomorphic-fetch'

export default class apiClient {
  static get (path) {
    const host = process.server
      ? `http://${process.env.HOST || 'localhost'}:${process.env.PORT || 3000}`
      : ''
    return fetch(`${host}${path}`)
      .then((response) => {
        if (!response.ok) {
          throw new Error(response.status + ' ' + response.statusText)
        }
        return response.json()
      })
  }
}
