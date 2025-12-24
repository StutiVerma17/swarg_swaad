// script.js
// ================== BASIC SETTINGS ==================

const API_URL = 'api.php'; // PHP backend file

// Fallback static menu (Indian items) used only if database is not reachable
const restaurantData = {
    menu: {
        appetizers: [
            { id: 1, name: "Punjabi Samosa", description: "Crispy fried pastry filled with spicy potato and peas", price: 40, image: "https://bing.com/th?id=OSK.289f65a563a76eceb96feecff1f4a5e0" },
            { id: 2, name: "Paneer Tikka", description: "Marinated cottage cheese cubes grilled in tandoor", price: 180, image: "https://bing.com/th?id=OSK.ecc8270056de4c8d2aeb52fb3dd453f4" },
            { id: 3, name: "Hara Bhara Kebab", description: "Spinach and green peas kebab, shallow fried", price: 150, image: "https://www.mygingergarlickitchen.com/wp-content/uploads/2021/10/hara-bhara-kabab-1.jpg" },
            { id: 4, name: "Veg Manchurian (Dry)", description: "Crispy veg balls tossed in Indo-Chinese sauce", price: 160, image: "https://product-assets.faasos.io/production/product/image_1662646569264_Veg_Manchurian_Dry.jpg" }
        ],
        mains: [
           { id: 5, name: "Butter Chicken", description: "Creamy tomato gravy with tender chicken pieces", price: 280, image: " data:image/webp;base64,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"},
           { id: 6, name: "Paneer Butter Masala", description: "Rich buttery tomato gravy with paneer cubes", price: 240, image:"https://th.bing.com/th/id/OIP.Cubwl8pmN-IAlDjoZVO91gHaJQ?w=208&h=260&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3"},
            { id: 7, name: "Dal Makhani", description: "Slow cooked black lentils in buttery gravy", price: 200, image: "https://myfoodstory.com/wp-content/uploads/2018/08/Dal-Makhani-New-4.jpg?fit=1200,9999" },
            { id: 8, name: "Veg Biryani", description: "Aromatic basmati rice cooked with mixed vegetables", price: 220, image: "https://th.bing.com/th/id/OIP.09w0S6udb6sRvC1qeh3gdQHaE0?w=262&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
        ],
        desserts: [
            { id: 9, name: "Gulab Jamun", description: "Soft fried milk dumplings soaked in sugar syrup", price: 90, image: "https://th.bing.com/th/id/OIP.gwVezsbLeVu_m1dI2T1xhwHaFj?w=238&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" },
            { id: 10, name: "Rasmalai", description: "Soft cheese patties soaked in saffron milk", price: 110, image: "https://tse1.mm.bing.net/th/id/OIP.Xa2xUdxkfagnjYQPGYLsoAHaHa?w=1920&h=1920&rs=1&pid=ImgDetMain&o=7&rm=3" },
            { id: 11, name: "Kesar Phirni", description: "Creamy rice pudding flavored with saffron", price: 100, image: "https://tse3.mm.bing.net/th/id/OIP.HWYpbMsnVTmrCS2SkCHn5gHaGf?w=1199&h=1052&rs=1&pid=ImgDetMain&o=7&rm=3" },
            { id: 12, name: "Kulfi Falooda", description: "Traditional Indian ice-cream served with falooda", price: 130, image: "https://th.bing.com/th/id/OIP.yGfCQ0IYaPRrjsEvPQWmKgHaE8?w=241&h=180&c=7&r=0&o=7&dpr=1.3&pid=1.7&rm=3" }
        ],
        beverages: [
            { id: 13, name: "Masala Chai", description: "Indian spiced milk tea", price: 30, image: "https://i.pinimg.com/originals/9c/39/5b/9c395bde664565392879474d91a021cd.jpg" },
            { id: 14, name: "Sweet Lassi", description: "Thick and sweet yogurt-based drink", price: 70, image: "https://tse3.mm.bing.net/th/id/OIP.zKTcE1TfW_o2kj-DgFETOQHaLH?rs=1&pid=ImgDetMain&o=7&rm=3" },
            { id: 15, name: "Mango Lassi", description: "Lassi blended with ripe mango pulp", price: 90, image: "https://aromaticessence.co/wp-content/uploads/2015/06/E8BE1FFD-6D7C-40B6-8DBE-CF648DA292BD.jpeg" },
            { id: 16, name: "Lemon Soda", description: "Refreshing lemon flavored soda", price: 50, image: "https://createmindfully.com/wp-content/uploads/2016/05/easy-homemade-lemon-lime-soda-vertical.jpg" }
        ]
    },
    settings: {
        taxRate: 0.015, // 1.5% tax
        currency: "₹"
    }
};

// Application state
let currentCategory = 'all';
let cart = [];
let searchTerm = '';

// DOM elements
const menuGrid         = document.getElementById('menuGrid');
const cartBtn          = document.getElementById('cartBtn');
const cartCount        = document.getElementById('cartCount');
const cartSidebar      = document.getElementById('cartSidebar');
const cartOverlay      = document.getElementById('cartOverlay');
const closeCartButton  = document.getElementById('closeCart');
const cartItems        = document.getElementById('cartItems');
const subtotalEl       = document.getElementById('subtotal');
const taxEl            = document.getElementById('tax');
const totalEl          = document.getElementById('total');
const placeOrderBtn    = document.getElementById('placeOrder');
const searchInput      = document.getElementById('searchInput');
const confirmationModal = document.getElementById('confirmationModal');


// ================== DATABASE FUNCTIONS ==================

// Load menu items from database via PHP API
async function loadMenuFromDatabase() {
    try {
        const response = await fetch(`${API_URL}?action=menu`);
        const result   = await response.json();

        if (result.success) {
            console.log('Menu loaded from database:', result.data);

            // Organize items by category: appetizers, mains, desserts, beverages
            const menuByCategory = {
                appetizers: [],
                mains: [],
                desserts: [],
                beverages: []
            };

            result.data.forEach(row => {
                const item = {
                    id: parseInt(row.id),
                    name: row.name,
                    description: row.description,
                    price: parseFloat(row.price),
                    image: row.image_url
                };

                if (menuByCategory[row.category]) {
                    menuByCategory[row.category].push(item);
                }
            });

            // Replace fallback menu with DB menu
            restaurantData.menu = menuByCategory;
        } else {
            console.warn('Using fallback static data. Error:', result.error);
        }
    } catch (error) {
        console.warn('Database error, using fallback static data:', error);
    }
}

// Save order in database via PHP API
async function saveOrderToDatabase(order) {
    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json' // sending JSON
            },
            body: JSON.stringify({
                action: 'create_order',
                customerName: order.customerName,
                tableNumber: order.tableNumber,
                orderType: order.orderType,
                specialInstructions: order.specialInstructions,
                items: order.items.map(item => ({
                    id: item.id,
                    quantity: item.quantity,
                    price: item.price
                }))
            })
        });

        const result = await response.json();

        if (result.success) {
            alert('Order successfully saved! Order ID: ' + result.data.order_id);
            return result.data.order_id;
        } else {
            console.error('Order save failed:', result.error);
            alert('Order could not be saved in database.');
            return null;
        }
    } catch (error) {
        console.error('Order save error:', error);
        alert('Error connecting to server. Order not saved in DB.');
        return null;
    }
}


