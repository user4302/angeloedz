<template>
  <div>
    <button 
      :class="['cv-trigger-btn', { 'floating-cv-icon': !isMobileBar, 'mobile-btn-style': isMobileBar }]" 
      @click="openViewer"
      :title="isMobileBar ? 'View CV' : ''"
    >
      <span class="material-icons">description</span>
    </button>

    <div class="pdf-viewer-overlay" v-if="isVisible" @click.self="closeViewer">
      <div class="pdf-viewer-container">
        <div class="viewer-header">
          <h2>Curriculum Vitae</h2>
          <div class="header-actions">
            <a 
              :href="pdfPath" 
              target="_blank"
              class="btn-external"
              title="Open in new tab"
              @click.stop
            >
              <span class="material-icons">open_in_new</span>
            </a>
            <a 
              :href="pdfPath" 
              download="ANGELO_E_DE_ZOYSA_CV.pdf"
              class="btn-download"
              title="Download CV"
              @click.stop
            >
              <span class="material-icons">download</span>Download
            </a>
            <button class="close-button" @click="closeViewer" title="Close viewer">
              <span class="material-icons">close</span>
            </button>
          </div>
        </div>

        <div class="pdf-content">
          <iframe 
            v-if="!isMobile"
            :src="pdfPath + '#view=FitH&toolbar=0&navpanes=0&scrollbar=0'" 
            class="pdf-iframe"
            title="CV PDF Viewer"
          ></iframe>
          <div v-else class="mobile-fallback">
            <span class="material-icons fallback-icon">picture_as_pdf</span>
            <p>PDF preview is not available on mobile devices.</p>
            <a 
              :href="pdfPath" 
              download="ANGELO_E_DE_ZOYSA_CV.pdf"
              class="btn-download-large"
            >
              <span class="material-icons">download</span>
              Download CV
            </a>
            <a 
              :href="pdfPath" 
              target="_blank"
              class="btn-external-large"
            >
              <span class="material-icons">open_in_new</span>
              Open in Browser
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'DownloadCV',
  props: {
    isMobileBar: {
      type: Boolean,
      default: false
    }
  },
  data() {
    return {
      isVisible: false,
      pdfPath: '/docs/ANGELO E DE ZOYSA.pdf',
      isMobile: false,
    };
  },
  mounted() {
    this.checkMobile();
    window.addEventListener('resize', this.checkMobile);
  },
  beforeUnmount() {
    window.removeEventListener('resize', this.checkMobile);
  },
  methods: {
    openViewer() {
      this.isVisible = true;
      document.body.classList.add('no-scroll');
    },
    closeViewer() {
      this.isVisible = false;
      document.body.classList.remove('no-scroll');
    },
    checkMobile() {
      this.isMobile = window.innerWidth < 768;
    },
  },
};
</script>

<style scoped>
.cv-trigger-btn {
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  outline: none;
  background: transparent;
  padding: 0;
}
.floating-cv-icon {
  position: fixed;
  bottom: 20px;
  right: 20px;
  color: white;
  padding: 14px;
  border-radius: 50%;
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  text-align: center;
  z-index: 1000;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
}

.floating-cv-icon:hover {
  transform: translateY(-4px) scale(1.1);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.6);
}

.mobile-btn-style {
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: white;
  background: rgba(255, 255, 255, 0.1);
  transition: all 0.2s ease;
}

.mobile-btn-style:hover {
  background: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.mobile-btn-style .material-icons {
  font-size: 24px;
}

.floating-cv-icon .material-icons {
  font-size: 24px;
}

.pdf-viewer-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(15, 23, 42, 0.9);
  backdrop-filter: blur(8px);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1001;
  animation: fadeIn 0.3s ease;
  padding: 20px;
}

@keyframes fadeIn {
  from {
    opacity: 0;
  }
  to {
    opacity: 1;
  }
}

.pdf-viewer-container {
  background: #1e293b;
  width: 100%;
  max-width: 1000px;
  height: 90vh;
  max-height: 900px;
  border-radius: 20px;
  border: 1px solid rgba(255, 255, 255, 0.05);
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  overflow: hidden;
  animation: slideUp 0.4s cubic-bezier(0.34, 1.56, 0.64, 1);
}

