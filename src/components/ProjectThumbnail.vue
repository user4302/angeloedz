<template>
  <div class="thumbnail-container" :class="{ 'no-image': !hasValidImage }" :style="fallbackStyle">
    <img
      v-if="hasValidImage"
      :src="optimizedSrc"
      :alt="alt"
      loading="lazy"
      decoding="async"
      @error="handleError"
      class="thumbnail-image"
    />
    <div v-else class="fallback-content">
      <span class="initials">{{ initials }}</span>
    </div>
  </div>
</template>

<script setup>
import { computed, ref, defineProps } from 'vue';

const props = defineProps({
  src: {
    type: String,
    default: '',
  },
  alt: {
    type: String,
    default: 'Project Thumbnail',
  },
  title: {
    type: String,
    required: true,
  },
});

const loadError = ref(false);

const hasValidImage = computed(() => {
  return props.src && !loadError.value;
});

// Generate Netlify Image CDN URL if applicable
const optimizedSrc = computed(() => {
  if (!props.src) return '';
  
  // If running locally or strict relative path, return as is
  // In production on Netlify, we can use: /.netlify/images?url=...&w=...
  // For now, let's keep it simple or implement if environmental variable exists
  // For this implementation, we will return the source directly but prepared for CDN
  
  /* 
   * Netlify Image CDN format:
   * /.netlify/images?url=/images/projects/my-image.png&w=600&q=80
   */
   
  if (props.src.startsWith('http')) return props.src;
  
  // Basic check to see if we are likely on Netlify (or just always use it if the redirect is set up)
  // For safety in this environment without specific Netlify config knowledge, 
  // we'll return the original src but add a query param for cache breaking if needed
  // or implement the actual CDN path if we are sure.
  
  return props.src; 
});

const initials = computed(() => {
  const words = props.title.split(' ');
  
  // Helper function to get the first alphabetical character from a string
  const getFirstAlpha = (str) => {
    for (let i = 0; i < str.length; i++) {
      const char = str[i];
      if (/[a-zA-Z]/.test(char)) {
        return char.toUpperCase();
      }
    }
    return '';
  };
  
  if (words.length >= 2) {
    const firstChar = getFirstAlpha(words[0]);
    const secondChar = getFirstAlpha(words[1]);
    
    // If we got both characters, use them
    if (firstChar && secondChar) {
      return firstChar + secondChar;
    }
    
    // If we only got one character, find the next alphabetical character from the title
    if (firstChar) {
      const remainingTitle = words.slice(1).join(' ');
      const nextChar = getFirstAlpha(remainingTitle);
      return nextChar ? firstChar + nextChar : firstChar;
    }
  }
  
  // Fallback: get first two alphabetical characters from the entire title
  const result = [];
  for (let i = 0; i < props.title.length && result.length < 2; i++) {
    const char = props.title[i];
    if (/[a-zA-Z]/.test(char)) {
      result.push(char.toUpperCase());
    }
  }
  
  return result.join('');
});

// Generate a deterministic color based on the title
const fallbackStyle = computed(() => {
  if (hasValidImage.value) return {};
  
  let hash = 0;
  for (let i = 0; i < props.title.length; i++) {
    hash = props.title.charCodeAt(i) + ((hash << 5) - hash);
  }
  
  const h = Math.abs(hash % 360);
  return {
    background: `linear-gradient(135deg, hsl(${h}, 70%, 60%) 0%, hsl(${h + 40}, 70%, 40%) 100%)`,
  };
});

const handleError = () => {
  loadError.value = true;
};
</script>

<style scoped>
.thumbnail-container {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
  background-color: #f1f5f9;
}

.thumbnail-image {
  width: 100%;
  height: 100%;
  object-fit: cover;
  transition: transform 0.3s ease;
}

.thumbnail-container:hover .thumbnail-image {
  transform: scale(1.05);
}

/* Fallback Styling */
.no-image {
  display: flex;
  align-items: center;
  justify-content: center;
}

.fallback-content {
  color: white;
  font-weight: 800;
  font-size: 2rem;
  text-shadow: 0 2px 4px rgba(0,0,0,0.2);
  letter-spacing: 0.05em;
}
</style>
