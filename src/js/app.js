/* eslint-disable no-plusplus */
/* eslint-disable max-len */
/* eslint-disable no-param-reassign */
/* eslint-disable no-console */

import '../css/style.css'

// сделаем настраиваемый размер поля, но со склеиванием чисел и строк возиться лень, чтоб совсем динамически, поэтому ширины захардкодим
const FIELD_DIMENSION = 4
const CELL_SIZE = '200px'
const field = document.getElementById('field')
field.style.width = '800px'

const imgSrc = 'https://github.com/netology-code/ahj-homeworks/raw/simplification/dom/pic/goblin.png'
const img = document.createElement('img')
img.src = imgSrc
img.id = 'character'

// рисуем поле
for (let i = 1; i <= FIELD_DIMENSION * FIELD_DIMENSION; i++) {
  const cell = document.createElement('div')
  cell.className = 'cell'
  cell.id = i
  cell.style.width = CELL_SIZE
  cell.style.height = CELL_SIZE
  field.appendChild(cell)
}

// подключаем генератор
function getRandomIntInclusive(min, max) {
  min = Math.ceil(min)
  max = Math.floor(max)
  const result = Math.floor(Math.random() * (max - min + 1)) + min
  return result.toString()
}

document.getElementById(getRandomIntInclusive(1, FIELD_DIMENSION * FIELD_DIMENSION)).appendChild(img)

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