// ================== INITIALIZATION ==================

document.addEventListener('DOMContentLoaded', async function () {
    // 1. Try to load menu from database
    await loadMenuFromDatabase();

    // 2. Render menu items
    renderMenu();

    // 3. Set up all event listeners
    setupEventListeners();

    // 4. Update cart UI
    updateCartUI();
});


// ================== UI & LOGIC FUNCTIONS ==================

// Attach event listeners
function setupEventListeners() {
    // Category tabs
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            currentCategory = e.target.dataset.category; // "all", "appetizers", ...

            document.querySelectorAll('.tab-btn').forEach(b => b.classList.remove('active'));
            e.target.classList.add('active');

            renderMenu();
        });
    });

    // Cart open/close
    cartBtn.addEventListener('click', toggleCart);
    cartOverlay.addEventListener('click', toggleCart);
    closeCartButton.addEventListener('click', toggleCart);

    // Search filter
    searchInput.addEventListener('input', (e) => {
        searchTerm = e.target.value.toLowerCase();
        renderMenu();
    });

    // Place Order button
    placeOrderBtn.addEventListener('click', handlePlaceOrder);
}

// Returns all items as one flat array
function getAllMenuItems() {
    return Object.values(restaurantData.menu).flat();
}

// Filter menu based on category + search text
function getFilteredMenuItems() {
    let items = getAllMenuItems();

    if (currentCategory !== 'all') {
        items = restaurantData.menu[currentCategory] || [];
    }

    if (searchTerm) {
        items = items.filter(item =>
            item.name.toLowerCase().includes(searchTerm) ||
            item.description.toLowerCase().includes(searchTerm)
        );
    }

    return items;
}

// Format price with Indian Rupee symbol
function formatPrice(price) {
    return `₹${price.toFixed(2)}`;
}

// Format Indian price (no decimals for round numbers)
function formatIndianPrice(price) {
    if (price % 1 === 0) {
        return `₹${price}`;
    } else {
        return `₹${price.toFixed(2)}`;
    }
}

// Render menu cards
function renderMenu() {
    const items = getFilteredMenuItems();

    if (items.length === 0) {
        menuGrid.innerHTML = '<div class="no-results">No items found</div>';
        return;
    }

    menuGrid.innerHTML = items.map(item => `
        <div class="menu-item" data-id="${item.id}">
            <div class="item-image-container">
                <img src="${item.image}" alt="${item.name}" class="item-image" loading="lazy">
            </div>
            <div class="item-name">${item.name}</div>
            <div class="item-description">${item.description}</div>
            <div class="item-footer">
                <div class="item-price">${formatIndianPrice(item.price)}</div>
                <button class="add-to-cart-btn" onclick="addToCart(${item.id}, event)">
                    Add to Cart
                </button>
            </div>
        </div>
    `).join('');
}

