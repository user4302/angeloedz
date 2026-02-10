const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROJECTS_DIR = path.join(__dirname, '../src/assets/projects');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.json');
const DATA_DIR = path.join(__dirname, '../src/data');

/**
 * Mapping of technology tags to Iconify slugs.
 * Normalized keys (lowercase, no spaces) to match extracted tags.
 */
const techMap = {
  // Languages
  'python': 'simple-icons:python',
  'javascript': 'simple-icons:javascript',
  'typescript': 'simple-icons:typescript',
  'bash': 'simple-icons:gnubash',
  'bash-scripting': 'simple-icons:gnubash',
  'shell-scripting': 'simple-icons:gnubash',
  'shell': 'simple-icons:gnubash',
  'csharp': 'simple-icons:csharp',
  'cplusplus': 'simple-icons:cplusplus',
  'java': 'simple-icons:java',
  'go': 'simple-icons:go',
  'rust': 'simple-icons:rust',
  'php': 'simple-icons:php',
  'powershell': 'simple-icons:powershell',

  // Frameworks/Libraries
  'vue': 'simple-icons:vuedotjs',
  'vuejs': 'simple-icons:vuedotjs',
  'vue-js': 'simple-icons:vuedotjs',
  'vuedotjs': 'simple-icons:vuedotjs',
  'react': 'simple-icons:react',
  'reactjs': 'simple-icons:react',
  'react-js': 'simple-icons:react',
  'nextjs': 'simple-icons:nextdotjs',
  'next-js': 'simple-icons:nextdotjs',
  'nextdotjs': 'simple-icons:nextdotjs',
  'angular': 'simple-icons:angular',
  'angularjs': 'simple-icons:angular',
  'angular-js': 'simple-icons:angular',
  'nodejs': 'simple-icons:nodedotjs',
  'node-js': 'simple-icons:nodedotjs',
  'nodedotjs': 'simple-icons:nodedotjs',
  'express': 'simple-icons:express',
  'expressjs': 'simple-icons:express',
  'tailwindcss': 'simple-icons:tailwindcss',
  'tailwind-css': 'simple-icons:tailwindcss',
  'bootstrap': 'simple-icons:bootstrap',
  'sass': 'simple-icons:sass',
  'scss': 'simple-icons:sass',
  'material-ui': 'simple-icons:mui',
  'mui': 'simple-icons:mui',
  'vuetify': 'simple-icons:vuetify',
  'flask': 'simple-icons:flask',
  'django': 'simple-icons:django',
  'fastapi': 'simple-icons:fastapi',
  'laravel': 'simple-icons:laravel',
  'symfony': 'simple-icons:symfony',
  'zustand': 'simple-icons:zustand',
  'redux': 'simple-icons:redux',
  'formik': 'simple-icons:formik',
  'yup': 'simple-icons:yup',
  'prisma': 'simple-icons:prisma',
  'drizzle': 'simple-icons:drizzle',
  'supabase': 'simple-icons:supabase',
  'sanity-cms': 'simple-icons:sanity',
  'sanity': 'simple-icons:sanity',
  'nextauth': 'simple-icons:nextauth',
  'nextauth-js': 'simple-icons:nextauth',
  'lucide-react': 'simple-icons:lucide',
  'lucide': 'simple-icons:lucide',

  // Database
  'mongodb': 'simple-icons:mongodb',
  'postgresql': 'simple-icons:postgresql',
  'mysql': 'simple-icons:mysql',
  'sqlite': 'simple-icons:sqlite',
  'firebase': 'simple-icons:firebase',

  // Tools/Platforms
  'git': 'simple-icons:git',
  'github': 'simple-icons:github',
  'gitlab': 'simple-icons:gitlab',
  'docker': 'simple-icons:docker',
  'netlify': 'simple-icons:netlify',
  'vercel': 'simple-icons:vercel',
  'auth0': 'simple-icons:auth0',
  'clerk': 'simple-icons:clerk',
  'stripe': 'simple-icons:stripe',
  'paypal': 'simple-icons:paypal',
  'figma': 'simple-icons:figma',
  'notion': 'simple-icons:notion',
  'slack': 'simple-icons:slack',
  'discord': 'simple-icons:discord',
  'adobe-photoshop': 'simple-icons:adobephotoshop',
  'photoshop': 'simple-icons:adobephotoshop',
  'adobe-illustrator': 'simple-icons:adobeillustrator',
  'illustrator': 'simple-icons:adobeillustrator',
  'adobe-premiere-pro': 'simple-icons:adobepremierepro',
  'premiere-pro': 'simple-icons:adobepremierepro',
  'adobe-after-effects': 'simple-icons:adobeaftereffects',
  'after-effects': 'simple-icons:adobeaftereffects',
  'blender': 'simple-icons:blender',
  'unity': 'simple-icons:unity',
  'unreal-engine': 'simple-icons:unrealengine',
  'arduino': 'simple-icons:arduino',
  'raspberry-pi': 'simple-icons:raspberrypi',
  'linux': 'simple-icons:linux',
  'windows': 'simple-icons:windows',
  'tmux': 'simple-icons:tmux',
  'grafana': 'simple-icons:grafana',
  'prometheus': 'simple-icons:prometheus',
  'yaml': 'simple-icons:yaml',
  'json': 'simple-icons:json',
  'minecraft': 'simple-icons:minecraft',

  // Testing
  'jest': 'simple-icons:jest',
  'vitest': 'simple-icons:vitest',
  'cypress': 'simple-icons:cypress',
  'playwright': 'simple-icons:playwright',
  'jasmine': 'simple-icons:jasmine',
  'karma': 'simple-icons:karma'
};

