<template>
  <div id="app">
    <HeroSection />
    <ProjectSection />
    <ExperienceSection />
    <SkillsSection />
    <PersonalProjectsSection />
    <LearningDevelopmentSection />
    <CareerGoalsSection />
    <TestimonialsSection />
    <ChallengesSolutionsSection />
    <CommunityInvolvementSection />
  </div>
</template>

<script>
import HeroSection from './components/sections/HeroSection.vue';
import ProjectSection from './components/sections/ProjectSection.vue';
import ExperienceSection from './components/sections/ExperienceSection.vue';
import SkillsSection from './components/sections/SkillsSection.vue';
import PersonalProjectsSection from './components/sections/PersonalProjectsSection.vue';
import LearningDevelopmentSection from './components/sections/LearningDevelopmentSection.vue';
import CareerGoalsSection from './components/sections/CareerGoalsSection.vue';
import TestimonialsSection from './components/sections/TestimonialsSection.vue';
import ChallengesSolutionsSection from './components/sections/ChallengesSolutionsSection.vue';
import CommunityInvolvementSection from './components/sections/CommunityInvolvementSection.vue';

export default {
  name: 'App',
  components: {
    HeroSection,
    ProjectSection,
    ExperienceSection,
    SkillsSection,
    PersonalProjectsSection,
    LearningDevelopmentSection,
    CareerGoalsSection,
    TestimonialsSection,
    ChallengesSolutionsSection,
    CommunityInvolvementSection,
  },
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
body {
  background-color: #121212;
  color: #e0e0e0;
  font-family: 'Arial', sans-serif;
  margin: 0;
  padding: 0;
}

a {
  color: #bb86fc;
  text-decoration: none;
}

a:hover {
  color: #3700b3;
}

button {
  background-color: #1f1f1f;
  color: #e0e0e0;
  border: 1px solid #333;
  border-radius: 5px;
  padding: 10px 20px;
  cursor: pointer;
}

button:hover {
  background-color: #333;
}

.section {
  padding: 20px;
  background-color: #1e1e1e;
  border-radius: 8px;
  margin-bottom: 20px;
}

.section-buttons button {
  background-color: #333;
  color: #e0e0e0;
}

.section-buttons button:hover {
  background-color: #444;
}

.card-container {
  background-color: #1e1e1e;
}

.project-card {
  background-color: #2c2c2c;
  border: 1px solid #444;
  border-radius: 8px;
  transition: transform 0.5s ease, box-shadow 0.5s ease;
}

.project-card:hover {
  transform: scale(1.05);
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.5);
}

h2 {
  color: #bb86fc;
}

p {
  color: #e0e0e0;
}
</style>
