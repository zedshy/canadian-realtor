# 🚀 Quick Setup Guide

This document provides step-by-step instructions to get your Canadian Realtor website up and running.

## ✅ Prerequisites

Make sure you have the following installed:
- **Node.js** version 18.x or higher ([Download](https://nodejs.org/))
- **npm** (comes with Node.js)

## 📦 Installation (Project Already Created)

Since the project is already set up, you only need to install dependencies and run it:

```bash
# Navigate to the project directory
cd canadian-realtor

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open your browser and visit: **http://localhost:3000**

## 🎨 Customization Guide

### 1. Update Branding

**Change the site name and logo:**
- Edit `components/Header.tsx` - Update the brand name
- Edit `components/Footer.tsx` - Update footer information
- Edit `app/layout.tsx` - Update metadata (title, description)

### 2. Change City/Location

**Update the hero text:**
- Edit `app/page.tsx` - Line ~73: Change "Toronto" to your city
- Edit other references throughout the site as needed

### 3. Update Contact Information

**Email, phone, address:**
- Edit `components/Footer.tsx` - Update contact details
- Edit `app/contact/page.tsx` - Update contact information

### 4. Modify Properties

**Add/edit property listings:**
- Edit `lib/properties.ts`
- Add new property objects to the `properties` array
- Follow the existing TypeScript interface structure

**Property images:**
- Replace Unsplash URLs with your own property images
- Upload images to `/public/images/` folder
- Update the `images` array in each property

### 5. Customize Colors

**Update the color scheme:**
- Edit `app/globals.css`
- Modify CSS variables in the `:root` section
- Change `--primary`, `--secondary`, etc.

## 🔧 Key Files to Edit

| File | Purpose |
|------|---------|
| `lib/properties.ts` | Property data and listings |
| `app/page.tsx` | Home page content |
| `components/Header.tsx` | Navigation and branding |
| `components/Footer.tsx` | Footer content and links |
| `app/contact/page.tsx` | Contact information |
| `app/layout.tsx` | Site metadata (SEO) |

## 🤖 AI Integration Setup

The website is ready for AI/CRM integration. To connect:

### 1. Create Environment Variables

Create a `.env.local` file in the project root:

```env
# CRM Integration
HUBSPOT_API_KEY=your_hubspot_key
SALESFORCE_API_KEY=your_salesforce_key

# AI Services
OPENAI_API_KEY=your_openai_key

# Email Services
SENDGRID_API_KEY=your_sendgrid_key

# SMS Services
TWILIO_ACCOUNT_SID=your_twilio_sid
TWILIO_AUTH_TOKEN=your_twilio_token
```

### 2. Uncomment Integration Code

**For CRM integration:**
- Edit `app/api/lead/route.ts`
- Uncomment the HubSpot/CRM code sections
- Add your API credentials

**For AI auto-responses:**
- Edit `app/api/lead/route.ts` and `app/api/valuation/route.ts`
- Uncomment OpenAI integration code
- Customize the AI prompts

## 📱 Testing

### Development
```bash
npm run dev
```

### Production Build
```bash
npm run build
npm start
```

### Type Checking
```bash
npx tsc --noEmit
```

### Linting
```bash
npm run lint
```

## 🌐 Pages Overview

| Page | Route | Purpose |
|------|-------|---------|
| Home | `/` | Hero, features, listings, testimonials |
| Properties | `/properties` | Filterable property listings |
| Property Detail | `/property/[id]` | Single property with forms |
| Valuations | `/valuations` | Free home valuation request |
| Contact | `/contact` | General contact form |

## 📊 Lead Tracking

All form submissions are sent to:
- `/api/lead` - Property enquiries, viewing requests, contact
- `/api/valuation` - Home valuation requests

**Current behavior:**
- Logs to console
- Returns success response
- Shows toast notification to user

**Production setup:**
- Add database integration (PostgreSQL, MongoDB, etc.)
- Connect to your CRM
- Set up email notifications
- Configure analytics

## 🎯 Next Steps

1. **Update Content**
   - Replace placeholder property data with real listings
   - Update contact information
   - Customize copy for your market

2. **Add Real Images**
   - Replace Unsplash images with actual property photos
   - Optimize images for web (use WebP format)

3. **Set Up Domain**
   - Deploy to Vercel, Netlify, or your hosting provider
   - Configure custom domain
   - Set up SSL certificate

4. **Connect Integrations**
   - Add CRM integration
   - Set up email automation
   - Configure analytics (Google Analytics, etc.)

5. **SEO Optimization**
   - Update meta tags in `app/layout.tsx`
   - Add sitemap and robots.txt
   - Set up Google Search Console

## 🆘 Troubleshooting

### Build Errors
```bash
# Clear Next.js cache
rm -rf .next
npm run build
```

### Dependency Issues
```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### Port Already in Use
```bash
# Run on a different port
PORT=3001 npm run dev
```

## 📚 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [Tailwind CSS](https://tailwindcss.com/docs)
- [Shadcn UI](https://ui.shadcn.com/)
- [Framer Motion](https://www.framer.com/motion/)
- [Three.js](https://threejs.org/docs/)

## 💡 Tips

- Use Canadian spelling throughout (neighbourhood, centre, colour)
- Format prices as CAD with proper thousand separators
- Include MLS® IDs for all properties
- Show property taxes and condo fees where applicable
- Optimize images before uploading
- Test forms thoroughly before going live
- Set up proper error tracking (Sentry, etc.)

---

**Need Help?** Check the main README.md for more detailed information.

