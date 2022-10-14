const arrayProducts = [{
        id: 0,
        name: "producto1",
        price: "10.5",
        stock: 10,
        description: "descripcion1",
        img: "../img/featured1.png",
    },
    {
        id: 1,
        name: "producto2",
        price: "10.5",
        stock: 10,
        description: "descripcion2",
        img: "../img/featured2.png",
    },
    {
        id: 2,
        name: "producto3",
        price: "10.5",
        stock: 10,
        description: "descripcion3",
        img: "../img/featured3.png",
    },
    {
        id: 3,
        name: "producto4",
        price: "10.5",
        stock: 10,
        description: "descripcion4",
        img: "../img/featured1.png",
    },

];

const cart = [];

document.addEventListener("DOMContentLoaded", ()=> {
    const products = document.querySelector(".products");
    let html = ''
    for (let i of arrayProducts) {
        html += `<div class="product">
            <div class="product_img">
                <img src=" ${i.img}" alt="${i.name}">
            </div>
            <div class="product_info">
                <p> nombre:  ${i.name}</p>
                <p> <small>descripcion: ${i.description}</small></p>
                <p> precio: ${i.price}</p>
                <p> <small>stock:  ${i.stock}</small> </p>
            </div>
             <div class="product_action" id='${i.id}'>
                <button class="btn"> Agregar</button>
             </div>
        </div>`;
    }
    products.innerHTML = html;
    
    document.addEventListener("click", (e)=> {
        if (e.target.classList.contains("btn")) {
            const idProduct = e.target.parentElement.id;
            let currentProduct = null
            for (let i of arrayProducts) {
                if (i.id === parseInt(idProduct)) {
                    currentProduct = i;
                }
            }
            if (cart[idProduct]) {
                if (cart[idProduct].amount === cart[idProduct].stock) {
                    alert("no hay mas productos")
                    return
                }
                cart[idProduct].amount++;

            } else {

                cart[idProduct] = currentProduct;
                cart[idProduct].amount = 1;
            }
            // console.log(cart);
            const amount = document.querySelector('#amount')
            amount.textContent = Object.entries(cart).length
        }
    });
    const sideBarCart = document.querySelector(".sidebar_cart");
    const cartShopping = document.querySelector(".cartShopping");
    cartShopping.addEventListener("click", function() {
        sideBarCart.classList.toggle('show_sidebar_cart');


        const contentShopping = document.querySelector(".content_shopping");
        const shoppingArray = Object.values(cart);
        console.log(shoppingArray);
        let html = "";
        shoppingArray.forEach(({ id, name, price, stock, img, amount }) => {
            html += `
                <div class="shopping">
                    <div class="shopping__header">
                        <div class="shopping__img">
                            <img src="${img}" alt="${name}">
                        </div>
                        <div class="shopping__info">
                            <p>nombre: ${name}</p>
                            <p>precio: ${price}</p>
                            <p>stock: ${stock}</p>
                        </div>
                    </div>
                    <div class="shopping__actions" id="${id}">
                        <button class="rest">-</button>
                        <b class="amount">${amount}</b>
                        <button class="add">+</button>
                        <button class='bx bxs-trash del'></button>
                    </div>
                </div>`;
        });
        contentShopping.innerHTML = html;
    });
    const contentShopping = document.querySelector(".content_shopping");
    contentShopping.addEventListener("click", (event) => {
        if (event.target.classList.contains("rest")) {
            const id = parseInt(event.target.parentElement.id);

            if (cart[id].amount === 1) {
                const res = confirm("desea eliinar?");
                if (res) {
                    delete cart[id];
                }
            } else {
                cart[id].amount--;
            }
        }

        if (event.target.classList.contains("add")) {
            const id = parseInt(event.target.parentElement.id);

            if (cart[id].stock > cart[id].amount) {
                cart[id].amount++;
            } else {
                alert("No tenemos disnibilidad de este producto");
            }
        }

        if (event.target.classList.contains("del")) {
            const id = parseInt(event.target.parentElement.id);

            const res = confirm("seguro quieres eliminar este producto?");

            if (res) {
                delete cart[id];
            }
        }
        const amount = document.querySelector('#amount')
        amount.textContent = Object.entries(cart).length
        const shoppingArray = Object.values(cart);
        let suma = 0;

        cart.forEach((n) => {
            suma += n.amount * n.price;
        })

        const shoppingTotal = document.querySelector(".shoppingTotal");
        shoppingTotal.textContent = suma;
        const btnBuy = document.querySelector("#btnBuy");
        btnBuy.addEventListener("click", () => {
            const res = confirm("Desea encargar esta comida?");

            if (res) {

                sideBarCart.classList.toggle('show_sidebar_cart');
                cart = []
                amount.textContent = 0
            }
        });
    });




    const iconMenu = document.querySelector('#iconMenu');
    const menu = document.querySelector('#menu');
    iconMenu.addEventListener("click", function() {
        menu.classList.toggle("menu_show")
    })
});