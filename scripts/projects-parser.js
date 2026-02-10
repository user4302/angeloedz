const fs = require('fs');
const path = require('path');
const matter = require('gray-matter');

const PROJECTS_DIR = path.join(__dirname, '../src/assets/projects');
const OUTPUT_FILE = path.join(__dirname, '../src/data/projects.json');
const DATA_DIR = path.join(__dirname, '../src/data');

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

  const projects = files.map((file, index) => {
    const filePath = path.join(PROJECTS_DIR, file);
    const fileContent = fs.readFileSync(filePath, 'utf8');
    const { data, content } = matter(fileContent);

    // Default metadata
    const slug = file.replace('.md', '');
    let title = data.title || slug.split(' - ').pop();
    let category = data.category;
    let description = data.description || '';

    // Guess category from filename if missing
    if (!category) {
      const prefix = slug.split(' - ')[0];
      category = categoryMap[prefix] || 'Frontend';
    }

    // Extract from text if frontmatter is thin
    if (!data.title || !data.description) {
      const titleMatch = content.match(/\*\*Project Title:\*\*\s*(.*)/i);
      if (titleMatch && !data.title) title = titleMatch[1].trim();

      const descMatch = content.match(/\*\*Short Description:\*\*\s*([\s\S]*?)(?=\n\n|\*\*)/i);
      if (descMatch && !data.description) description = descMatch[1].trim();
    }

    return {
      id: index + 1,
      slug,
      title,
      category,
      description,
      ...data,
      content,
    };
  });

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(projects, null, 2));
  console.log(`Successfully parsed ${projects.length} projects into ${OUTPUT_FILE}`);
}

parseProjects();
