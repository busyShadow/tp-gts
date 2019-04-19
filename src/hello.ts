import * as _ from 'lodash'

export function hello(name: string) {
  return _.capitalize(`Hello ${name}`)
}