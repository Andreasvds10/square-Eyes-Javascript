const products = [
  {
    "id": "352ba432-5b5d-4ccc-9aba-f2704c500cf3",
    "title": "Hobbs & Shaw",
    "description": "Lawman Luke Hobbs (Dwayne 'The Rock' Johnson) and outcast Deckard Shaw (Jason Statham) form an unlikely alliance when a cyber-genetically enhanced villain threatens the future of humanity.",
    "genre": "Action",
    "rating": "6.5",
    "released": "2019",
    "price": 129.99,
    "discountedPrice": 119.99,
    "onSale": true,
    "image": "https://static.cloud.noroff.dev/api/square-eyes/0-hobbs-and-shaw.jpg",
    "tags": ["action", "movie"],
    "favorite": true
  },
  {
    "id": "4696b9e6-ec6e-4672-a08d-3e3212a215c8",
    "title": "Godzilla: King of the Monsters",
    "description": "The crypto-zoological agency Monarch faces off against a battery of god-sized monsters, including the mighty Godzilla, who collides with Mothra, Rodan, and his ultimate nemesis, the three-headed King Ghidorah.",
    "genre": "Action",
    "rating": "9",
    "released": "2019",
    "price": 109.99,
    "discountedPrice": 109.99,
    "onSale": false,
    "image": "https://static.cloud.noroff.dev/api/square-eyes/1-godzilla-king-of-monsters.jpg",
    "tags": ["action", "movie"],
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
      <p>Genre: ${product.genre}</p>
      <p>Rating: ${product.rating}</p>
      <p>Released: ${product.released}</p>
      <p>Price: $${product.price}</p>
      ${product.onSale ? `<p>Sale Price: $${product.discountedPrice}</p>` : ''}
      <button onclick="addToCart('${product.id}')">Add to Cart</button>
    `;
    productsContainer.appendChild(productElement);
  });
}

function filterByGenre() {
  const genreFilter = document.getElementById('genre-filter').value;
  const filteredProducts = genreFilter === 'All' ? products : products.filter(product => product.genre === genreFilter);
  displayProducts(filteredProducts);
}

function fetchProductById(productId) {
  return products.find(product => product.id === productId);
}

function displayProductDetails() {
  const urlParams = new URLSearchParams(window.location.search);
  const productId = urlParams.get('id');
  const product = fetchProductById(productId);

  const productContainer = document.getElementById('product-container');
  productContainer.innerHTML = `
    <h1>${product.title}</h1>
    <img src="${product.image}" alt="${product.title}">
    <p>${product.description}</p>
    <p>Genre: ${product.genre}</p>
    <p>Rating: ${product.rating}</p>
    <p>Released: ${product.released}</p>
    <p>Price: $${product.price}</p>
    ${product.onSale ? `<p>Sale Price: $${product.discountedPrice}</p>` : ''}
    <button onclick="addToCart('${product.id}')">Add to Cart</button>
  `;
}

function addToCart(productId) {
  const cart = JSON.parse(localStorage.getItem('cart')) || [];
  const existingProduct = cart.find(item => item.id === productId);
  if (existingProduct) {
    existingProduct.quantity += 1;
  } else {
    const product = products.find(p => p.id === productId);
    cart.push({ ...product, quantity: 1 });
  }
  localStorage.setItem('cart', JSON.stringify(cart));
  alert('Product added to cart');
}

function displayCart() {
  const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
  const cartContainer = document.getElementById('cart-container');
  cartContainer.innerHTML = '';

  cartItems.forEach(item => {
    const product = fetchProductById(item.id);
    const cartItemElement = document.createElement('div');
    cartItemElement.classList.add('cart-item');
    cartItemElement.innerHTML = `
      <h2>${product.title}</h2>
      <img src="${product.image}" alt="${product.title}">
      <p>Quantity: ${item.quantity}</p>
      <p>Total: $${product.price * item.quantity}</p>
      <button onclick="removeFromCart('${item.id}')">Remove</button>
    `;
    cartContainer.appendChild(cartItemElement);
  });
}

function removeFromCart(productId) {
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
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
    document.getElementById('genre-filter').addEventListener('change', filterByGenre);
  }
};
