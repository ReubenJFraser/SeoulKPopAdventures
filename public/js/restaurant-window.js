// restaurant-window.js - Handles state changes for overlay icons in the modal

console.log("restaurant-window.js loaded");

document.addEventListener("DOMContentLoaded", () => {
    console.log("Initializing restaurant overlay buttons...");

    const bookmarkButton = document.getElementById("bookmarkButton");
    const likeButton = document.getElementById("likeButton");
    const dislikeButton = document.getElementById("dislikeButton");
    const priceButton = document.getElementById("priceButton");

    // State tracking
    let bookmarkState = "bookmark"; // Options: "bookmark", "bookmark_add", "bookmark_added", "bookmark_remove"
    let likeState = "neutral"; // Options: "neutral", "liked", "disliked"
    let isDisliked = false; // Track if thumbs-down is active

    /**
     * Bookmark Button: Handles full transition between all four states.
     */
    bookmarkButton.addEventListener("click", () => {
        if (bookmarkState === "bookmark") {
            bookmarkState = "bookmark_add"; // Hover before adding
        } else if (bookmarkState === "bookmark_add") {
            bookmarkState = "bookmark_added"; // Added state
        } else if (bookmarkState === "bookmark_added") {
            bookmarkState = "bookmark_remove"; // Hover before removing
        } else if (bookmarkState === "bookmark_remove") {
            bookmarkState = "bookmark"; // Back to default
        }

        bookmarkButton.innerHTML = `<img src="/images/icons/google_material/${bookmarkState}_24dp_5F6368_FILL0_wght400_GRAD0_opsz24.svg" alt="${bookmarkState}">`;
        console.log(`Bookmark state changed to: ${bookmarkState}`);
    });

    /**
     * Like Button (Love Heart): Toggles between neutral, liked, and broken heart.
     */
    likeButton.addEventListener("click", () => {
        if (likeState === "neutral") {
            likeState = "liked";
            likeButton.innerHTML = "❤️";
            dislikeButton.classList.remove("active"); // Reset dislike if previously active
            isDisliked = false;
        } else if (likeState === "liked") {
            likeState = "disliked"; // Transition to broken heart if clicked again
            likeButton.innerHTML = "💔";
        } else if (likeState === "disliked") {
            likeState = "neutral"; // Reset back to neutral state
            likeButton.innerHTML = "🤍";
        }
        console.log(`Like state: ${likeState}`);
    });

    /**
     * Dislike Button (Thumbs Down): Toggles independent of like button.
     */
    dislikeButton.addEventListener("click", () => {
        isDisliked = !isDisliked;

        if (isDisliked) {
            dislikeButton.innerHTML = "👎";
            dislikeButton.classList.add("active");
            if (likeState === "liked") {
                likeState = "disliked"; // Convert liked to broken heart
                likeButton.innerHTML = "💔";
            }
        } else {
            dislikeButton.innerHTML = "👎";
            dislikeButton.classList.remove("active");
            if (likeState === "disliked") {
                likeState = "neutral"; // Reset broken heart to neutral
                likeButton.innerHTML = "🤍";
            }
        }
        console.log(`Dislike state: ${isDisliked ? "Disliked" : "Neutral"}`);
    });

    /**
     * Price Button: Opens a window with pricing details.
     */
    priceButton.addEventListener("click", () => {
        alert("Opening price breakdown...");
    });
});



