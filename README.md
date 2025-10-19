# Next.js Project with v0 Template

This is a Next.js project with TypeScript, Tailwind CSS, and shadcn/ui components, designed to integrate with v0 templates. The project includes a comprehensive insurance agency and agent management system with features for commission tracking, vault rules, debt management, and vesting schedules.

## Tech Stack

- **Next.js 15.5** with App Router
- **TypeScript** for type safety
- **Tailwind CSS** for styling
- **shadcn/ui** components with Radix UI primitives
- **React Hook Form** with Zod validation
- **Recharts** for data visualization
- **Lucide React** icons

## Features

The v0 template includes:

### Agency Dashboard
- Agency metrics and performance tracking
- Commission logging and management
- Agent management and vault assignments
- Debt overview and chargeback processing

### Agent Dashboard
- Balance cards showing current financial status
- Book of business overview
- Recent commissions tracking
- Debt alerts and management

### Vault Management
- Vault rules configuration
- Vesting schedule processing
- Automated debt calculations

## Getting Started

1. **Install dependencies:**
```bash
npm install
```

2. **Run the development server:**
```bash
npm run dev
```

3. **Open your browser:**
Navigate to [http://localhost:3000](http://localhost:3000) to see the application.

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── agency/         # Agency-specific pages
│   ├── agent/          # Agent-specific pages
│   └── globals.css     # Global styles
├── components/         # React components  
│   ├── agency/         # Agency dashboard components
│   ├── agent/          # Agent dashboard components
│   └── ui/             # Reusable UI components (shadcn/ui)
├── lib/                # Utility functions and types
└── data/               # Mock data files
```

## Development

- **Build:** `npm run build`
- **Start production:** `npm start`
- **Lint:** `npm run lint`

## Customization

The project uses shadcn/ui components which can be customized via:
- `src/app/globals.css` for global styles
- `tailwind.config.js` for Tailwind configuration
- `components.json` for shadcn/ui configuration

## v0 Template Integration

This project was initialized with a v0 template that provides a complete insurance agency management system. The template includes pre-built components, mock data, and routing structure for both agency and agent dashboards.
