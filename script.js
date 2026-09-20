document.addEventListener("DOMContentLoaded", function () {


    // =========================
    // سبد خرید
    // =========================

    let cart =
        JSON.parse(localStorage.getItem("digishop-cart")) || [];


    const cartCountElement =
        document.getElementById("cart-count");

    const cartButtons =
        document.querySelectorAll(".add-cart-btn");

    const cartSidebar =
        document.querySelector(".cart-sidebar");

    const cartOverlay =
        document.querySelector(".cart-overlay");

    const cartItems =
        document.querySelector(".cart-items");

    const cartTotalPrice =
        document.getElementById("cart-total-price");

    const cartClose =
        document.querySelector(".cart-close");

    const cartLink =
        document.querySelector(".cart-link");


    // =========================
    // باز کردن سبد
    // =========================

    cartLink.addEventListener("click", function (event) {

        event.preventDefault();

        cartSidebar.classList.add("active");

        cartOverlay.classList.add("active");

    });


    // =========================
    // بستن سبد
    // =========================

    cartClose.addEventListener("click", closeCart);

    cartOverlay.addEventListener("click", closeCart);


    function closeCart() {

        cartSidebar.classList.remove("active");

        cartOverlay.classList.remove("active");

    }


    // =========================
    // ذخیره سبد
    // =========================

    function saveCart() {

        localStorage.setItem(
            "digishop-cart",
            JSON.stringify(cart)
        );

    }


    // =========================
    // اضافه کردن محصول
    // =========================

    cartButtons.forEach(function (button) {

        button.addEventListener("click", function () {

            const name =
                button.dataset.name;

            const price =
                Number(button.dataset.price);

            const image =
                button.dataset.image;


            const existingProduct =
                cart.find(function (product) {

                    return product.name === name;

                });


            if (existingProduct) {

                existingProduct.quantity++;

            } else {

                cart.push({

                    name: name,

                    price: price,

                    image: image,

                    quantity: 1

                });

            }


            saveCart();

            updateCart();


            cartSidebar.classList.add("active");

            cartOverlay.classList.add("active");

        });

    });


    // =========================
    // نمایش سبد خرید
    // =========================

    function updateCart() {

        cartItems.innerHTML = "";


        if (cart.length === 0) {

            cartItems.innerHTML = `
                <p class="empty-cart">
                    سبد خرید شما خالی است.
                </p>
            `;

        }


        cart.forEach(function (product, index) {

            const cartItem =
                document.createElement("div");

            cartItem.className = "cart-item";


            cartItem.innerHTML = `

                <div class="cart-item-image">

                    <img
                        src="${product.image}"
                        alt="${product.name}"
                    >

                </div>


                <div class="cart-item-info">

                    <h4>
                        ${product.name}
                    </h4>


                    <div class="cart-item-price">

                        ${formatPrice(product.price)}
                        تومان

                    </div>


                    <div class="cart-item-controls">

                        <button
                            type="button"
                            class="quantity-btn decrease-btn"
                            data-index="${index}"
                        >
                            -
                        </button>


                        <span class="cart-quantity">
                            ${product.quantity}
                        </span>


                        <button
                            type="button"
                            class="quantity-btn increase-btn"
                            data-index="${index}"
                        >
                            +
                        </button>


                        <button
                            type="button"
                            class="remove-item"
                            data-index="${index}"
                        >

                            <i class="bi bi-trash3"></i>

                        </button>

                    </div>

                </div>

            `;


            cartItems.appendChild(cartItem);

        });


        updateCartCount();

        updateTotal();

        addCartItemEvents();

    }


    // =========================
    // تعداد کل محصولات
    // =========================

    function updateCartCount() {

        let totalQuantity = 0;


        cart.forEach(function (product) {

            totalQuantity += product.quantity;

        });


        cartCountElement.textContent =
            totalQuantity;

    }


    // =========================
    // مجموع قیمت
    // =========================

    function updateTotal() {

        let total = 0;


        cart.forEach(function (product) {

            total +=
                product.price *
                product.quantity;

        });


        cartTotalPrice.textContent =
            formatPrice(total);

    }


    // =========================
    // فرمت قیمت
    // =========================

    function formatPrice(price) {

        return price.toLocaleString("fa-IR");

    }


    // =========================
    // دکمه های سبد
    // =========================

    function addCartItemEvents() {


        const increaseButtons =
            document.querySelectorAll(".increase-btn");


        const decreaseButtons =
            document.querySelectorAll(".decrease-btn");


        const removeButtons =
            document.querySelectorAll(".remove-item");


        increaseButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                cart[index].quantity++;


                saveCart();

                updateCart();

            });

        });


        decreaseButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                if (cart[index].quantity > 1) {

                    cart[index].quantity--;

                } else {

                    cart.splice(index, 1);

                }


                saveCart();

                updateCart();

            });

        });


        removeButtons.forEach(function (button) {

            button.addEventListener("click", function () {

                const index =
                    Number(button.dataset.index);


                cart.splice(index, 1);


                saveCart();

                updateCart();

            });

        });

    }


    // =========================
    // جستجوی محصولات
    // =========================

    const searchInput =
        document.getElementById("search-input");


    const productCards =
        document.querySelectorAll(".product-card");


searchInput.addEventListener("input", function () {

    const searchText =
        searchInput.value.trim().toLowerCase();


    productCards.forEach(function (card) {

        const productButton =
            card.querySelector(".add-cart-btn");


        const productName =
            productButton.dataset.name.toLowerCase();


        if (productName.includes(searchText)) {

            card.style.display = "";

        } else {

            card.style.display = "none";

        }

    });


    // رفتن به بخش محصولات

    if (searchText !== "") {

        productCards[0].scrollIntoView({
            behavior: "smooth",
            block: "start"
        });

    }

});

    // =========================
    // اجرای اولیه
    // =========================

    updateCart();

});