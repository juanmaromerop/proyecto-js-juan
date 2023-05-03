const hamburgersContainer = document.getElementById('hamburgers')
const cartQuantity = document.getElementById('cartQuantity')
let cart = []

const getHamburgers = async () => {
    const response = await fetch("./data/hamburgers.json");
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
    getQuantity()
}


const render = async () => {
    cart = JSON.parse(localStorage.getItem('cart')) || [];
    const hamburgers = await getHamburgers()
    // for (let hamburger in hamburgers) {
    //     hamburgersContainer.innerHTML += `<article class="main__article">
    //     <img class="main__article--img" src="${hamburgers[hamburger].img}"
    //         alt="${hamburgers[hamburger].nombre}">
    //     <h2 class="main__article--h2">${hamburgers[hamburger].nombre}</h2>
    //     <p class="main__article--p">${hamburgers[hamburger].descripcion}</p>
    //     <button 
    //         onclick= '(async () => { await addProductToCart (${Number(hamburger) + 1});})()' 
    //         class="main__article--button">Agregar al carrito
    //     </button>
    // </article>`
    // }
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
      
        const p = document.createElement('p');
        p.classList.add('mainarticle--p');
        p.innerText = hamburgers[hamburger].descripcion;
      
        const button = document.createElement('button');
        button.classList.add('main__article--button');
        button.innerText = 'Agregar al carrito';
        button.onclick= async () => {
          await addProductToCart(Number(hamburger) + 1);
        };

        article.appendChild(img);
        article.appendChild(h2);
        article.appendChild(p);
        article.appendChild(button);
      
        hamburgersContainer.appendChild(article);
      }


}

const getQuantity = async () => {
    let cartTotalQuantity = 0
    cart.forEach(product => cartTotalQuantity += product.cantidad)
    cartQuantity.innerText = cartTotalQuantity

}


document.addEventListener("DOMContentLoaded", render())