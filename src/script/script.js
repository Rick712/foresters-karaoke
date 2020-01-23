const titles = document.querySelectorAll('.slide div')

window.setTimeout(() => {
  window.scrollTo(0,0)
}, 100)

let i = 0

rotate = () => {
  const slides = document.querySelectorAll('.slide')

  window.setTimeout(() => {
    i++

    if(i === slides.length) {
      location.reload()
    } else {
      window.scrollTo(0, slides[i].offsetTop)
      console.log(i, slides.length)
      this.rotate()
    }

  }, slides[i].dataset.time)
}



this.rotate()