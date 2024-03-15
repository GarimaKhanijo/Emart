// Fetch categories from the API
fetch('https://fakestoreapi.com/products/categories')
    .then((response) => {
        return response.json();
    })
    .then((categories) => {
        // Generate buttons for each category
        let categoryButtonsHTML = "<button class='category-btn' data-category='all'>All Products</button>";
        categories.forEach((category) => {
            categoryButtonsHTML += `<button class="category-btn" data-category="${category}">${category}</button>`;
        });

        // Display category buttons on the page
        document.getElementById("category-buttons").innerHTML = categoryButtonsHTML;

        // Add event listener for each category button
        let categoryButtons = document.querySelectorAll('.category-btn');
        categoryButtons.forEach((button) => {
            button.addEventListener('click', () => {
                let category = button.getAttribute('data-category');
                fetchProducts(category);
            });
        });

        // Fetch all products initially
        fetchProducts('all');
    })
    .catch((error) => {
        console.log(error);
    });

// Function to fetch and display products based on category
function fetchProducts(category) {
    let apiUrl = category === 'all' ? 'https://fakestoreapi.com/products' : `https://fakestoreapi.com/products/category/${category}`;
    
    fetch(apiUrl)
        .then((response) => {
            return response.json();
        })
        .then((products) => {
            // Generate HTML for displaying products
            let productsHTML = "";
            products.forEach((product) => {
                productsHTML += `
                <div class="card">
                    <img src="${product.image}" alt="img" class="images">
                    <div class="product-details">
                        <h1 class="title">${product.title}</h1>
                        <p class="description">${product.description}</p>
                        <br></br>
                        <p class="category">${product.category}</p>
                        <p class="price">$${product.price}</p>
                        <br></br>
                        <button class="shop-btn">Shop Now</button>
                    </div>
                </div>`;
            });

            // Display products on the page
            document.getElementById("products").innerHTML = productsHTML;
        })
        .catch((error) => {
            console.log(error);
        });
}