// Add item to cart
function addToCart(itemId, event) {
    const item = getAllMenuItems().find(i => i.id === itemId);
    if (!item) return;

    const existing = cart.find(c => c.id === itemId);

    if (existing) {
        existing.quantity += 1;
    } else {
        cart.push({
            ...item,
            quantity: 1
        });
    }

    updateCartUI();

    // Small feedback on button
    if (event && event.target) {
        const btn = event.target;
        const originalText = btn.textContent;
        btn.textContent = 'Added!';
        btn.style.background = '#28a745';
        setTimeout(() => {
            btn.textContent = originalText;
            btn.style.background = '';
        }, 800);
    }
}

// Remove item completely
function removeFromCart(itemId) {
    cart = cart.filter(item => item.id !== itemId);
    updateCartUI();
}

// Change quantity (+1 / -1)
function updateQuantity(itemId, change) {
    const item = cart.find(c => c.id === itemId);
    if (!item) return;

    item.quantity += change;

    if (item.quantity <= 0) {
        removeFromCart(itemId);
    } else {
        updateCartUI();
    }
}

// Calculate subtotal, tax, total
function calculateTotals() {
    const subtotal = cart.reduce((total, item) => total + (item.price * item.quantity), 0);
    const tax = subtotal * restaurantData.settings.taxRate;
    const total = subtotal + tax;

    return { subtotal, tax, total };
}

// Update all cart UI pieces
function updateCartUI() {
    const totalItems = cart.reduce((total, item) => total + item.quantity, 0);
    cartCount.textContent = totalItems;

    if (cart.length === 0) {
        cartItems.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
    } else {
        cartItems.innerHTML = cart.map(item => `
            <div class="cart-item">
                <div class="cart-item-info">
                    <div class="cart-item-name">${item.name}</div>
                    <div class="cart-item-price">${formatIndianPrice(item.price)} each</div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, -1)">-</button>
                        <span class="quantity">${item.quantity}</span>
                        <button class="quantity-btn" onclick="updateQuantity(${item.id}, 1)">+</button>
                    </div>
                </div>
                <button class="remove-item" onclick="removeFromCart(${item.id})">Remove</button>
            </div>
        `).join('');
    }

    const { subtotal, tax, total } = calculateTotals();
    subtotalEl.textContent = formatPrice(subtotal);
    taxEl.textContent      = formatPrice(tax);
    totalEl.textContent    = formatPrice(total);

    placeOrderBtn.disabled = cart.length === 0;
}

// Show / hide cart sidebar
function toggleCart() {
    cartSidebar.classList.toggle('hidden');
}

// Handle "Place Order" button
async function handlePlaceOrder() {
    const customerName        = document.getElementById('customerName').value.trim();
    const tableNumber         = document.getElementById('tableNumber').value;
    const specialInstructions = document.getElementById('specialInstructions').value.trim();
    const orderType           = document.querySelector('input[name="orderType"]:checked').value;

    if (!customerName) {
        alert('Please enter your name');
        return;
    }

    if (!tableNumber) {
        alert('Please select a table or takeout option');
        return;
    }

    const totals = calculateTotals();

    const order = {
        customerName,
        tableNumber,
        orderType,
        specialInstructions,
        items: cart.map(item => ({
            id: item.id,
            name: item.name,
            quantity: item.quantity,
            price: item.price,
            total: item.price * item.quantity
        })),
        subtotal: totals.subtotal,
        tax: totals.tax,
        total: totals.total,
        timestamp: new Date().toLocaleString()
    };

    // 1. Save in database
    const orderId = await saveOrderToDatabase(order);

    // 2. Show confirmation only (even if DB fails, we still show a summary)
    showOrderConfirmation(order, orderId);

    // 3. Clear cart and reset UI
    cart = [];
    updateCartUI();
    toggleCart();

    document.getElementById('customerName').value = '';
    document.getElementById('tableNumber').value = '';
    document.getElementById('specialInstructions').value = '';
    document.querySelector('input[name="orderType"][value="dine-in"]').checked = true;
}

// Show modal with order summary
function showOrderConfirmation(order, orderId) {
    const confirmationDetails = document.getElementById('confirmationDetails');

    confirmationDetails.innerHTML = `
        <div class="order-summary">
            <p><strong>Order #:</strong> ${orderId ? orderId : Math.floor(Math.random() * 10000)}</p>
            <p><strong>Customer:</strong> ${order.customerName}</p>
            <p><strong>Table:</strong> ${order.tableNumber}</p>
            <p><strong>Order Type:</strong> ${order.orderType}</p>
            <p><strong>Total:</strong> ${formatPrice(order.total)}</p>
            <p><strong>Estimated Time:</strong> 20-25 minutes</p>
            ${order.specialInstructions ? `<p><strong>Special Instructions:</strong> ${order.specialInstructions}</p>` : ''}
        </div>
    `;

    confirmationModal.classList.remove('hidden');
}

// Close confirmation modal
function closeModal() {
    confirmationModal.classList.add('hidden');
}

// Prevent modal closing when clicking inside content
document.querySelector('.modal-content').addEventListener('click', (e) => {
    e.stopPropagation();
});

// Close modal when clicking outside
confirmationModal.addEventListener('click', closeModal);
