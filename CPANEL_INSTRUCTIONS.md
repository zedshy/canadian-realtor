# 🚀 cPanel Deployment Instructions

This guide explains how to deploy the Canadian Realtor website to cPanel for client preview.

---

## ⚠️ Important Note

This Next.js application requires **Node.js** to run properly. cPanel has two deployment options:

1. **Node.js App (Recommended)** - Full functionality including forms
2. **Static HTML + PHP Forms** - For hosting that doesn't support Node.js

---

## Option 1: Deploy as Node.js Application (Recommended)

### Prerequisites
- cPanel with Node.js support (version 18.x or higher)
- SSH access (optional but recommended)

### Step 1: Upload Files via cPanel File Manager

1. **Login to cPanel**
2. **Go to File Manager**
3. **Navigate to** `public_html` (or your domain's directory)
4. **Upload** the entire project folder or zip file
5. **Extract** if you uploaded a zip

### Step 2: Setup Node.js Application

1. **In cPanel, find "Setup Node.js App"** (or "Node.js Selector")

2. **Click "Create Application"**
   - **Node.js version**: 18.x or higher
   - **Application mode**: Production
   - **Application root**: Path to your uploaded folder (e.g., `/home/username/public_html/canadian-realtor`)
   - **Application URL**: Your domain or subdomain
   - **Application startup file**: `server.js` (we'll create this)

3. **Create `server.js` in your project root:**

```javascript
const { createServer } = require('http');
const { parse } = require('url');
const next = require('next');

const dev = false;
const hostname = 'localhost';
const port = process.env.PORT || 3000;

const app = next({ dev, hostname, port });
const handle = app.getRequestHandler();

app.prepare().then(() => {
  createServer(async (req, res) => {
    try {
      const parsedUrl = parse(req.url, true);
      await handle(req, res, parsedUrl);
    } catch (err) {
      console.error('Error occurred handling', req.url, err);
      res.statusCode = 500;
      res.end('internal server error');
    }
  }).listen(port, (err) => {
    if (err) throw err;
    console.log(`> Ready on http://${hostname}:${port}`);
  });
});
```

4. **Install Dependencies via SSH** (if you have SSH access):

```bash
cd /home/username/public_html/canadian-realtor
npm install
npm run build
```

**Or via cPanel Terminal:**
- Use the "Terminal" feature in cPanel
- Run the same commands

5. **Start the Application**
   - In Node.js App interface, click "Restart"
   - Your site should now be live!

6. **Set Environment Variables** (if needed):
   - In Node.js App settings, add any environment variables
   - Example: `NODE_ENV=production`

---

## Option 2: Static HTML + PHP Forms (No Node.js Required)

This option creates a simplified version that works on any cPanel hosting.

### Step 1: Create Static Export

On your local machine:

```bash
# In project directory
npm run build

# The 'out' directory contains your static site
```

### Step 2: Upload to cPanel

1. **Login to cPanel File Manager**
2. **Navigate to** `public_html`
3. **Upload these files:**
   - All files from the `out` directory
   - The `api` folder (contains PHP scripts)
   - `.htaccess` file

### Step 3: Configure PHP Forms

1. **Edit `api/lead.php`** and **`api/valuation.php`**
2. **Uncomment the email notification section**
3. **Update email address:**

```php
$to = 'your-email@yourdomain.com';  // Change this
```

4. **Save the files**

### Step 4: Update Form Endpoints (if needed)

The forms are configured to use `/api/` endpoints which will work with the PHP files.

### Step 5: Test

1. Visit your domain
2. Test all forms
3. Check that emails are received

---

## 📧 Email Configuration

### For PHP Mail

Edit `api/lead.php` and `api/valuation.php`:

```php
// Uncomment and configure:
$to = 'youremail@domain.com';
$headers = 'From: noreply@yourdomain.com' . "\r\n" .
           'Reply-To: ' . $data['email'] . "\r\n";
