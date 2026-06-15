USA.Healthcare Custom Domain Deployment Guide
This guide describes how to publish the USA.Healthcare website live on your custom domain (usa.healthcare). Because the site is built with vanilla HTML, CSS, and JavaScript, it is highly optimized for free static hosting providers like Vercel or GitHub Pages.

Option 1: Deploying via Vercel (Easiest & Recommended)
Vercel is the easiest hosting platform for static websites. You can deploy either by dragging and dropping your folder or connecting a GitHub repository.

Method A: Drag & Drop (No Git or CLI required)
Navigate to Vercel's Deploy dashboard.
Log in or create a free account (you can sign up with an email or GitHub account).
Zip your usa.healthcare folder or simply drag the folder directly into the upload box on the screen.
Vercel will deploy the website in under 10 seconds and give you a temporary URL (e.g. usa-healthcare.vercel.app).
Method B: Connecting a GitHub Repository
Push your folder contents to a new, private or public GitHub repository.
Go to the Vercel Dashboard and click Add New -> Project.
Select your GitHub repository from the import list.
Click Deploy. Vercel will now automatically redeploy your site every time you push edits to GitHub.
Connecting Your Custom Domain (usa.healthcare) on Vercel
Once your project is deployed on Vercel:

In the Vercel dashboard, click on your project, then go to Settings -> Domains.
Type usa.healthcare (and optionally www.usa.healthcare) into the input box and click Add.
Vercel will analyze your domain and show you the required DNS Records you need to add to your domain registrar (GoDaddy, Namecheap, Google Domains, Cloudflare, etc.).
Option 2: Deploying via GitHub Pages (Free Repository Hosting)
If you prefer to host the site directly from a GitHub repository:

Create a repository on GitHub (e.g., usa-healthcare).
Push your index.html, style.css, script.js, and assets/ folder to the repository.
In the repository, go to Settings -> Pages (on the left side menu).
Under Build and deployment, select Deploy from a branch and set the branch to main (or master), folder to / (root), and click Save.
Scroll down to the Custom domain section, type usa.healthcare, and click Save.
DNS Configuration (Registrar Settings)
Regardless of whether you choose Vercel or GitHub Pages, you must log in to the account where you purchased the domain usa.healthcare and update the DNS Zone Editor settings:

For Vercel Deployment
To point the domain to Vercel, add the following two DNS records:

A Record (for the root domain usa.healthcare):

Name/Host: @ (or leave blank)
Type: A
Value/Points To: 76.76.21.21 (Vercel's global IP)
TTL: Default (e.g., 3600 or 1 hour)
CNAME Record (for www.usa.healthcare):

Name/Host: www
Type: CNAME
Value/Points To: cname.vercel-dns.com
TTL: Default
For GitHub Pages Deployment
To point the domain to GitHub Pages, add the following records:

A Records (for the root domain usa.healthcare): Create four A records pointing to GitHub's server IPs:

@ -> 185.199.108.153
@ -> 185.199.109.153
@ -> 185.199.110.153
@ -> 185.199.111.153
CNAME Record (for www.usa.healthcare):

Name/Host: www
Type: CNAME
Value/Points To: yourusername.github.io (replace with your GitHub username)
🔒 SSL Certificate (HTTPS)
Both Vercel and GitHub Pages will automatically generate a free SSL certificate for your domain once the DNS records propagate (which usually takes between 5 minutes and a few hours). You do not need to purchase or configure SSL manually.
