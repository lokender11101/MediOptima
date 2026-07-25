import fs from 'fs';
import path from 'path';

const mappings = [
  // Backgrounds
  { regex: /\bbg-white\b(?!\s+dark:bg-)/g, replacement: 'bg-white dark:bg-slate-900' },
  { regex: /\bbg-slate-50\b(?!\s+dark:bg-)/g, replacement: 'bg-slate-50 dark:bg-slate-950' },
  { regex: /\bbg-white\/80\b(?!\s+dark:bg-)/g, replacement: 'bg-white/80 dark:bg-slate-900/80' },
  { regex: /\bbg-white\/90\b(?!\s+dark:bg-)/g, replacement: 'bg-white/90 dark:bg-slate-900/90' },
  
  // Text Colors
  { regex: /\btext-slate-900\b(?!\s+dark:text-)/g, replacement: 'text-slate-900 dark:text-slate-50' },
  { regex: /\btext-slate-700\b(?!\s+dark:text-)/g, replacement: 'text-slate-700 dark:text-slate-200' },
  { regex: /\btext-slate-600\b(?!\s+dark:text-)/g, replacement: 'text-slate-600 dark:text-slate-300' },
  { regex: /\btext-slate-500\b(?!\s+dark:text-)/g, replacement: 'text-slate-500 dark:text-slate-400' },
  { regex: /\btext-slate-950\b(?!\s+dark:text-)/g, replacement: 'text-slate-950 dark:text-slate-50' },
  
  // Borders
  { regex: /\bborder-slate-200\b(?!\s+dark:border-)/g, replacement: 'border-slate-200 dark:border-slate-800' },
  { regex: /\bborder-slate-300\b(?!\s+dark:border-)/g, replacement: 'border-slate-300 dark:border-slate-700' },
  { regex: /\bborder-slate-100\b(?!\s+dark:border-)/g, replacement: 'border-slate-100 dark:border-slate-800' },
];

function processDirectory(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      processDirectory(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let originalContent = content;
      
      for (const map of mappings) {
        content = content.replace(map.regex, map.replacement);
      }
      
      if (content !== originalContent) {
        fs.writeFileSync(fullPath, content);
        console.log(`Updated: ${fullPath}`);
      }
    }
  }
}

processDirectory(path.join(process.cwd(), 'src'));
console.log('Done mapping dark mode classes.');
