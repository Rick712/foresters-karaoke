const express = require('express')
const app = express()
const nodemon = require('nodemon')
const ejs = require('ejs')

const port = 8000
const http = require('http').Server(app)
const io = require('socket.io')(http)

app.set('view engine', 'ejs')
app.use(express.static('src'))

app.get('/', function(req, res)  {
  res.render('index', {list: list})
})

app.get('/admin', function(req, res) {
  res.render('admin', {list: list} )
})

io.on('connection', (socket) => {
  socket.on('songAdded', (req) => {
    const newSong = {
      'liedje': req[0],
      'artiest': req[1],
      'mens': req[2],
      'link': req[3]
    }
    list.push(newSong)
  })
  socket.on('nextSong', () => {
    list = list.splice(1, list.length)
  })

  socket.on('moveUp', (from) => {
    let tempUp = list[from + 2],
        tempDown = list[from + 1]
    
    list[from + 1] = tempUp
    list[from + 2] = tempDown

    return list
  })

  socket.on('moveDown', (from) => {
    let tempUp = list[from + 1],
        tempDown = list[from + 2]
    
    list[from + 2] = tempUp
    list[from + 1] = tempDown

    return list
  })

  socket.on('removeSong', (i) => {
    list.splice(i, 1)
    
    return list
  })
})

let list = [
  { liedje: "I'm still standing", artiest: 'Elton John', mens: 'Rick', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Tiny Dancer', artiest: 'Elton John', mens: 'Dennis', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Rocket Man', artiest: 'Elton John', mens: 'Mike', link: 'https://linknaaryoutube.nl' },
  { liedje: "Saturday Night's Allright", artiest: 'Elton John', mens: 'Nanne', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Yellow Brick Road', artiest: 'Elton John', mens: 'Jaap', link: 'https://linknaaryoutube.nl' },
  { liedje: "Don't Go Breaking My Heart", artiest: 'Elton John', mens: 'Rens', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Kayleigh', artiest: 'Marillon', mens: 'Wijn', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Sacrifice', artiest: 'Elton John', mens: 'Daan', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Black', artiest: 'Pearl Jam', mens: 'Vinnie', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Bennie And The Jets', artiest: 'Elton John', mens: 'Koen', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Crocodile Rock', artiest: 'Elton John', mens: 'Bobjan', link: 'https://linknaaryoutube.nl' },
  { liedje: 'Your Song', artiest: 'Elton John', mens: 'Sil', link: 'https://linknaaryoutube.nl' }
]

http.listen(port, () => {
  console.log('server is online at port ' + port)
})