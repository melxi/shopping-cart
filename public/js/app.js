document.cookie = "HttpOnly;Secure;SameSite=Strict";

const cartBtn = document.querySelector(".cart-btn");
const closeCartBtn = document.querySelector(".close-cart");
const clearCartBtn = document.querySelector(".clear-cart");
const cartDOM = document.querySelector(".cart");
const cartOverlay = document.querySelector(".cart-overlay");
const cartItems = document.querySelector(".cart-items");
const cartTotal = document.querySelector(".cart-total");
const cartContent = document.querySelector(".cart-content");
const productsDOM = document.querySelector(".products-center");

// cart
let cart = [];

// get products
class Products {
  async gerProducts() {
    try {
      const result = await fetch('./js/products.json');
      const data = await result.json();
      let products = data.items;
      products = products.map(item => {
        const { title, price } = item.fields;
        const { id } = item.sys;
        const image = item.fields.image.fields.file.url;
        return { title, price, id, image }
      })
      return products;
    } catch (error) {
      console.log(error);
    }
  }

}


// display products
class UI {
  displayProducts(products) {
    let result = '';
    products.forEach(product => {
      result += `
        <!-- single product -->
          <article class="product">
            <div class="img-container">
              <img
                src=${product.image}
                alt="product"
                class="product-img"
              />
              <button class="bag-btn" data-id="1">
                <i class="fas fa-shopping-cart"></i>
                add to bag
              </button>
              <h3>${product.title}</h3>
              <h4>$${product.title}</h4>
            </div>
          </article>
        <!-- end of single product -->
      `
    })
    productsDOM.innerHTML = result;
  }
}

// local storage
class Storage {
  static saveProducts(products) {
    localStorage.setItem('products', JSON.stringify(products))
  }
}

document.addEventListener('DOMContentLoaded', () => {
  const ui = new UI();
  const products = new Products();

  // get all products
  products.gerProducts().then(products => {
    ui.displayProducts(products);
    Storage.saveProducts(products)
  });
})