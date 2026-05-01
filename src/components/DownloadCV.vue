<template>
  <div>
    <button 
      :class="['trigger-btn floating-btn', { 'floating-cv-icon': !isMobileBar, 'mobile-btn-style': isMobileBar }]" 
      @click="openViewer"
      :title="isMobileBar ? 'View CV' : ''"
    >
      <span class="material-icons">description</span>
    </button>

    <div class="modal-overlay pdf-viewer-overlay" v-if="isVisible" @click.self="closeViewer">
      <div class="modal-container pdf-viewer-container modal-large modal-custom-scrollbar">
        <div class="modal-header viewer-header">
          <h2>Curriculum Vitae</h2>
          <div class="header-actions">
            <a 
              v-if="!isMobile"
              :href="pdfPath" 
              target="_blank"
              class="btn-large btn-large-secondary btn-external"
              title="Open in new tab"
              @click.stop
            >
              <span class="material-icons">open_in_new</span>
            </a>
            <a 
              v-if="!isMobile"
              :href="pdfPath" 
              download="ANGELO_E_DE_ZOYSA_CV.pdf"
              class="btn-large btn-large-primary btn-download"
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

        <div class="modal-content pdf-content">
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
              class="btn-large btn-large-primary btn-download-large"
            >
              <span class="material-icons">download</span>
              Download CV
            </a>
            <a 
              :href="pdfPath" 
              target="_blank"
              class="btn-large btn-large-secondary btn-external-large"
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
import '@/styles/DownloadCV.css';

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