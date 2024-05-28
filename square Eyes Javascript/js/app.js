const products = 
        [
            {
              "id": "ded6041a-622f-4fb4-81e4-96fcfdad4dff",
              "title": "Ping Pong Championship",
              "description": "Enter the world of Ping Pong Championship and compete against the world's best to become the ultimate champion in this exciting game.",
              "genre": "Sports",
              "released": "2005",
              "ageRating": "3+",
              "price": 14.99,
              "discountedPrice": 4.79,
              "onSale": true,
              "image": "https://static.cloud.noroff.dev/api/gamehub/0-ping-pong-championship.jpg",
              "tags": ["gamehub", "game"],
              "favorite": true
            },
            {
              "id": "2ace4e1d-cad7-4d35-8d59-6c9ac3e3eaf8",
              "title": "Super Duper",
              "description": "Celebrate some of the world's supe duper Superheroes with augmented reality.",
              "genre": "Adventure",
              "released": "2006",
              "ageRating": "3+",
              "price": 15.99,
              "discountedPrice": 15.99,
              "onSale": false,
              "image": "https://static.cloud.noroff.dev/api/gamehub/1-super-duper.jpg",
              "tags": ["gamehub", "game"],
              "favorite": true
            }
        
        ];

function displayProducts(filteredProducts = products) {
  const productsContainer = document.getElementById('products-container');
  productsContainer.innerHTML = '';

  filteredProducts.forEach(product => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');
    productElement.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}">
      <p>${product.description}</p>
      <p>Price: $${product.onSale ? `<p>Sale Price: $${product.discountedPrice}</p>`: ''}
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
      `;
      productsContainer.appendChild(productElement);
  });
}

function filterByGenre() {
  const genreFilter = document.getElementById('genre-filter').value;
  if(genreFilter ==='all') {
    displayProducts();
  } else {
    const filteredProducts = products.filter(product => product.genre === genreFilter);
    displayProducts(filteredProducts);
  }
}

async function fetchProductById(productId){
  return products.find(products => product.id === productId);
}

async function displayProductDetails(){
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = await fetchProductById(productId);


  const productContainer = document.getElementById('Product-container');
  productContainer.innerHTML = `
  <h1>${product.title}</h1>
  <img src="${product.image}" alt="${product.title}">
  <p>${product.description}</p>
  <p>Price: $${product.price}</p>
  ${product.onSale ? `<p>Sale Price: $${product.discountedPrice}</p>` : ''}
  <button onclick="addToCart('${productId}')"Add to Cart</button>
  `;
}

let cart = JSON.parse(localStorage.getItem('cart')) || [];
function addToCart(productId) {
  const product = cart.find(item => item.id === productId);
  if (product) {
    product.quantity += 1;
  } else {
    cart.push({id: productId, quantity: 1 });
  }
   localStorage.setItem('cart', JSON.stringify(cart));
   alert('Product added to cart');
}

 















async function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  for (let item of cartItems) {
    const product = await fetchProductById(item.id);
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <h2>${product.title}</h2>
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${product.price * item.quantity}</p>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartContainer.appendChild(cartItemElement);
  }
}

function removeFromCart(productId) {
  cart = cart.filter(item => item.id !== productId);
  localStorage.setItem('cart', JSON.stringify(cart));
  displayCart();
}

function checkout() {
  localStorage.removeItem('cart');
  window.location.href = '/checkout/confirmation/index.html';
}

function viewProduct(productId) {
  window.location.href = `/product/index.html?id=${productId}`;
}

window.onload = function() {
  if (window.location.pathname.includes('product/index.html')) {
    displayProductDetails();
  } else if (window.location.pathname.includes('checkout/index.html')) {
    displayCart();
  } else {
    displayProducts();
  }
};
