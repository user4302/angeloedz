import { loadImage } from '@/utils/imageLoader';

const state = {
  // Current allowed sections: 'Frontend', 'Backend', 'Scripting' 'Terminal', 'Mobile',
  projects: [
    {
      id: 1,
      imageSrc: loadImage('projects/landing-page.png'),
      icons: ['siReact', 'siTailwindcss'],
      category: 'Frontend',
      title: 'Gen Bank',
      description: 'Landing page',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/react-js/landing-page',
      liveSiteUrl: 'https://user4302-landing-page.netlify.app/',
    },
    {
      id: 2,
      imageSrc: loadImage('projects/task-tracker.png'),
      icons: ['siVuedotjs'],
      category: 'Frontend',
      title: 'Tracker',
      description: 'Simple task tracker',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/vue-js/task-tracker',
      liveSiteUrl: 'https://user4302-task-tracker.netlify.app/',
    },
    {
      id: 3,
      imageSrc: loadImage('projects/node-backend.png'),
      icons: ['siNodedotjs'],
      category: 'Backend',
      title: 'Simple Node Server',
      description: 'JSON Post handler',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/node/simple-node-server',
      liveSiteUrl: '',
    },
    {
      id: 4,
      imageSrc: loadImage('projects/git-repo-manager.png'),
      icons: ['siGnometerminal'],
      category: 'Terminal',
      title: 'Git Repo Manager',
      description: 'Manage multiple repos',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/powershell/git-repo-manager',
      liveSiteUrl: '',
    },
    {
      id: 5,
      imageSrc: loadImage('projects/winget-upgrade-helper.png'),
      icons: ['siGnometerminal'],
      category: 'Terminal',
      title: 'Winget Upgrade Helper',
      description: 'Manage winget packages',
      gitRepoUrl:
        'https://gitlab.com/Angelo_E_DZ/coding/powershell/winget-upgrade-helper',
      liveSiteUrl: '',
    },
    {
      id: 6,
      imageSrc: loadImage('projects/cron-game-backup.png'),
      icons: ['siGnubash'],
      category: 'Scripting',
      title: 'Cron Game Backup',
      description: 'Backup game files to git',
      gitRepoUrl: 'https://gitlab.com/Angelo_E_DZ/coding/shell/game-backups',
      liveSiteUrl: '',
    },
    {
      id: 7,
      imageSrc: loadImage('projects/multi-language-library.png'),
      icons: ['siNextdotjs', 'siTailwindcss'],
      category: 'Frontend',
      title: 'Library',
      description: 'Multiple Language Library',
      gitRepoUrl: 'https://gitlab.com/user4302_Projects/coding/next-js/stardust',
      liveSiteUrl: 'https://user4302-stardust.netlify.app',
    },
    {
      id: 8,
      imageSrc: loadImage('projects/git-repo-orchestrator.png'),
      icons: ['siTextual'],
      category: 'Terminal',
      title: 'Git Repo Orchestrator',
      description: 'Manage multiple repos',
      gitRepoUrl: 'https://gitlab.com/user4302_Projects/coding/python/textual/goro',
      liveSiteUrl: 'https://pypi.org/project/goro',
    },
    {
      id: 9,
      imageSrc: loadImage('nervous.png'),
      icons: [''],
      category: 'Mobile',
      title: '',
      description: '',
      gitRepoUrl: '',
      liveSiteUrl: '',
    },
  ],
};

const getters = {
  getProjectById: (state) => (id) => {
    return state.projects.find((project) => project.id === id);
  },
  getProjects: (state) => state.projects,
};

export default {
  namespaced: true,
  state,
  getters,
};
