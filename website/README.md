# Self-Inventory Lab Website

Transform clarity into embodied action with the Insight Mapping System.

## 🚀 Quick Deploy to Vercel

### Prerequisites
- Node.js installed (for npm)
- Vercel account (free at vercel.com)

### Deployment Steps

1. **Install Vercel CLI** (one-time setup):
```bash
npm install -g vercel
```

2. **Navigate to website directory**:
```bash
cd /Users/gerardmartelly/Consulting/clients/self-inventory-lab/website
```

3. **Deploy to Vercel**:
```bash
vercel
```

4. **Follow the prompts**:
   - Login to Vercel (if first time)
   - Set up and deploy: `Y`
   - Project scope: Select your account
   - Link to existing project: `N` (first time)
   - Project name: `self-inventory-lab` (or your choice)
   - Directory: `./` (current directory)
   - Override settings: `N`

5. **Deploy to production**:
```bash
vercel --prod
```

Your site will be live at: `https://[project-name].vercel.app`

## 🌐 Custom Domain Setup

After deployment, you can add a custom domain:

1. Go to your Vercel dashboard
2. Select your project
3. Go to Settings → Domains
4. Add your domain (e.g., self-inventory-lab.com)
5. Update DNS settings with your domain provider

## 📁 Project Structure

```
website/
├── index.html          # Homepage
├── about.html          # About Heather page
├── methodology.html    # Methodology page
├── services.html       # Services page
├── css/
│   └── styles.css      # Main stylesheet
├── js/
│   └── main.js         # JavaScript functionality
├── vercel.json         # Vercel configuration
├── package.json        # Project metadata
└── .gitignore          # Git ignore file
```

## 🔧 Configuration Features

The `vercel.json` file includes:
- **Clean URLs**: Access pages without .html extension
- **Security headers**: XSS protection, clickjacking prevention
- **Cache optimization**: Static assets cached for performance
- **SEO-friendly routing**: Proper URL structure

## 📝 Making Updates

1. Edit HTML/CSS/JS files locally
2. Test changes by opening HTML files in browser
3. Deploy updates: `vercel --prod`
4. Changes go live immediately

## 🛠️ Useful Commands

```bash
# Deploy to preview URL
vercel

# Deploy to production
vercel --prod

# List all deployments
vercel ls

# Remove a deployment
vercel rm [deployment-url]

# View logs
vercel logs [deployment-url]
```

## 💡 Tips

- Preview deployments are created for every `vercel` command
- Production deployment updates your main URL
- Vercel automatically handles SSL certificates
- Global CDN ensures fast loading worldwide
- Analytics available in Vercel dashboard

## 📊 Analytics

- Vercel Web Analytics and Speed Insights are already included on all pages via `<script defer src="/_vercel/insights/script.js"></script>` in the `<head>`. View both in the Vercel dashboard.
- Additional snippets are provided under `analytics/`:
  - `analytics/analytics-setup-script.html`: GA4/Plausible examples to paste into the `<head>` if desired (replace placeholders).
  - `analytics/add-analytics-script.js`: Optional Node script to inject GA4/Plausible into all `.html` files. Configure IDs before running.

## 📧 Support

For website updates or technical support, contact your web developer.

---

© 2024 Self-Inventory Lab | Created by Heather Whitaker
