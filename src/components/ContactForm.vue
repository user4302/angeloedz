<template>
  <div>
    <button 
      :class="['trigger-btn floating-btn', { 'floating-contact-icon': !isMobileBar, 'mobile-btn-style': isMobileBar }]" 
      @click="openForm"
      :title="isMobileBar ? 'Contact Me' : ''"
    >
      <span class="material-icons">mail</span>
    </button>

    <div class="modal-overlay contact-form-overlay" v-if="isVisible" @click.self="closeForm">
      <div class="modal-container contact-form modal-large modal-custom-scrollbar" v-if="!isSubmitted">
        <div class="modal-header contact-header">
          <h2>Contact Me</h2>
          <div class="header-actions">
            <button class="close-button" @click="closeForm" :disabled="isLoading" title="Close form">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>
        
        <div class="modal-content contact-content">
          <form @submit.prevent="submitForm">
            <div>
              <label for="name">Name</label>
              <input type="text" id="name" v-model="name" required />
            </div>
            <div>
              <label for="email">Email</label>
              <input type="email" id="email" v-model="email" required />
            </div>
            <div>
              <label for="phone">Phone No. (optional)</label>
              <input type="tel" id="phone" v-model="phone" />
            </div>
            <div class="textarea-container">
              <label for="message">Message</label>
              <div class="textarea-wrapper">
                <textarea 
                  id="message" 
                  v-model="message" 
                  required
                  ref="messageTextarea"
                ></textarea>
                <div 
                  class="resize-handle" 
                  title="Drag to resize"
                  ref="resizeHandle"
                  @mousedown="startResize"
                  @touchstart="startResize"
                >
                  <span class="material-icons">expand</span>
                </div>
              </div>
            </div>
            <button type="submit" :disabled="isLoading" class="btn-primary">Send</button>
            <div v-if="isLoading" class="loader">Loading...</div>
            <div v-if="errorMessage" class="error-message">
              <p>{{ errorMessage }}</p>
              <p>{{ errorResponse }}</p>
            </div>
          </form>
        </div>
      </div>
      <div v-else class="modal-container success-message">
        <span class="material-icons success-icon">check_circle</span>
        <p>Form submitted</p>
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import '@/styles/ContactForm.css';

export default {
  name: 'ContactForm',
  props: {
    isMobileBar: {
      type: Boolean,
      default: false
    }
  },
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
      isResizing: false,
      startY: 0,
      startHeight: 0,
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
    startResize(e) {
      e.preventDefault();
      
      this.isResizing = true;
      this.startY = e.clientY || e.touches[0].clientY;
      this.startHeight = this.$refs.messageTextarea.offsetHeight;
      
      // Add global event listeners
      document.addEventListener('mousemove', this.handleResize);
      document.addEventListener('mouseup', this.stopResize);
      document.addEventListener('touchmove', this.handleResize);
      document.addEventListener('touchend', this.stopResize);
    },
    handleResize(e) {
      if (!this.isResizing) return;
      
      const currentY = e.clientY || e.touches[0].clientY;
      const deltaY = currentY - this.startY;
      const newHeight = Math.max(120, this.startHeight + deltaY);
      
      this.$refs.messageTextarea.style.height = newHeight + 'px';
    },
    stopResize() {
      this.isResizing = false;
      
      // Remove global event listeners
      document.removeEventListener('mousemove', this.handleResize);
      document.removeEventListener('mouseup', this.stopResize);
      document.removeEventListener('touchmove', this.handleResize);
      document.removeEventListener('touchend', this.stopResize);
    },
  },
};
</script>

