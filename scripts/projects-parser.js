const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROJECTS_DIR = path.join(__dirname, '../src/assets/projects');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.json');
const DATA_DIR = path.join(__dirname, '../src/data');

/**
 * Mapping of technology names found in Markdown to Iconify icon keys.
 * Using a mix of logos and skill-icons for a diverse, high-quality look.
 */
const techMap = {
  'python': 'logos:python',
  'vue.js': 'logos:vue',
  'vue': 'logos:vue',
  'react.js': 'logos:react',
  'react': 'logos:react',
  'next.js': 'logos:nextjs-icon',
  'nextjs': 'logos:nextjs-icon',
  'node.js': 'logos:nodejs-icon',
  'nodejs': 'logos:nodejs-icon',
  'express.js': 'skill-icons:expressjs-dark',
  'expressjs': 'skill-icons:expressjs-dark',
  'tailwindcss': 'logos:tailwindcss-icon',
  'tailwind css': 'logos:tailwindcss-icon',
  'typescript': 'logos:typescript-icon',
  'javascript': 'logos:javascript',
  'powershell': 'logos:powershell',
  'bash': 'logos:bash-icon',
  'shell': 'logos:bash-icon',
  'mongodb': 'logos:mongodb-icon',
  'postgresql': 'logos:postgresql',
  'sqlite': 'logos:sqlite',
  'mysql': 'logos:mysql-icon',
  'git': 'logos:git-icon',
  'github': 'logos:github-icon',
  'gitlab': 'logos:gitlab',
  'material-ui': 'logos:material-ui',
  'mui': 'logos:material-ui',
  'vuetify': 'logos:vuetifyjs',
  'bootstrap': 'logos:bootstrap',
  'sass': 'logos:sass',
  'css': 'logos:css-3',
  'html': 'logos:html-5',
  'docker': 'logos:docker-icon',
  'netlify': 'logos:netlify-icon',
  'vercel': 'logos:vercel-icon',
  'sentry': 'logos:sentry-icon',
  'grafana': 'logos:grafana',
  'prometheus': 'logos:prometheus',
  'ansible': 'logos:ansible',
  'terraform': 'logos:terraform-icon',
  'aws': 'logos:aws',
  'google cloud': 'logos:google-cloud',
  'azure': 'logos:azure-icon',
  'firebase': 'logos:firebase',
  'jest': 'logos:jest',
  'vitest': 'logos:vitest',
  'cypress': 'logos:cypress-icon',
  'playwright': 'logos:playwright',
  'vite': 'logos:vitejs',
  'webpack': 'logos:webpack',
  'babel': 'logos:babel',
  'eslint': 'logos:eslint',
  'prettier': 'logos:prettier',
  'hugging face': 'logos:hugging-face-icon',
  'openai': 'logos:openai-icon',
  'mistral': 'logos:mistral-icon',
  'flask': 'logos:flask',
  'django': 'logos:django-icon',
  'fastapi': 'logos:fastapi-icon',
  'auth0': 'logos:auth0-icon',
  'clerk': 'logos:clerk-icon',
  'supabase': 'logos:supabase-icon',
  'prisma': 'logos:prisma',
  'drizzle': 'logos:drizzle-icon',
  'zustand': 'skill-icons:zustand-dark',
  'redux': 'logos:redux',
  'tanstack query': 'logos:react-query-icon',
  'react query': 'logos:react-query-icon',
  'formik': 'logos:formik',
  'yup': 'logos:yup',
  'app router': 'logos:nextjs-icon',
  'google analytics': 'logos:google-analytics',
  'hotjar': 'logos:hotjar',
  'twilio': 'logos:twilio-icon',
  'sendgrid': 'logos:sendgrid-icon',
  'mailchimp': 'logos:mailchimp-freddie',
  'stripe': 'logos:stripe',
  'paypal': 'logos:paypal',
  'wisdom': 'logos:wise',
  'wise': 'logos:wise',
  'xero': 'logos:xero',
  'salesforce': 'logos:salesforce',
  'hubspot': 'logos:hubspot',
  'notion': 'logos:notion-icon',
  'slack': 'logos:slack-icon',
  'discord': 'logos:discord-icon',
  'figma': 'logos:figma',
  'adobe xd': 'logos:adobe-xd',
  'photoshop': 'logos:adobe-photoshop',
  'illustrator': 'logos:adobe-illustrator',
  'unity': 'logos:unity',
  'unreal engine': 'logos:unrealengine-icon',
  'arduino': 'logos:arduino',
  'raspberry pi': 'logos:raspberry-pi',
  'autohotkey': 'logos:autohotkey',
  'winreg': 'logos:windows',
  'c#': 'logos:c-sharp',
  'c++': 'logos:c-plusplus',
  'c': 'logos:c',
  'java': 'logos:java',
  'go': 'logos:go',
  'rust': 'logos:rust',
  'php': 'logos:php',
  'laravel': 'logos:laravel',
  'symfony': 'logos:symfony',
  'wordpress': 'logos:wordpress-icon',
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

    // 1. Direct Iconify Tags from Frontmatter
    // This allows the user to "refer the official site" and just paste tags like "logos:react"
    if (data.tags && Array.isArray(data.tags)) {
      data.tags.forEach(tag => {
        const trimmedTag = tag.trim();
        // If it contains a colon, we assume it's a direct Iconify ID (e.g. logos:vue)
        if (trimmedTag.includes(':')) {
          if (!icons.includes(trimmedTag)) {
            icons.push(trimmedTag);
          }
        } else {
          // Otherwise, try to map the friendly name (e.g. "vue" -> "logos:vue")
          const lowerTag = trimmedTag.toLowerCase();
          if (techMap[lowerTag] && !icons.includes(techMap[lowerTag])) {
            icons.push(techMap[lowerTag]);
          }
        }
      });
    }

    // 2. Automated Discovery from Markdown Content
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
