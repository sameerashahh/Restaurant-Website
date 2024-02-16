document.addEventListener('DOMContentLoaded', function() {
    const reviewForm = document.getElementById('review-form');

    reviewForm.addEventListener('submit', function(event) {
        event.preventDefault();

        const name = document.getElementById('name').value;
        const rating = document.getElementById('rating').value;
        const review = document.getElementById('review').value;

        addReview(name, rating, review);
        this.reset();
    });

    function addReview(name, rating, review) {
        const testimonialsSection = document.getElementById('testimonials');
        const reviewContainer = document.createElement('div');
        reviewContainer.classList.add('testimonial');

        const reviewerInfo = document.createElement('p');
        reviewerInfo.innerHTML = `<strong>${name}</strong> - ${rating} stars`;

        const reviewContent = document.createElement('p');
        reviewContent.textContent = review;

        reviewContainer.appendChild(reviewerInfo);
        reviewContainer.appendChild(reviewContent);

        testimonialsSection.appendChild(reviewContainer);
    }

    const menuLink = document.getElementById('menu-link');
    const menuSection = document.getElementById('menu-section');
    const homeLink = document.getElementById('home-link');
    const homeSections = document.querySelectorAll('.home-section');
    const cartSection = document.getElementById('cart');
    const cartItemsContainer = document.getElementById('cart-items');
    const cartTotal = document.getElementById('cart-total');

    menuSection.style.display = 'none';
    cartSection.style.display = 'none';

    menuLink.addEventListener('click', function(event) {
        event.preventDefault();

        homeSections.forEach(section => {
            section.style.display = 'none';
        });

        menuSection.style.display = 'block';

        cartSection.style.display = 'none';

    });

    homeLink.addEventListener('click', function(event) {
        event.preventDefault();

        homeSections.forEach(section => {
            section.style.display = 'block';
        });

        menuSection.style.display = 'none';
        cartSection.style.display = 'none';
    });

    function addItemToCart(name, price) {
        const cartItem = document.createElement('li');
        cartItem.textContent = `${name} - $${price.toFixed(2)}`;
        cartItemsContainer.appendChild(cartItem);

        calculateTotal();
    }

    function calculateTotal() {
        let total = 0;
        cartItemsContainer.querySelectorAll('li').forEach(item => {
            const price = parseFloat(item.textContent.match(/\$\d+\.\d+/)[0].slice(1));
            total += price;
        });
        cartTotal.textContent = '$' + total.toFixed(2);
    }

    menuSection.addEventListener('click', function(event) {
        if (event.target.classList.contains('add-to-cart-btn')) {
            const name = event.target.dataset.name;
            const price = parseFloat(event.target.dataset.price);
            addItemToCart(name, price);
            cartSection.style.display = 'block';
        }
    });
});
