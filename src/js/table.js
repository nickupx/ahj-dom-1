/* eslint-disable array-callback-return */
/* eslint-disable consistent-return */
/* eslint-disable no-unused-expressions */
/* eslint-disable guard-for-in */
/* eslint-disable class-methods-use-this */
import data from './data.json'

export default class Table {
  constructor() {
    this.rows = data
    this.order = ['id', 'title', 'year', 'imdb']
    this.arr = []
    this.tbody = document.getElementById('table-body')
    this.sortedBy = []
  }

  init() {
    this.renderHeader()
    this.renderRows()
  }

  renderHeader() {
    const th = document.getElementById('table-header')
    th.innerHTML = ''
    for (const item of this.order) {
      const td = document.createElement('td')
      td.id = `th-${item}`
      td.dataset.title = item
      td.textContent = `${item}`
      th.appendChild(td)
    }
    if (this.sortedBy.length) {
      const active = document.getElementById(`th-${this.sortedBy[0]}`)
      const arrow = this.sortedBy[1] === 'desc' ? '&darr;' : '&uarr;'
      active.innerHTML = `${this.sortedBy[0]} ${arrow}`
    }
  }

  renderRows() {
    for (const item of this.rows) {
      const tr = document.createElement('tr')
      for (const keys in item) {
        tr.dataset[keys] = item[keys]
      }
      const html = `
      <td>${tr.dataset.id}</td>
      <td>${tr.dataset.title}</td>
      <td>(${tr.dataset.year})</td>
      <td>imdb: ${this.addZeros(tr.dataset.imdb)}</td>
      `
      tr.innerHTML = html
      this.tbody.appendChild(tr)
      this.arr.push(tr)
    }
  }

  updateRows() {
    this.tbody.innerHTML = ''
    for (const item of this.arr) {
      this.tbody.appendChild(item)
    }
    this.renderHeader()
  }

  addZeros(num) {
    const dec = num.split('.')[1]
    const len = dec && dec.length > 2 ? dec.length : 2
    return Number(num).toFixed(len)
  }

  reverse() {
    this.arr.reverse()
    this.updateRows()
  }

  sort(field) {
    if (this.sortedBy[0] !== field) {
      if (field === 'title') {
        this.arr.sort((a, b) => {
          const titleA = a.dataset.title.toLowerCase()
          const titleB = b.dataset.title.toLowerCase()
          if (titleA < titleB) return -1
        })
      } else {
        this.arr.sort((a, b) => a.dataset[field] - b.dataset[field])
      }
      this.sortedBy = [field, 'desc']
      this.updateRows()
      return
    }
    if (this.sortedBy[1] === 'desc') {
      this.sortedBy[1] = 'asc'
      this.reverse()
      return
    }
    this.sortedBy[1] = 'desc'
    this.reverse()
  }
}
