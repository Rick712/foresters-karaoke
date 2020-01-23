var socket = io();


document.querySelector('#add').addEventListener('click', () => {
  const req = []
  req.push(document.querySelector('#title').value, document.querySelector('#artist').value, document.querySelector('#singing').value, document.querySelector('#link').value)

  socket.emit('songAdded', req)
  restart()
})

document.querySelector('#next').addEventListener('click', () => {
  socket.emit('nextSong')
  restart()
})

document.querySelectorAll('.up').forEach((up, i) => {
  up.addEventListener('click', () => {
    socket.emit('moveUp', i)
    restart()
  })
})

document.querySelectorAll('.down').forEach((down, i) => {
  down.addEventListener('click', () => {
    socket.emit('moveDown', i)
    restart()
  })
})

document.querySelectorAll('.delete').forEach((remove, i) => {
  remove.addEventListener('click', () => {
    socket.emit('removeSong', i + 1)
    restart()
  })
})


function restart() {
  location.reload()
}