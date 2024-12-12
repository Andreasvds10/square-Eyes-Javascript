let products = []; 


async function fetchProducts() {
    try {
        const response = await fetch('https://api.noroff.dev/api/v1/square-eyes'); 
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        products = await response.json(); 
        displayProducts('products-container', products); 
    } catch (error) {
        console.error('There was a problem with the fetch operation:', error);
    }
}


function displayProducts(containerId, filteredProducts = products) {
    const container = document.getElementById(containerId);
    container.innerHTML = '';

    filteredProducts.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('movie');
        productElement.innerHTML = `
            <h2>${product.title}</h2>
            <img src="${product.image}" alt="${product.title}" onclick="viewProduct('${product.id}')">
            <p>${product.description}</p>
            <p>Genre: ${product.genre}</p>
            <p>Rating: ${product.rating}</p>
            <p>Released: ${product.released}</p>
            <p>Price: $${product.price}</p>
            ${product.onSale ? `<p>Sale Price: $${product.discountedPrice}</p>` : ''}
            <button onclick="addToCart('${product.id}')">Add to Cart</button>
        `;
        container.appendChild(productElement);
    });
}


function filterByGenre() {
    const selectedGenre = document.getElementById('genre-filter').value;
    let filteredProducts;

    if (selectedGenre === 'All') {
        filteredProducts = products;
    } else {
        filteredProducts = products.filter(product => product.genre === selectedGenre);
    }

    displayProducts('products-container', filteredProducts);
}


function addToCart(productId) {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += 1;
    } else {
        const product = products.find(p => p.id === productId);
        if (product) {
            cart.push({ ...product, quantity: 1 });
        }
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    alert('Product added to cart');
}


function displayCart() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContainer = document.getElementById('cart-container');
    cartContainer.innerHTML = '';

    if (cartItems.length === 0) {
        cartContainer.innerHTML = '<p>Your cart is empty.</p>';
        return;
    }

    cartItems.forEach(item => {
        const cartItemElement = document.createElement('div');
        cartItemElement.classList.add('cart-item');
        cartItemElement.innerHTML = `
            <h2>${item.title}</h2>
            <img src="${item.image}" alt="${item.title}">
            <p>Quantity: ${item.quantity}</p>
            <p>Total: $${(item.price * item.quantity).toFixed(2)}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        cartContainer.appendChild(cartItemElement);
    });
}


function removeFromCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productIndex = cart.findIndex(item => item.id === productId);
    if (productIndex !== -1) {
        cart.splice(productIndex, 1);
        localStorage.setItem('cart', JSON.stringify(cart));
        displayCart();
    }
}


function checkout() {
    const cartItems = JSON.parse(localStorage.getItem('cart')) || [];
    if (cartItems.length === 0) {
        alert('Your cart is empty.');
        return;
    }

    const orderDetails = {
        orderNumber: Date.now().toString(),
        date: new Date(),
        items: cartItems,
        totalAmount: cartItems.reduce((total, item) => total + (item.price * item.quantity), 0).toFixed(2)
    };

    let orderHistory = JSON.parse(localStorage.getItem('orderHistory')) || [];
    orderHistory.push(orderDetails);
    localStorage.setItem('orderHistory', JSON.stringify(orderHistory));
    localStorage.removeItem('cart');
    localStorage.setItem('orderDetails', JSON.stringify(orderDetails));
    window.location.href = 'confirmation.html';
}


window.onload = function() {
    if (window.location.pathname.includes('checkout.html')) {
        displayCart(); 
    } else {
        fetchProducts(); 
    }
};


let x = "Please, let me pass";
console.log(x);
