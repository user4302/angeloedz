<template>
  <div>
    <!-- Floating Contact Button -->
    <button class="floating-contact-icon" @click="openForm">
      <span class="material-icons">contact_mail</span>
    </button>

    <!-- Contact Form Overlay -->
    <div class="contact-form-overlay" v-if="isVisible">
      <div class="contact-form">
        <button class="close-button" @click="closeForm">X</button>
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
    },
    closeForm() {
      this.isVisible = false;
    },
    async submitForm() {
      try {
        const response = await axios.post(process.env.VUE_APP_FORMSPREE_ENDPOINT, {
          name: this.name,
          email: this.email,
          phone: this.phone,
          message: this.message,
        });
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
  color: white;
  padding: 10px;
  border-radius: 50%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
}

.floating-contact-icon:hover {
  background-color: white;
  color: black;
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
  background-color: white;
  padding: 20px;
  width: 90%;
  max-width: 400px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
}

.close-button {
  position: absolute;
  top: 10px;
  right: 10px;
  cursor: pointer;
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
}
</style>