/**
 * Parses all Markdown files in the projects directory and generates a JSON index.
 */
function parseProjects() {
  if (!fs.existsSync(DATA_DIR)) {
    fs.mkdirSync(DATA_DIR, { recursive: true });
  }

  if (!fs.existsSync(PROJECTS_DIR)) {
    console.warn(`Projects directory not found: ${PROJECTS_DIR}`);
    fs.writeFileSync(OUTPUT_FILE, JSON.stringify([]));
    return;
  }

  const files = fs.readdirSync(PROJECTS_DIR).filter(file => file.endsWith('.md'));

  const categoryMap = {
    'ReactJS': 'Frontend',
    'VueJS': 'Frontend',
    'AngularJS': 'Frontend',
    'NextJS': 'Frontend',
    'NodeJS': 'Backend',
    'Powershell': 'Scripting',
    'Bash': 'Scripting',
    'Shell': 'Scripting',
    'Python': 'Terminal',
    'WinReg': 'Scripting',
    'Grafana': 'Terminal',
    'AutoHotkey': 'Scripting'
  };

  const projects = files.map((file) => {
    const filePath = path.join(PROJECTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Default metadata
    const rawSlug = file.replace('.md', '');
    const prefixMatch = rawSlug.match(/^(ReactJS|VueJS|AngularJS|NextJS|NodeJS|Powershell|Bash|Shell|Python|WinReg|Grafana|AutoHotkey)\s*-\s*(.*)/i);

    // Use the stripped name if a prefix was found, otherwise use the whole filename
    const slug = prefixMatch
      ? prefixMatch[2].toLowerCase().trim().replace(/[^a-z0-9]+/g, '-')
      : rawSlug.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-');

    let title = data.title || (prefixMatch ? prefixMatch[2] : rawSlug);
    let category = data.category;
    let description = data.description || '';

    // Guess category from filename if missing
    if (!category) {
      const prefix = rawSlug.split(' - ')[0];
      category = categoryMap[prefix] || 'Frontend';
    }

    // Extract from text if frontmatter is thin
    if (!data.title || !data.description) {
      const titleMatch = content.match(/\*\*Project Title:\*\*\s*(.*)/i);
      if (titleMatch && !data.title) {
        title = titleMatch[1].trim();
      }

      const descMatch = content.match(/\*\*Short Description:\*\*\s*([\s\S]*?)(?=\n\n|\*\*)/i);
      if (descMatch && !data.description) {
        description = descMatch[1].trim();
      }
    }

    // Technology Extraction
    const icons = [];

    // 1. Extract from Tags section in Markdown content
    const tagsMatch = content.match(/\*\*Tags:\*\*([\s\S]*?)(?=\n\n|$)/i);
    if (tagsMatch) {
      const tagLines = tagsMatch[1].split('\n');
      tagLines.forEach(line => {
        const tagTextMatch = line.match(/^\s*-\s*(.*)/);
        if (tagTextMatch) {
          const tag = tagTextMatch[1].toLowerCase().trim().replace(/ /g, '-');
          if (techMap[tag] && !icons.includes(techMap[tag])) {
            icons.push(techMap[tag]);
          }
        }
      });
    }

    // 2. Fallback to Frontmatter tags
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach(t => {
        const tag = t.toLowerCase().trim().replace(/ /g, '-');
        if (techMap[tag] && !icons.includes(techMap[tag])) {
          icons.push(techMap[tag]);
        }
      });
    }

    // 3. Automated Discovery from Markdown Content (existing logic, re-numbered)
    // This bridges natural language (e.g. "React.js") to Iconify IDs
    const techSearchAreaMatch = content.match(/\*\*(Short Description|Key Technologies\/Skills):\*\*([\s\S]*?)(?=\n\n|\*\*Impact\/Results:\*\*)/gi);

    if (techSearchAreaMatch) {
      techSearchAreaMatch.forEach(section => {
        const sortedKeys = Object.keys(techMap).sort((a, b) => b.length - a.length);

        for (const key of sortedKeys) {
          const icon = techMap[key];
          const escapedKey = key.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
          const regex = new RegExp(`(?<![a-z0-9])${escapedKey}(?![a-z0-9])`, 'i');

          if (regex.test(section) && !icons.includes(icon)) {
            icons.push(icon);
          }
        }
      });
    }

    // Clean up content: Remove redundant titles if they match the extracted title
    let leanContent = content;
    const escapedTitle = title.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const titleRegex = new RegExp(`^(\\s*#\\s+${escapedTitle}|\\s*\\*\\*Project Title:\\*\\*\\s*${escapedTitle})`, 'im');
    leanContent = leanContent.replace(titleRegex, '').trim();

    return {
      slug,
      title,
      category,
      description,
      icons,
      ...data,
      content: leanContent,
      _source: file // Temp for logging
    };
  });

  // Sort projects alphabetically by title
  projects.sort((a, b) => a.title.localeCompare(b.title));

  // Assign IDs after sorting and remove internal properties
  const finalProjects = projects.map((p, idx) => {
    const { _source, ...rest } = p;
    return {
      id: idx + 1,
      ...rest
    };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(finalProjects, null, 2));
  console.log(`Successfully parsed ${finalProjects.length} projects into ${OUTPUT_FILE}`);
}

parseProjects();
