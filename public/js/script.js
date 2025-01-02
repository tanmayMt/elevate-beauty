// Example: Handle Quiz Submission
document.addEventListener("DOMContentLoaded", () => {
    const quizForm = document.querySelector("#quizForm");
    if (quizForm) {
        quizForm.addEventListener("submit", (e) => {
            e.preventDefault();

            // Get quiz inputs
            const formData = new FormData(quizForm);
            const answers = {};
            formData.forEach((value, key) => {
                answers[key] = value;
            });

            // Send answers to the server
            fetch("/quiz", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(answers),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log("Quiz Results:", data);
                    //window.location.href = "/products";
                    window.location.href = "/recommendProducts";
                })
                .catch((err) => console.error(err));
        });
    }
});

// Example: Handle Add to Cart
const addToCartButtons = document.querySelectorAll(".add-to-cart");
addToCartButtons.forEach((button) => {
    button.addEventListener("click", () => {
        const productId = button.dataset.productId;

        fetch("/cart", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ productId }),
        })
            .then((response) => response.json())
            .then((data) => alert("Product added to cart!"))
            .catch((err) => console.error(err));
    });
});
