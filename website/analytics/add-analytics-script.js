// add-analytics.js
// Script to automatically add analytics code to all HTML files

const fs = require('fs').promises;
const path = require('path');

// CONFIGURATION - Update these values
const CONFIG = {
  // Choose your analytics provider: 'google', 'plausible', or 'both'
  provider: 'google',
  
  // Your Google Analytics Measurement ID
  googleAnalyticsId: 'G-1VBGDKVFP4',
  
  // Your domain for Plausible
  plausibleDomain: 'heatherwhitakercoaching.com',
  
  // Directory containing your HTML files
  htmlDirectory: './',
  
  // Backup original files?
  createBackup: true
};

// Analytics code templates
const analyticsCode = {
  google: `
<!-- Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=${CONFIG.googleAnalyticsId}"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);} 
  gtag('js', new Date());
  gtag('config', '${CONFIG.googleAnalyticsId}');
  
  // Track booking button clicks
  document.addEventListener('DOMContentLoaded', function() {
    const bookingLinks = document.querySelectorAll('a[href*="HeatherWhitakerCoaching.as.me"]');
    bookingLinks.forEach(link => {
      link.addEventListener('click', function() {
        gtag('event', 'book_session', {
          'event_category': 'engagement',
          'event_label': 'Booking Link Click'
        });
      });
    });
  });
</script>`,

  plausible: `
<!-- Plausible Analytics -->
<script defer data-domain="${CONFIG.plausibleDomain}" src="https://plausible.io/js/script.js"></script>
<script>
  window.plausible = window.plausible || function() { (window.plausible.q = window.plausible.q || []).push(arguments) }
  document.addEventListener('DOMContentLoaded', function() {
    const bookingLinks = document.querySelectorAll('a[href*="HeatherWhitakerCoaching.as.me"]');
    bookingLinks.forEach(link => {
      link.addEventListener('click', () => plausible('Book Session Click'));
    });
  });
</script>`
};

async function findHtmlFiles(dir) {
  const files = [];
  const items = await fs.readdir(dir, { withFileTypes: true });
  
  for (const item of items) {
    const fullPath = path.join(dir, item.name);
    
    if (item.isDirectory() && !item.name.startsWith('.') && item.name !== 'node_modules') {
      files.push(...await findHtmlFiles(fullPath));
    } else if (item.isFile() && item.name.endsWith('.html')) {
      files.push(fullPath);
    }
  }
  
  return files;
}

async function addAnalyticsToFile(filePath) {
  try {
    let content = await fs.readFile(filePath, 'utf8');
    
    // Check if analytics already exists
    if (content.includes('gtag(') || content.includes('plausible.io')) {
      console.log(`⚠️  Skipping ${filePath} - Analytics already present`);
      return false;
    }
    
    // Create backup if requested
    if (CONFIG.createBackup) {
      await fs.writeFile(`${filePath}.backup`, content);
    }
    
    // Determine which analytics code to insert
    let codeToInsert = '';
    if (CONFIG.provider === 'google' || CONFIG.provider === 'both') {
      codeToInsert += analyticsCode.google;
    }
    if (CONFIG.provider === 'plausible' || CONFIG.provider === 'both') {
      codeToInsert += analyticsCode.plausible;
    }
    
    // Insert analytics code before closing </head> tag
    const headCloseIndex = content.toLowerCase().indexOf('</head>');
    if (headCloseIndex === -1) {
      console.log(`⚠️  Skipping ${filePath} - No </head> tag found`);
      return false;
    }
    
    content = content.slice(0, headCloseIndex) + codeToInsert + '\n' + content.slice(headCloseIndex);
    
    await fs.writeFile(filePath, content);
    console.log(`✅ Added analytics to ${filePath}`);
    return true;
    
  } catch (error) {
    console.error(`❌ Error processing ${filePath}:`, error.message);
    return false;
  }
}

async function main() {
  console.log('🔍 Finding HTML files...\n');
  
  const htmlFiles = await findHtmlFiles(CONFIG.htmlDirectory);
  console.log(`Found ${htmlFiles.length} HTML files\n`);
  
  let successCount = 0;
  
  for (const file of htmlFiles) {
    const success = await addAnalyticsToFile(file);
    if (success) successCount++;
  }
  
  console.log(`\n✨ Done! Updated ${successCount} files.`);
  
  if (CONFIG.createBackup) {
    console.log('\n💾 Backup files created with .backup extension');
    console.log('To restore: rename .backup files back to .html');
  }
  
  console.log('\n📊 Next steps:');
  if (CONFIG.provider === 'google' || CONFIG.provider === 'both') {
    console.log('1. Replace G-XXXXXXXXXX with your actual Google Analytics ID');
  }
  if (CONFIG.provider === 'plausible' || CONFIG.provider === 'both') {
    console.log('1. Sign up at plausible.io and add your domain');
  }
  console.log('2. Commit and push your changes');
  console.log('3. Verify analytics is working in your dashboard');
}

// Run the script
main().catch(console.error);
