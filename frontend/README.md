# Pixell River Employee Directory — Lab 1.2

A React + TypeScript remake of the Lab 1.1 static HTML/CSS/JS employee directory,
built with [Vite](https://vitejs.dev/).

## Getting Started

### 1. Install dependencies
```bash
npm install
```

### 2. Run the dev server
```bash
npm run dev
```
Open [http://localhost:5173](http://localhost:5173) in your browser.

### 3. Build for production
```bash
npm run build
```
Output is written to the `dist/` folder. Preview the production build with:
```bash
npm run preview
```

## Project Structure

```
src/
├── components/
│   ├── Page.tsx            # Top-level layout: Header + Main + Footer
│   ├── Header.tsx          # Site header with logo, title, and greeting
│   ├── Main.tsx            # Iterates departments → DepartmentSection
│   ├── DepartmentSection.tsx  # Department heading + EmployeeCard list
│   └── Footer.tsx          # Copyright footer with dynamic year
├── data/
│   └── departments.ts      # All employee/department data (Case Study pgs. 17-18)
├── types.ts                # Employee and Department TypeScript interfaces
├── App.tsx                 # Root component
├── main.tsx                # React DOM entry point
└── index.css               # Global styles
```

## Deploying to Vercel

1. Push the `fs_lab-1.2` branch and merge it into `main`.
2. Import the GitHub repository at [vercel.com/new](https://vercel.com/new).
3. Vercel auto-detects Vite. Confirm these settings:
   - **Framework Preset**: Vite
   - **Build Command**: `npm run build`
   - **Output Directory**: `dist`
4. Click **Deploy**. Vercel will redeploy automatically on every push to `main`.
