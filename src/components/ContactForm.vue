<template>
  <div>
    <button class="floating-contact-icon" @click="openForm">
      <span class="material-icons">mail</span>
    </button>

    <div class="contact-form-overlay" v-if="isVisible">
      <div class="contact-form" v-if="!isSubmitted">
        <span class="close-button material-icons" @click="closeForm" :disabled="isLoading">
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
          <button type="submit" :disabled="isLoading">Send</button>
          <div v-if="isLoading" class="loader">Loading...</div>
          <div v-if="errorMessage" class="error-message">
            <p>{{ errorMessage }}</p>
            <p>{{ errorResponse }}</p>
          </div>
        </form>
      </div>
      <div v-else class="success-message">
        <span class="material-icons success-icon">check_circle</span>
        <p>Form submitted</p>
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
      isLoading: false,
      isSubmitted: false,
      name: '',
      email: '',
      phone: '',
      message: '',
      errorMessage: '',
      errorResponse: '',
    };
  },
  methods: {
    openForm() {
      this.isVisible = true;
      document.body.classList.add('no-scroll');
    },
    closeForm() {
      this.isVisible = false;
      document.body.classList.remove('no-scroll');
    },
    async submitForm() {
      this.isLoading = true;
      this.errorMessage = '';
      this.errorResponse = '';
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
        if (response.status === 200) {
          this.isSubmitted = true;
          setTimeout(() => {
            this.closeForm();
            this.isSubmitted = false;
          }, 3000);
        } else {
          this.errorMessage = 'Error';
          this.errorResponse = response.data;
        }
      } catch (error) {
        this.errorMessage = 'Error';
        this.errorResponse = error.response ? error.response.data : 'An unexpected error occurred';
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>

<style scoped>
.floating-contact-icon {
  position: fixed;
  bottom: 20px;
  right: 80px;
  color: var(--white-ish);
  padding: 10px;
  border-radius: 30%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  transition: background-color 0.3s ease;
  text-align: center;
  cursor: pointer;
  z-index: 1000;
  border: none;
  background-color: var(--more-black);
}

.floating-contact-icon:hover {
  background-color: var(--white-ish);
  color: var(--more-black);
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
  position: relative;
  background-color: var(--more-black);
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
  background-color: var(--more-black);
  color: var(--white-ish);
  border-radius: 50%; 
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
  background-color: var(--white-ish);
  color: var(--more-black);
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
  background-color: var(--more-gray);
  border: 1px solid var(--white-ish);
  border-radius: 4px; 
  transition: border-color 0.3s ease;
  color: var(--white-ish); 
}

form input:focus,
form textarea:focus {
  border-color: var(--white-ish);
  outline: none;
}

form textarea {
  resize: vertical;
}

form button[type='submit'] {
  background-color: var(--more-black);
  color: var(--white-ish);
  border-radius: 8px;
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
  margin: 0 auto;
}

form button[type='submit']:hover {
  background-color: var(--white-ish); 
  color: var(--more-black); 
}

.loader {
  margin-top: 10px;
  text-align: center;
  color: var(--white-ish);
}

.error-message p {
  margin-top: 10px;
  text-align: center;
  color: red;
}

.success-message {
  text-align: center;
  color: var(--white-ish);
  font-size: 50px;
}

.success-icon {
  font-size: 100px;
  color: green;
  animation: fadeIn 0.5s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}
</style>