let cart = [];
const hamburgersContainer = document.getElementById('hamburgers')
const cartQuantity = document.getElementById('cartQuantity')


const getHamburgers = async () => {
    const response = await fetch("./src/data/hamburgers.json");
    const data = response.json();
    return data
}

const getHamburgersById = async (id) => {
    const hamburgers = await getHamburgers();
    const filterHamburgersById = hamburgers.find((hamburger) => hamburger.id === id);
    return filterHamburgersById
}

const setLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

const addProductToCart = async (id) => {
    const hamburger = await getHamburgersById(id)
    if (cart.some(product => product.id === id)) {
        cart[id - 1].cantidad += 1
        setLocalStorage("cart", cart)
    }
    else {
        hamburger.cantidad++
        cart.push(hamburger)
        setLocalStorage("cart", cart)
    }
    Swal.fire({
        icon: 'success',
        title: 'Agregado al carrito',
        text: `El producto ${hamburger.nombre} ha sido agregado al carrito`,
        timer: 2500,
        showConfirmButton: false
      })
    getQuantity()
}


const getQuantity = async () => {
    let cartTotalQuantity = 0
    cart.forEach(product => cartTotalQuantity += product.cantidad)
    cartQuantity.innerText = cartTotalQuantity

}

const render = async () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    getQuantity()
    const hamburgers = await getHamburgers()

    for (let hamburger in hamburgers) {
        const articleContainer = document.createElement('articleCotainer')
        articleContainer.classList.add('articleContainer')

        const article = document.createElement('article');
        article.classList.add('mainarticle');
      
        const img = document.createElement('img');
        img.classList.add('mainarticle--img');
        img.src = hamburgers[hamburger].img;
        img.alt = hamburgers[hamburger].nombre;
      
        const h2 = document.createElement('h2');
        h2.classList.add('mainarticle--h2');
        h2.innerText = hamburgers[hamburger].nombre;
      
        const categoria = document.createElement('p');
        categoria.classList.add('mainarticle--p');
        categoria.innerText = hamburgers[hamburger].descripcion;

        const precio = document.createElement('p');
        precio.classList.add('mainarticle--p');
        precio.innerText = "$" + hamburgers[hamburger].precio;
      
        const button = document.createElement('button');
        button.classList.add('main__article--button');
        button.innerText = 'Agregar al carrito';
        button.onclick= async () => {
          await addProductToCart(Number(hamburger) + 1);
        };

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(categoria);
        article.appendChild(precio);
        article.appendChild(button);
      
        hamburgersContainer.appendChild(article);
      }


}

document.addEventListener("DOMContentLoaded", render())
