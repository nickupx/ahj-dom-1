/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import '../css/style.css'

// сделаем настраиваемый размер поля
const FIELD_DIMENSION = 4
const CELL_SIZE = 200

const field = document.getElementById('field')
field.style.width = `${FIELD_DIMENSION * CELL_SIZE}px`

const imgSrc = 'https://github.com/netology-code/ahj-homeworks/raw/simplification/dom/pic/goblin.png'
const img = document.createElement('img')
img.src = imgSrc
img.id = 'character'

// нарисуем поле
for (let i = 1; i <= FIELD_DIMENSION ** 2; i++) {
  const cell = document.createElement('div')
  cell.className = 'cell'
  cell.id = i
  cell.style.width = `${CELL_SIZE}px`
  cell.style.height = `${CELL_SIZE}px`
  field.appendChild(cell)
}

// подключим генератор
export default function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const result = Math.floor(Math.random() * (max - min + 1)) + min
  return result.toString()
}

document.getElementById(getRandomIntInclusive(1, FIELD_DIMENSION ** 2)).appendChild(img)

function moveCharacter() {
  const prevPosition = document.getElementById('character').parentElement.id
  const position = getRandomIntInclusive(1, FIELD_DIMENSION * FIELD_DIMENSION)
  if (prevPosition !== position) {
    img.remove()
    const filledCell = document.getElementById(position)
    filledCell.appendChild(img)
  } else {
    // вроде бы уместно тут вызвать рекурсивно?
    moveCharacter()
  }
}

setInterval(moveCharacter, 1000)
