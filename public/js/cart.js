const mainContainer = document.getElementById('cartContainer')

let cart = JSON.parse(localStorage.getItem('cart')) || [];
const deleteProduct = (id) => {
    const index = cart.findIndex(product => product.id === id);
    if (index !== -1) {
        Swal.fire({
            title: `Estas seguro que quieres eliminar ${cart[index].nombre} del carrito?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Si quiero eliminar!',
            cancelButtonText: 'Cancelar'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire(
                    'Eliminado!',
                    `El producto: ${cart[index].nombre} ha sido eliminado correctamente`,
                    'success'
                    ).then(() => {
                    cart.splice(index, 1);
                    localStorage.setItem('cart', JSON.stringify(cart));
                    window.location.reload()
                })
            }
        })
    }
}
const enptyCart = () => {
    cart = []
    localStorage.setItem('cart', JSON.stringify(cart));
    setTimeout(() => {
        window.location.reload()
    }, 2000);
}

const total = () => {
    let totalPrecio = 0
    cart.forEach(product => {
        totalPrecio += (product.cantidad * product.precio)
    })
    return totalPrecio
}

// const generateRandomNumber = () => {
//     const min = 100000;
//     const max = 999999;
//     return Math.floor(Math.random() * (max - min +1)) + min;
//   };
const generateRandomNumber = () =>{
    let numberRandom = ''
    for (let i = 0; i < 6; i++) {
        const digit = Math.floor(Math.random() * 9) + 1;
        numberRandom += digit
    }
    return numberRandom.toString();
}



const render = () => {

    if (cart.length === 0) {
        const h2 = document.createElement('h2');
        h2.classList.add('mainarticle--h2');
        h2.innerText = "El carrito esta vacio"
        const a = document.createElement('a');
        a.classList.add('mainarticle--a');
        a.href = "../index.html"
        a.innerText = "Volver al Home."
        mainContainer.appendChild(h2)
        mainContainer.appendChild(a)

    } else {
        cart.forEach(product => {
            const nombre = document.createElement('h2');
            nombre.classList.add('mainarticle--h2');
            nombre.innerText = product.nombre
            const img = document.createElement('img');
            img.classList.add('mainarticle--img');
            img.src = product.img;
            img.alt = product.nombre;
            const precio = document.createElement('p');
            precio.classList.add('mainarticle--p');
            precio.innerText = "$" + product.precio;
            const cantidad = document.createElement('p');
            cantidad.classList.add('mainarticle--p');
            cantidad.innerText = product.cantidad;
            const button = document.createElement('button');
            button.classList.add('main__article--button');
            button.innerText = "Eliminar"
            button.onclick = async () => {
                deleteProduct(product.id)
            };
            mainContainer.appendChild(nombre)
            mainContainer.appendChild(img)
            mainContainer.appendChild(precio)
            mainContainer.appendChild(cantidad)
            mainContainer.appendChild(button)

        })
        const buttonEnpty = document.createElement('button');
        buttonEnpty.classList.add('main__article--button');
        buttonEnpty.innerText = "Vaciar carrito"
        buttonEnpty.onclick = async () => {
            Swal.fire({
                title: 'Estas seguro que quieres vaciar el carrito?',
                icon: 'warning',
                showCancelButton: true,
                confirmButtonColor: '#3085d6',
                cancelButtonColor: '#d33',
                confirmButtonText: 'Si quiero vaciarlo!',
                cancelButtonText: 'Cancelar'
            })
                .then((result) => {
                    if (result.isConfirmed) {
                        enptyCart()
                        Swal.fire(
                            'Vaciado!',
                            'El carrito ha sido vaciado correctamente.',
                            'success'
                        )
                    }
                });
        }
        mainContainer.appendChild(buttonEnpty);
        const buttonBuysCompleted = document.createElement('button');
        buttonBuysCompleted.classList.add('buttonBuysCompleted');
        buttonBuysCompleted.innerText = "Finalizar Compra"
        buttonBuysCompleted.onclick = async () => {
            Swal.fire({
                position: 'top-end',
                icon: 'success',
                title: 'Su Compra Se Ha Realizado',
                text: `El precio total de su compra es: $${total()} y su numero de compra es  y su codigo de compra es ${generateRandomNumber()}`,
                showConfirmButton: false,
                timer: 3000
            });

            enptyCart()
        }
        mainContainer.appendChild(buttonBuysCompleted)
        const totalPrice = document.createElement('h3');
        totalPrice.classList.add('mainArticle--h3');
        totalPrice.innerText = `El precio total de su compra es: $${total()}`
        mainContainer.appendChild(totalPrice)
    }

}


document.addEventListener("DOMContentLoaded", render())