@keyframes slideUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

.viewer-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 24px 32px;
  background: rgba(15, 23, 42, 0.6);
  border-bottom: 1px solid rgba(255, 255, 255, 0.05);
}

.viewer-header h2 {
  font-size: 1.5rem;
  font-weight: 800;
  color: #f8fafc;
  margin: 0;
  background: linear-gradient(to right, #ffffff 30%, #94a3b8);
  background-clip: text;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.header-actions {
  display: flex;
  gap: 12px;
  align-items: center;
}

.btn-download {
  display: flex;
  align-items: center;
  gap: 8px;
  padding: 10px 20px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-radius: 10px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.3);
  font-size: 0.95rem;
}

.btn-download:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(99, 102, 241, 0.5);
  filter: brightness(1.1);
}

.btn-download .material-icons {
  font-size: 20px;
}

.btn-external {
  background-color: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  border-radius: 50%;
  padding: 10px 12px;
  height: 44px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
  text-decoration: none;
}

.btn-external:hover {
  background-color: #6366f1;
  color: white;
  transform: translateY(-2px);
  border-color: #6366f1;
  box-shadow: 0 4px 12px rgba(99, 102, 241, 0.4);
}

.btn-external .material-icons {
  font-size: 24px;
}

.viewer-header .btn-external {
  width: 22px !important;
  height: 22px !important;
  padding: 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.viewer-header .btn-download {
  width:120px !important;
  padding: 8px !important;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0;
}

.viewer-header .btn-download .material-icons {
  font-size: 24px;
}

.viewer-header .btn-download span:not(.material-icons) {
  display: none;
}

.close-button {
  background-color: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  border-radius: 50%;
  padding: 8px;
  width: 40px;
  height: 40px;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;
}

.close-button:hover {
  background-color: #ef4444;
  color: white;
  transform: rotate(90deg);
  border-color: #ef4444;
}

.close-button .material-icons {
  font-size: 24px;
}

.pdf-content {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  background: #0f172a;
}

.pdf-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.mobile-fallback {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 40px;
  color: #cbd5e1;
}

.fallback-icon {
  font-size: 80px;
  color: #6366f1;
  margin-bottom: 20px;
}

.mobile-fallback p {
  font-size: 1.1rem;
  margin-bottom: 30px;
  color: #94a3b8;
}

.btn-download-large {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 16px 32px;
  background: linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%);
  color: white;
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  box-shadow: 0 4px 16px rgba(99, 102, 241, 0.4);
  font-size: 1.1rem;
}

.btn-download-large:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.6);
  filter: brightness(1.1);
}

.btn-download-large .material-icons {
  font-size: 24px;
}

.btn-external-large {
  display: flex;
  align-items: center;
  gap: 10px;
  padding: 14px 32px;
  background: rgba(255, 255, 255, 0.05);
  color: #f8fafc;
  border: 1px solid rgba(255, 255, 255, 0.1);
  border-radius: 12px;
  font-weight: 700;
  text-decoration: none;
  transition: all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  font-size: 1.1rem;
  margin-top: 16px;
}

.btn-external-large:hover {
  background: #6366f1;
  border-color: #6366f1;
  transform: translateY(-2px);
  box-shadow: 0 8px 24px rgba(99, 102, 241, 0.4);
}

.btn-external-large .material-icons {
  font-size: 24px;
}

/* Responsive */
@media (max-width: 768px) {
  .pdf-viewer-overlay {
    padding: 0;
    align-items: center; /* Center alignment is safer */
  }

  .pdf-viewer-container {
    position: fixed; /* Fixed to viewport to avoid 100vh issues */
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    width: 100%;
    height: 100%;
    max-height: none;
    border-radius: 0;
    border: none;
    display: flex;
    flex-direction: column;
    z-index: 1002;
  }

  .viewer-header {
    padding: 16px 20px;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    gap: 12px;
    flex-shrink: 0; /* Prevent header shrinking */
  }

  .viewer-header h2 {
    font-size: 1.1rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .header-actions {
    width: auto;
    justify-content: flex-end;
    gap: 8px;
  }

  .btn-download,
  .btn-external {
    display: none !important;
  }

  .viewer-header .btn-download {
    display: none !important;
  }
}
</style>