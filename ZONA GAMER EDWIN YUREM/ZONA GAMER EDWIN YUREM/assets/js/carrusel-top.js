document.addEventListener('DOMContentLoaded', () => {
  const images = []
  for (let i = 8; i <= 17; i++) {
    images.push(`assets/imagenes/${i}.png`)
  }
  const total = images.length

  const carousel = document.getElementById('carrusel-top10')
  const cardEls = carousel.querySelectorAll('.card')

  const btnLeft = document.querySelector('.section-productos .fa-chevron-left').closest('button')
  const btnRight = document.querySelector('.section-productos .fa-chevron-right').closest('button')

  let currentIndex = 0
  const startId = 8

  function updateCarousel() {
    cardEls.forEach((card, idx) => {
      const pos = (currentIndex + idx + total) % total
      const realId = startId + pos
      const img = card.querySelector('img')

      img.src = images[pos]
      img.alt = `Producto ${realId}`
      card.id = `${realId}`
    })
  }

  btnLeft.addEventListener('click', () => {
    currentIndex = (currentIndex + 1) % total
    updateCarousel()
  })
  btnRight.addEventListener('click', () => {
    currentIndex = (currentIndex - 1 + total) % total
    updateCarousel()
  })

  updateCarousel()
})
