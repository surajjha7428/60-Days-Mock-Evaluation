

async function fetchProducts() {
            try {
                const response = await fetch('https://fakestoreapi.com/products');
                const data = await response.json();
                return data;
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        }

        // Populate product grid with items
        function displayProducts(products) {
            const productGrid = document.getElementById('productGrid');
            productGrid.innerHTML = '';
            products.forEach(product => {
                const productItem = document.createElement('div');
                productItem.classList.add('product-item');
                // Populate product item with image, title, and price
                productItem.innerHTML = `
            <img src="${product.image}" alt="${product.title}">
            <h2>${product.title}</h2>
            <p>${product.price}</p>
        `;
                productGrid.appendChild(productItem);
            });
        }

        // Filter products by category
        function filterByCategory(products, category) {
            if (category === 'all') {
                return products;
            } else {
                return products.filter(product => product.category === category);
            }
        }

        // Sort products by price
        function sortByPrice(products, order) {
            return products.sort((a, b) => {
                if (order === 'asc') {
                    return a.price - b.price;
                } else {
                    return b.price - a.price;
                }
            });
        }

        // Event listeners for search, category filter, and price sort
        document.addEventListener('DOMContentLoaded', async () => {
            const products = await fetchProducts();
            let filteredProducts = [...products];

            // Populate category filter options
            const categoryFilter = document.getElementById('categoryFilter');
            const categories = ['all', ...new Set(products.map(product => product.category))];
            categories.forEach(category => {
                const option = document.createElement('option');
                option.value = category;
                option.textContent = category;
                categoryFilter.appendChild(option);
            });

            // Display products initially
            displayProducts(products);

            // Search functionality
            document.getElementById('searchInput').addEventListener('input', event => {
                const searchTerm = event.target.value.toLowerCase();
                filteredProducts = products.filter(product => product.title.toLowerCase().includes(searchTerm));
                displayProducts(filteredProducts);
            });

            // Category filter
            categoryFilter.addEventListener('change', event => {
                const selectedCategory = event.target.value;
                filteredProducts = filterByCategory(products, selectedCategory);
                displayProducts(filteredProducts);
            });

            // Price sort
            document.getElementById('priceSort').addEventListener('change', event => {
                const sortOrder = event.target.value;
                filteredProducts = sortByPrice(filteredProducts, sortOrder);
                displayProducts(filteredProducts);
            });
        });