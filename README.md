# Arcflex Athletics - E-Commerce Platform

A modern e-commerce storefront for Arcflex Athletics built with Next.js App Router, featuring a minimalist black and white design, a backend-agnostic commerce layer, and CDS-backed marketing content.

## 🎯 Overview

Arcflex Athletics is a premium athletic wear storefront designed with a minimalist, modern aesthetic. The application uses a backend-agnostic commerce layer for shopping and a CDS layer for marketing content and media so the site can run against local or AWS/CDN-backed providers.

## 🛠 Tech Stack

- **Framework**: Next.js 16.2.6 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **Font**: Default sans stack
- **E-Commerce**: Backend-agnostic commerce layer (Shopify + test backend)
- **Content**: CDS layer with local and AWS/CDN-backed providers
- **Runtime**: Node.js
- **Deployment**: Vercel (recommended)

## 📋 Project Structure

```
arcflex-athletics/
├── app/
│   ├── components/
│   │   ├── Navbar.tsx          # Main navigation component with scroll behavior
│   │   ├── Hero.tsx            # Full-screen hero section with video background
│   │   ├── PageShell.tsx       # Shared page wrapper for route headers and spacing
│   │   └── PlaceholderProductGrid.tsx # Shared placeholder grid for shop routes
│   ├── shop/
│   │   ├── page.tsx            # Shop main page
│   │   ├── placeholderProducts.ts # Shared placeholder product factory
│   │   ├── men/page.tsx        # Men's collection
│   │   ├── women/page.tsx      # Women's collection
│   │   └── accessories/page.tsx # Accessories collection
│   ├── gallery/page.tsx        # Gallery page
│   ├── about/page.tsx          # About Us page
│   ├── account/page.tsx        # Account/Login page
│   ├── layout.tsx              # Root layout with Inter font
│   ├── page.tsx                # Home page
│   └── globals.css             # Global styles
├── lib/
│   ├── cds/                    # Marketing content/media providers
│   ├── ecommerce/              # Backend-agnostic commerce layer
│   ├── shopify.ts              # Compatibility re-export for commerce helpers
│   └── types.ts                # Shared ecommerce interfaces
├── tsconfig.json               # TypeScript configuration
├── next.config.ts              # Next.js configuration
└── package.json                # Dependencies
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18.17 or later
- npm or yarn package manager
- Shopify store with Storefront API access if you use the Shopify backend

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd arcflex-athletics
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**

   Create `.env.local` and set the backend you want to use. For local development without Shopify, keep the test backend and local CDS:
   ```env
   ECOMMERCE_BACKEND=test
   CDS_PROVIDER=local
   ```

   To use Shopify, switch to:
   ```env
   ECOMMERCE_BACKEND=shopify
   CDS_PROVIDER=aws
   CDS_ASSET_BASE_URL=https://your-cloudfront-domain.cloudfront.net
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_access_token
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```

   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

### Build for Production

```bash
npm run build
npm start
```

## 🛍 Shopify Setup Guide

### Getting Your Storefront API Token

1. **Access Shopify Admin**
   - Go to your Shopify admin dashboard
   - Navigate to **Settings** → **Apps and integrations**

2. **Create a Development App**
   - Click "Develop apps"
   - Click "Create an app"
   - Name it "Arcflex Athletics"
   - Click "Create app"

3. **Generate Storefront API Token**
   - In your app, go to **Configuration**
   - Scroll to "Admin API access scopes"
   - Enable these scopes:
     - `read_products`
     - `read_collections`
     - `read_checkouts`
   - Click "Save"
   - Go to the **API Credentials** tab
   - Under "Storefront API access tokens", click "Install app"
   - Copy your **Access token**

4. **Get Your Store Domain**
   - Your store domain is displayed on the API Credentials page
   - Format: `your-store.myshopify.com`

5. **Add to .env.local**
   ```env
   ECOMMERCE_BACKEND=shopify
   NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN=your-store.myshopify.com
   NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN=your_token_here
   ```

## 🧪 Test Backend

The test backend is in-memory and uses fixture products, collections, and carts. Set `ECOMMERCE_BACKEND=test` to use it without Shopify credentials.

## 📱 Features

### Navbar
- **Responsive design** that adapts to mobile and desktop
- **Hide on scroll down** / **Show on scroll up** behavior
- **Transparent background** that overlays the hero section
- **Navigation menu** with Shop dropdown (Men, Women, Accessories)
- **Region selector** (US, UK, EU, CA, AU)
- **Account link** for user authentication

### Hero Section
- **Full-screen video background** (configurable via CDS content)
- **Fallback gradient** if video is not available
- **Responsive typography** with tagline
- **Call-to-action button**
- **Scroll indicator** animation

### Pages
- **Home**: Featured products and hero section
- **Shop**: Main shop page with product grid
- **Men/Women/Accessories**: Category-specific product listings
- **Gallery**: Image gallery showcase
- **About Us**: Company information and values
- **Account**: User login and account management

### Shared UI
- **Page shell**: Reusable route wrapper for headings, width, and spacing
- **Placeholder product grid**: Shared shop grid for category placeholders
- **Navbar**: Scroll-aware navigation with shared dropdown data

### Commerce Integration
- Fetch products and collections
- Create shopping carts
- Add items to cart
- Full GraphQL API integration
- Error handling and validation

### CDS Integration
- Serve home, about, and gallery content from the CDS layer
- Resolve image/video URLs through a local or AWS/CDN-backed provider

## 📦 API Functions

Commerce helpers are exported from `lib/ecommerce/index.ts` and re-exported by `lib/shopify.ts` for compatibility. CDS helpers live in `lib/cds/index.ts`:

### `getProducts(first: number = 10)`
Fetch all products from the store.

### `getProductByHandle(handle: string)`
Fetch a single product by its handle (slug).

### `getCollections(first: number = 10)`
Fetch all collections from the store.

### `createCheckout()`
Create a new checkout/cart.

### `addToCheckout(checkoutId: string, variantId: string, quantity: number = 1)`
Add an item to an existing checkout.

## 🎨 Design System

### Colors
- **Primary**: Black (#000000)
- **Secondary**: White (#FFFFFF)
- **Accent**: Gray shades for borders and backgrounds

### Typography
- **Font Family**: Default sans stack
- **Headings**: Font weight 700 (bold)
- **Body Text**: Font weight 300-400 (light to regular)
- **Letter Spacing**: Subtle letter-spacing for elegant feel

### Responsive Breakpoints
- Mobile: < 768px
- Tablet: 768px - 1024px
- Desktop: > 1024px

## 🔧 Configuration

### Tailwind CSS
The project uses Tailwind CSS 4 for styling.

### TypeScript
Full TypeScript support with strict type checking. Configuration in `tsconfig.json`.

### Environment Variables
See `.env.example` for all available environment variables:
- `ECOMMERCE_BACKEND` - `shopify` or `test`
- `CDS_PROVIDER` - `local` or `aws`
- `CDS_ASSET_BASE_URL` - CloudFront/CDN base URL when `CDS_PROVIDER=aws`
- `CDS_HERO_VIDEO_URL` - Optional hero video fallback for local CDS
- `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN` - Your Shopify store domain
- `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN` - Storefront API access token

## 📚 Key Dependencies

```json
{
   "next": "16.2.6",
   "react": "19.2.4",
   "react-dom": "19.2.4",
   "typescript": "^5",
   "tailwindcss": "^4",
   "postcss": "^8.4.0"
}
```

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Create Vercel Project**
   - Go to [vercel.com](https://vercel.com)
   - Click "New Project"
   - Import your GitHub repository
   - Click "Deploy"

3. **Set Environment Variables**
   - In Vercel dashboard, go to Settings → Environment Variables
   - Add your Shopify credentials:
     - `NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN`
     - `NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN`
   - Redeploy

### Deploy Elsewhere

The project can be deployed to any Node.js hosting platform:
- AWS
- DigitalOcean
- Render
- Railway
- Azure App Service

Build command: `npm run build`
Start command: `npm start`

## 🧪 Testing

Run the development server and test locally:
```bash
npm run dev
```

Build for production and test:
```bash
npm run build
npm start
```

## 📖 Shopify API Documentation

For more information about the Shopify Storefront API:
- [Shopify Storefront API Reference](https://shopify.dev/api/storefront)
- [GraphQL Documentation](https://shopify.dev/api/storefront/2024-01)

## 🛠 Troubleshooting

### "Missing Shopify environment variables"
- Ensure you've created `.env.local` with your Shopify credentials
- Check that the values are correctly copied from your Shopify admin
- Restart the development server after updating environment variables

### Products not loading
- Verify your Storefront API access token is valid
- Check that required scopes are enabled in your Shopify app
- Ensure your products are published to the Online Store sales channel

### Build errors
- Clear `.next` folder: `rm -rf .next`
- Reinstall dependencies: `rm -rf node_modules && npm install`
- Check Node.js version: `node --version` (should be 18.17+)

## 📝 Git Workflow

```bash
# Create a feature branch
git checkout -b feature/your-feature-name

# Make changes and commit
git add .
git commit -m "Describe your changes"

# Push to origin
git push origin feature/your-feature-name

# Create pull request on GitHub
```

## 📄 License

This project is proprietary to Arcflex Athletics. All rights reserved.

## 📧 Support

For issues or questions, please contact the development team.

---

**Made with ❤️ for Arcflex Athletics**
