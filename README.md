# Canadian Realtor Website

A modern, AI-ready real estate website built with Next.js, TypeScript, Tailwind CSS, and Three.js. Designed for Canadian realtors to showcase properties, capture qualified leads, and provide automated follow-ups.

## 🚀 Features

- **WebGL 3D Hero**: Interactive city visualization using Three.js
- **Property Listings**: Filterable property grid with detailed pages
- **Lead Capture Forms**: Viewing requests, questions, and contact forms
- **Free Home Valuations**: Comprehensive valuation request system
- **AI-Ready Architecture**: Structured for CRM integration and automation
- **Canadian-Specific**: MLS IDs, property taxes, condo fees, neighbourhood data
- **Responsive Design**: Mobile-first, optimized for all devices
- **Premium UI**: Modern design with Shadcn UI and Framer Motion animations

## 📋 Prerequisites

- Node.js 18.x or higher
- npm or yarn package manager

## 🛠️ Setup Instructions

### 1. Create Next.js Application

```bash
npx create-next-app@latest canadian-realtor --typescript --tailwind --app --no-src-dir --import-alias "@/*" --eslint
cd canadian-realtor
```

### 2. Install Dependencies

```bash
npm install framer-motion three @react-three/fiber @react-three/drei
```

### 3. Install Shadcn UI

```bash
npx shadcn@latest init -d
npx shadcn@latest add button card input label select textarea sonner
```

### 4. Run Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
canadian-realtor/
├── app/
│   ├── page.tsx                 # Home page with WebGL hero
│   ├── properties/page.tsx      # Property listings with filters
│   ├── property/[id]/page.tsx   # Individual property detail page
│   ├── valuations/page.tsx      # Free valuation request form
│   ├── contact/page.tsx         # Contact page
│   ├── api/
│   │   ├── lead/route.ts        # Lead capture API endpoint
│   │   └── valuation/route.ts  # Valuation request API endpoint
│   ├── layout.tsx               # Root layout with header/footer
│   ├── globals.css              # Global styles
│   └── not-found.tsx            # 404 page
├── components/
│   ├── Header.tsx               # Navigation header
│   ├── Footer.tsx               # Site footer
│   ├── HeroScene.tsx            # WebGL Three.js scene
│   └── ui/                      # Shadcn UI components
├── lib/
│   ├── properties.ts            # Property data and types
│   ├── types.ts                 # TypeScript types for leads
│   └── utils.ts                 # Utility functions
└── README.md
```

## 🏗️ Build for Production

```bash
npm run build
npm start
```

## 🎨 Customization

### Update City/Region

Edit the hero section in `app/page.tsx`:

```typescript
<h1>A smarter way to buy and sell homes in [Your City], Canada.</h1>
```

### Modify Property Data

Edit `lib/properties.ts` to add/remove/update property listings.

### Update Contact Information

Edit contact details in:
- `components/Footer.tsx`
- `app/contact/page.tsx`

### Branding

Update the logo and brand name in:
- `components/Header.tsx`
- `components/Footer.tsx`
- `app/layout.tsx` (metadata)

## 🤖 AI-Ready Features

The website is structured for easy integration with AI and automation tools:

### API Routes

Both `/api/lead` and `/api/valuation` endpoints include detailed TODO comments for:

- **CRM Integration**: HubSpot, Pipedrive, Salesforce
- **AI Assistants**: OpenAI GPT for personalized responses
- **Email Automation**: SendGrid, Mailchimp
- **SMS Notifications**: Twilio
- **Analytics**: Track conversions and lead quality

### Example CRM Integration

```typescript
// In app/api/lead/route.ts
await fetch('https://api.hubspot.com/crm/v3/objects/contacts', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${process.env.HUBSPOT_API_KEY}`,
  },
  body: JSON.stringify({
    properties: {
      email: body.email,
      firstname: body.name.split(' ')[0],
      lead_source: body.source,
    },
  }),
});
```

### Environment Variables

Create a `.env.local` file for API keys:

```env
HUBSPOT_API_KEY=your_key_here
OPENAI_API_KEY=your_key_here
SENDGRID_API_KEY=your_key_here
```

## 🎯 Lead Sources

The system tracks different lead sources:

- `property-viewing`: Book a viewing requests
- `property-question`: Questions about specific properties
- `valuation`: Home valuation requests
- `contact`: General enquiries

## 📱 Responsive Design

- **Mobile**: Stacked layout, touch-optimized
- **Tablet**: Grid layouts with 2 columns
- **Desktop**: Full grid with 3-4 columns, side-by-side hero

## 🔧 Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn UI
- **Animations**: Framer Motion
- **3D Graphics**: Three.js, React Three Fiber
- **Toast Notifications**: Sonner

## 📈 Performance

- Dynamic imports for WebGL (client-only rendering)
- Optimized images with Next.js Image component
- Lazy loading for off-screen content
- Suspense boundaries for async components

## 🌐 Canadian Real Estate Features

- ✅ MLS® ID display
- ✅ CAD currency formatting
- ✅ Neighbourhood information
- ✅ Annual property taxes
- ✅ Condo/strata fees
- ✅ Canadian spelling (neighbourhood, centre)
- ✅ Provincial dropdowns

## 📄 License

This project is for demonstration and development purposes.

## 🤝 Support

For questions or issues, please contact through the website's contact form or email info@canadianrealtor.ca.

---

**Built with ❤️ for Canadian Realtors**
