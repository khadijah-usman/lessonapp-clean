/*
==============================================================
CST3144 FULL-STACK COURSEWORK — FRONTEND LOGIC (Vue.js SPA)

This file controls:
- Lesson data (10 items with subject, location, price, spaces)
- Searching and sorting of lessons
- Add-to-cart behaviour with spaces decrement
- Cart quantity updates (+ / -)
- Line totals and cart total calculation
- Checkout form validation (Name + Phone)
- Order confirmation message

All UI bindings are in index.html.
==============================================================
*/

const { createApp } = Vue;

createApp({
  data() {
    return {
      /*
      ==========================================================
      LESSON DATA (Front-end only version)
      - Each lesson begins with 5 spaces (coursework requirement)
      - image can be remote URL or local PNG (biology.png)
      ==========================================================
      */
      lessons: [
        {
          id: 1,
          subject: "Mathematics",
          location: "Hendon",
          price: 100,
          spaces: 5,
          icon: "fa-solid fa-calculator",
          image: "https://img.icons8.com/color/240/calculator--v1.png"
        },
        {
          id: 2,
          subject: "English",
          location: "Colindale",
          price: 80,
          spaces: 5,
          icon: "fa-solid fa-book-open",
          image: "https://img.icons8.com/color/240/book-reading.png"
        },
        {
          id: 3,
          subject: "Biology",
          location: "Golders Green",
          price: 90,
          spaces: 5,
          icon: "fa-solid fa-seedling",
          // biology.png must be in the same folder as index.html
          image: "biology.png"
        },
        {
          id: 4,
          subject: "Chemistry",
          location: "Brent Cross",
          price: 70,
          spaces: 5,
          icon: "fa-solid fa-flask",
          image: "https://img.icons8.com/color/240/test-tube.png"
        },
        {
          id: 5,
          subject: "History",
          location: "Hendon",
          price: 50,
          spaces: 5,
          icon: "fa-solid fa-landmark",
          image: "https://img.icons8.com/color/240/scroll.png"
        },
        {
          id: 6,
          subject: "Physics",
          location: "Colindale",
          price: 95,
          spaces: 5,
          icon: "fa-solid fa-atom",
          image: "https://img.icons8.com/color/240/physics.png"
        },
        {
          id: 7,
          subject: "Art",
          location: "Brent Cross",
          price: 60,
          spaces: 5,
          icon: "fa-solid fa-palette",
          image: "https://img.icons8.com/color/240/art-prices.png"
        },
        {
          id: 8,
          subject: "Geography",
          location: "Golders Green",
          price: 85,
          spaces: 5,
          icon: "fa-solid fa-earth-europe",
          image: "https://img.icons8.com/color/240/globe--v1.png"
        },
        {
          id: 9,
          subject: "Computer Science",
          location: "Hendon",
          price: 120,
          spaces: 5,
          icon: "fa-solid fa-code",
          image: "https://img.icons8.com/color/240/source-code.png"
        },
        {
          id: 10,
          subject: "Economics",
          location: "Colindale",
          price: 110,
          spaces: 5,
          icon: "fa-solid fa-chart-line",
          image: "https://img.icons8.com/color/240/economic-improvement.png"
        }
      ],

      /*
      ==========================================================
      UI + CART STATE
      - cart: stores selected lessons with quantity
      - showCart: toggles lesson view <-> cart view
      - searchTerm: filters lessons in real-time
      - sortBy & sortOrder: used in sorting computed property
      - name and phone: checkout form fields
      ==========================================================
      */
      cart: [],             // [{ id, subject, price, location, quantity, image }]
      showCart: false,
      searchTerm: "",
      sortBy: "subject",
      sortOrder: "asc",
      name: "",
      phone: "",
      orderConfirmed: false,
      nameError: "",
      phoneError: ""
    };
  },

  computed: {
    /*
    ==========================================================
    SEARCH FILTER
    - Matches subject, location, price, or spaces
    - Real-time updating because of v-model on search bar
    ==========================================================
    */
    filteredLessons() {
      const term = this.searchTerm.trim().toLowerCase();
      if (!term) return this.lessons;

      return this.lessons.filter((l) => {
        return (
          l.subject.toLowerCase().includes(term) ||
          l.location.toLowerCase().includes(term) ||
          String(l.price).includes(term) ||
          String(l.spaces).includes(term)
        );
      });
    },

    /*
    ==========================================================
    SORTING (ASC/DESC)
    - Controlled by sortBy and sortOrder dropdowns
    ==========================================================
    */
    sortedAndFilteredLessons() {
      return this.filteredLessons.slice().sort((a, b) => {
        const factor = this.sortOrder === "asc" ? 1 : -1;

        if (a[this.sortBy] < b[this.sortBy]) return -1 * factor;
        if (a[this.sortBy] > b[this.sortBy]) return 1 * factor;
        return 0;
      });
    },

    /*
    ==========================================================
    CART COUNT + TOTAL PRICE
    ==========================================================
    */
    cartItemCount() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    cartTotal() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },

    /*
    ==========================================================
    VALIDATION CHECK
    - Name: letters + spaces only
    - Phone: 8–15 digits
    ==========================================================
    */
    isFormValid() {
      return (
        /^[A-Za-z ]+$/.test(this.name.trim()) &&
        /^[0-9]{8,15}$/.test(this.phone.trim())
      );
    }
  },

  methods: {
    // Go back to lesson list from cart view
    goHome() {
      this.showCart = false;
    },

    /*
    ==========================================================
    CART LOGIC: ADD + REMOVE + QUANTITY UPDATES
    ==========================================================
    */

    // Add one lesson to cart and reduce spaces by 1
    addToCart(lesson) {
      if (lesson.spaces <= 0) return; // full

      const existing = this.cart.find((i) => i.id === lesson.id);

      if (existing) {
        existing.quantity += 1;
      } else {
        this.cart.push({
          id: lesson.id,
          subject: lesson.subject,
          location: lesson.location,
          price: lesson.price,
          image: lesson.image,
          quantity: 1
        });
      }

      // Decrease available spaces
      lesson.spaces -= 1;
    },

    // Increase quantity if spaces available
    increaseQuantity(index) {
      const item = this.cart[index];
      const lesson = this.lessons.find((l) => l.id === item.id);

      if (lesson && lesson.spaces > 0) {
        item.quantity += 1;
        lesson.spaces -= 1;
      }
    },

    // Decrease quantity or remove item if it hits zero
    decreaseQuantity(index) {
      const item = this.cart[index];
      const lesson = this.lessons.find((l) => l.id === item.id);

      if (!lesson) return;

      if (item.quantity > 1) {
        item.quantity -= 1;
        lesson.spaces += 1;
      } else {
        this.removeFromCart(index);
      }
    },

    // Remove entire item and restore all its spaces
    removeFromCart(index) {
      const item = this.cart[index];
      const lesson = this.lessons.find((l) => l.id === item.id);

      if (lesson) {
        lesson.spaces += item.quantity;
      }

      this.cart.splice(index, 1);
    },

    /*
    ==========================================================
    CHECKOUT LOGIC
    - Validates name & phone
    - Shows confirmation message
    - Clears cart after successful order
    ==========================================================
    */
    checkout() {
      this.nameError = "";
      this.phoneError = "";
      this.orderConfirmed = false;

      const namePattern = /^[A-Za-z ]+$/;
      const phonePattern = /^[0-9]{8,15}$/;

      if (!namePattern.test(this.name.trim())) {
        this.nameError = "Name must contain letters and spaces only.";
      }

      if (!phonePattern.test(this.phone.trim())) {
        this.phoneError = "Phone number must contain 8–15 digits.";
      }

      if (this.nameError || this.phoneError || !this.cart.length) {
        return; // stop checkout
      }

      // (Future) Backend order API call goes here
      this.orderConfirmed = true;

      // Reset cart & form
      setTimeout(() => {
        this.cart = [];
        this.name = "";
        this.phone = "";
      }, 1200);
    }
  }
}).mount("#app");