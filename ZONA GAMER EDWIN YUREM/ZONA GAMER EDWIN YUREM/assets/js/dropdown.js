document.addEventListener('DOMContentLoaded', ()=> {
  const productNames = {
    "8":"Mouse Logitech",
    "9":"Mouse Gamer",
    "10":"Control Xbox",
    "21":"Control Xbox",
    "16": "Control Xbox",
    "12":"Consola Xbox",
    "20":"Consola Xbox",
    "11":"Teclado Gamer",
    "14":"Teclado Gamer",
    "22":"Teclado Gamer",
    "13":"Audífonos Gamer",
    "17":"Audífonos Gamer",
    "18":"Audífonos Gamer",
    "15":"PC Gamer",
    "19":"PC Gamer",
    "23":"PC Gamer"
  }
  const favorites = []
  const cart = []
  const favDropdown = document.getElementById('favoritesDropdown')
  const cartDropdown = document.getElementById('cartDropdown')
  favDropdown.addEventListener('click', e => {
    e.stopPropagation()
    favDropdown.classList.toggle('show')
  })
  cartDropdown.addEventListener('click', e => {
    e.stopPropagation()
    cartDropdown.classList.toggle('show')
  })
  document.addEventListener('click', () => {
    favDropdown.classList.remove('show')
    cartDropdown.classList.remove('show')
  })
  function renderDropdown(containerId, list, emptyMsg) {
    const container = document.getElementById(containerId)
    container.innerHTML = ''
    if (!list.length) {
      container.innerHTML = `<p class="empty-msg">${emptyMsg}</p>`
      return
    }
    list.forEach(p => {
      const item = document.createElement('div')
      item.className = 'item'
      item.innerHTML = `
        <img src="${p.img}" alt="${p.title}">
        <span class="title">${p.title}</span>
      `
      container.appendChild(item)
    })
  }
  document.body.addEventListener('click', e => {
    const favBtn = e.target.closest('button[aria-label="Añadir a favoritos"], button[aria-label="Favorito"]')
    const cartBtn = e.target.closest('button[aria-label="Añadir al carrito"], button[aria-label="Carrito"]')
    if (!favBtn && !cartBtn) return
    e.stopPropagation()
    const card = (favBtn || cartBtn).closest('.card')
    const id = card.id
    const img = card.querySelector('img').src
    const title = productNames[id] || card.querySelector('img').alt
    const prod = { id, img, title }
    if (favBtn) {
      const idx = favorites.findIndex(p => p.id === id)
      if (idx > -1) {
        favorites.splice(idx, 1)
      } else {
        favorites.push(prod)
      }
      document.querySelectorAll(`.card[id="${id}"] i.fa-heart`).forEach(icon => {
        icon.classList.toggle('fa-solid', idx === -1)
        icon.classList.toggle('fa-regular', idx !== -1)
        icon.classList.toggle('red', idx === -1)
      })
      renderDropdown('favoritesContent', favorites, 'No hay favoritos.')
    }
    if (cartBtn) {
      const idx = cart.findIndex(p => p.id === id)
      if (idx > -1) {
        cart.splice(idx, 1)
      } else {
        cart.push(prod)
      }
      document.querySelectorAll(`.card[id="${id}"] i.fa-cart-shopping`).forEach(icon => {
        icon.classList.toggle('text-primary', idx === -1)
        icon.classList.toggle('yellow', idx === -1)
      })
      renderDropdown('cartContent', cart, 'El carrito está vacío.')
    }
  })
})
