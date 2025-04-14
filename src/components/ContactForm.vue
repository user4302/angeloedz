<template>
  <div>
    <!-- Floating Contact Button -->
    <button class="floating-contact-icon" @click="openForm">
      <span class="material-icons">contact_mail</span>
    </button>

    <!-- Contact Form Overlay -->
    <div class="contact-form-overlay" v-if="isVisible">
      <div class="contact-form">
        <span class="close-button material-icons" @click="closeForm">
          close
        </span>
        <h2>Contact Me</h2>
        <form @submit.prevent="submitForm">
          <div>
            <label for="name">Name:</label>
            <input type="text" id="name" v-model="name" required />
          </div>
          <div>
            <label for="email">Email:</label>
            <input type="email" id="email" v-model="email" required />
          </div>
          <div>
            <label for="phone">Phone (optional):</label>
            <input type="tel" id="phone" v-model="phone" />
          </div>
          <div>
            <label for="message">Message:</label>
            <textarea id="message" v-model="message" required></textarea>
          </div>
          <button type="submit">Send</button>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  name: 'ContactForm',
  data() {
    return {
      isVisible: false,
      name: '',
      email: '',
      phone: '',
      message: '',
    };
  },
  methods: {
    openForm() {
      this.isVisible = true;
      document.body.classList.add('no-scroll'); // Add class to disable scrolling
    },
    closeForm() {
      this.isVisible = false;
      document.body.classList.remove('no-scroll'); // Remove class to enable scrolling
    },
    async submitForm() {
      try {
        const response = await axios.post(
          process.env.VUE_APP_FORMSPREE_ENDPOINT,
          {
            name: this.name,
            email: this.email,
            phone: this.phone,
            message: this.message,
          }
        );
        console.log('Form submitted:', response.data);
        this.closeForm();
      } catch (error) {
        console.error('Error submitting form:', error);
      }
    },
  },
};
</script>

<style scoped>
.floating-contact-icon {
  position: fixed;
  bottom: 20px;
  right: 80px; /* Adjust position to avoid overlap with other icons */
  color: var(--text-color);
  padding: 10px;
  border-radius: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
  border: none;
  background-color: var(--background-color);
}

.floating-contact-icon:hover {
  background-color: var(--text-color);
  color: var(--background-color);
}

.contact-form-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
}

.contact-form {
  position: relative; /* Set position to relative to position the close button */
  background-color: var(--background-color);
  padding: 20px;
  width: 90%;
  max-width: 400px;
  max-height: 80vh; /* Ensure the form does not exceed 80% of the viewport height */
  overflow-y: auto; /* Allow scrolling if content exceeds max height */
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  border-radius: 8px;
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 50%; /* Make it circular */
  padding: 5px;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
}

.close-button:hover {
  background-color: var(--text-color); /* Change background color on hover */
  color: var(--background-color); /* Change icon color on hover */
}

form div {
  margin-bottom: 10px;
}

form label {
  display: block;
  margin-bottom: 5px;
}

form input,
form textarea {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  background-color: var(--button-hover-bg-color);
  border: 1px solid var(--text-color);
  border-radius: 4px; /* Add rounded corners */
  transition: border-color 0.3s ease;
  color: var(--text-color); /* Set text color to white */
}

form input:focus,
form textarea:focus {
  border-color: var(--text-color); /* Change border color on focus */
  outline: none; /* Remove default outline */
}

form textarea {
  resize: vertical; /* Allow only vertical resizing */
}

/* Style for the send button */
form button[type='submit'] {
  background-color: var(--background-color);
  color: var(--text-color);
  border-radius: 8px; /* Make it circular */
  padding: 10px;
  width: 100px;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: none;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease, color 0.3s ease;
  margin: 0 auto; /* Center the button */
}

form button[type='submit']:hover {
  background-color: var(--text-color); /* Change background color on hover */
  color: var(--background-color); /* Change text color on hover */
}
</style>
