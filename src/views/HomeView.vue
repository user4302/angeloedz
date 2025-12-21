<template>
    <div id="home">
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
  import HeroSection from '@/components/sections/HeroSection.vue';
  import ProjectSection from '@/components/sections/ProjectSection.vue';
  import ExperienceSection from '@/components/sections/ExperienceSection.vue';
  import SkillsSection from '@/components/sections/SkillsSection.vue';
  import PersonalProjectsSection from '@/components/sections/PersonalProjectsSection.vue';
  import LearningDevelopmentSection from '@/components/sections/LearningDevelopmentSection.vue';
  import CareerGoalsSection from '@/components/sections/CareerGoalsSection.vue';
  import TestimonialsSection from '@/components/sections/TestimonialsSection.vue';
  import ChallengesSolutionsSection from '@/components/sections/ChallengesSolutionsSection.vue';
  import CommunityInvolvementSection from '@/components/sections/CommunityInvolvementSection.vue';
  
  export default {
    name: 'HomeView',
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