mail($to, $subject, $message, $headers);
```

### For SMTP (More Reliable)

Install PHPMailer via cPanel or manually:

```php
<?php
use PHPMailer\PHPMailer\PHPMailer;

require 'vendor/autoload.php';

$mail = new PHPMailer(true);
$mail->isSMTP();
$mail->Host = 'smtp.yourdomain.com';
$mail->SMTPAuth = true;
$mail->Username = 'your-email@yourdomain.com';
$mail->Password = 'your-password';
$mail->SMTPSecure = PHPMailer::ENCRYPTION_STARTTLS;
$mail->Port = 587;

$mail->setFrom('noreply@yourdomain.com', 'Canadian Realtor');
$mail->addAddress($to);
$mail->Subject = $subject;
$mail->Body = $message;

$mail->send();
?>
```

---

## 🔒 SSL Certificate

1. **In cPanel, go to "SSL/TLS Status"**
2. **Select your domain**
3. **Click "Run AutoSSL"** or install Let's Encrypt
4. **Wait for SSL to be installed**
5. **Update `.htaccess` to force HTTPS:**

```apache
# Uncomment these lines in .htaccess:
RewriteCond %{HTTPS} off
RewriteRule ^(.*)$ https://%{HTTP_HOST}%{REQUEST_URI} [L,R=301]
```

---

## 🎯 Quick Checklist

- [ ] Files uploaded to cPanel
- [ ] Node.js app configured (Option 1) OR static files deployed (Option 2)
- [ ] PHP form handlers configured with your email
- [ ] SSL certificate installed
- [ ] .htaccess configured
- [ ] Forms tested and working
- [ ] Images loading correctly
- [ ] All pages accessible

---

## 🆘 Troubleshooting

### Issue: "Application Error"
- Check Node.js version (should be 18.x+)
- Verify `server.js` is in the root directory
- Check application logs in cPanel

### Issue: Forms Not Working
- Verify PHP version (7.4+ recommended)
- Check `api/` folder is uploaded
- Test PHP files directly: `yourdomain.com/api/lead.php`
- Check file permissions (should be 644)

### Issue: Images Not Loading
- For Option 1: Images should work automatically
- For Option 2: Ensure all image paths are correct
- Check browser console for errors

### Issue: 404 Errors
- Verify `.htaccess` is uploaded
- Check that mod_rewrite is enabled in cPanel

### Issue: Slow Performance
- Enable caching in `.htaccess`
- Use Cloudflare for CDN
- Optimize images

---

## 📱 Testing After Deployment

1. **Homepage**: Check WebGL scene loads
2. **Properties Page**: Test filters
3. **Property Details**: Click on a property
4. **Forms**: Submit a test enquiry
5. **Mobile**: Test responsive design
6. **Email**: Verify you receive form submissions

---

## 🔄 Updates After Deployment

### For Node.js Deployment:

```bash
# SSH into server
cd /home/username/public_html/canadian-realtor

# Pull latest changes (if using Git)
git pull

# Or upload new files via File Manager

# Rebuild
npm install
npm run build

# Restart app in cPanel Node.js interface
```

### For Static Deployment:

1. Rebuild locally: `npm run build`
2. Upload new files from `out` directory
3. Clear browser cache

---

## 💡 Performance Tips

1. **Enable Gzip Compression** (already in `.htaccess`)
2. **Set Browser Caching** (already in `.htaccess`)
3. **Use Cloudflare** for free CDN
4. **Optimize images** before uploading
5. **Enable OPcache** in cPanel PHP settings

---

## 🎉 You're Live!

After following these steps, your Canadian Realtor website should be live and accessible to your client.

**Test URL**: `https://yourdomain.com`

For additional help, refer to:
- [Main README](./README.md)
- [Setup Guide](./SETUP.md)
- [Deployment Guide](./DEPLOYMENT.md)

---

**Need Help?** Contact your hosting provider's support if you encounter cPanel-specific issues.

