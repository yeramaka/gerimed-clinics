# GERIMED CLINICS

Updated website for GERIMED CLINICS.

## What changed

- Standing homepage image with the supplied doctor's appearance.
- Continuous warm clinic-wall background with live serif and handwritten captions.
- Doctor section and `/doctor` profile page.
- Smooth section navigation with a measured sticky-header offset, active navigation and reduced-motion support.
- Mobile navigation that closes without jumping back to the top.
- FAQ and contact sections for the existing navigation links.

## Photos

- `public/images/doctor-standing-hero.webp` is the separate, AI-adapted standing homepage image.
- `public/images/MLP05722.JPG` is the exact original uploaded portrait. It is copied byte-for-byte, without retouching or regeneration.
- The profile page displays the entire original portrait without cropping. The homepage doctor section uses a responsive crop of the same original file.
- The hero captions are HTML text, so their size and position can adapt without editing the photograph.

The clinic-approved doctor's name and qualifications were not present in the supplied project. Add them in `data/doctor.ts` when available. No identity, experience or qualification has been invented.

## Free hosting: Cloudflare Pages

This project exports static HTML, CSS and JavaScript. The appointment form
prepares a WhatsApp message in the visitor's browser; it does not store bookings
or confirm appointment availability.

- Run `npm ci`, then `npm run build`. The deployable website is in `out/`.
- In Cloudflare, choose Workers & Pages, create a Pages project, and use direct
  upload to upload the contents of `out/` (or a ZIP containing those contents).
- Use the supplied `pages.dev` address to avoid purchasing a domain.
- For automatic GitHub deployments, create a Git-integrated Pages project instead:
  use build command `npm run build` and output directory `out`. The repository
  root is the application root. Use Node.js 22.
- Build-time internet access is required to download the Google Fonts. Fonts are
  then included in the exported site. Images are served as their original files
  because there is no image optimization server.
- After exporting, `npm start` is not the preview command; serve `out/` using a
  static web server instead. Local development still uses `npm run dev`.

Static hosting supports the current pages, navigation, and WhatsApp form.
Patient accounts, saved appointments, automatic email/SMS, payments, and a live
booking calendar would require additional services and separate configuration.

Hosting limits: https://developers.cloudflare.com/pages/platform/limits/

## Local development

Extract this ZIP into a new folder and open that folder in your editor. Keep your original project as a backup.

Install the project dependencies:

```bash
npm ci
```

Then run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

If another copy of the website is already using port 3000, stop that server first or use the alternative URL printed by Next.js. The profile page is at `/doctor`.

This ZIP contains source files and image assets. Dependencies and generated build folders are deliberately excluded and are recreated by the commands above.

## Stack

- Next.js App Router
- TypeScript
- Tailwind CSS
- Poppins and Caveat loaded through `next/font/google`

## Brand Tokens

The GERIMED colour system is defined as CSS variables in `app/globals.css` and exposed to Tailwind as theme tokens:

- `brand-forest`
- `brand-gold`
- `brand-sage`
- `brand-ivory`

## Validation

```bash
npm run lint
npm run build
```

The appointment flow remains a WhatsApp request. The visitor reviews their details and sends the prepared message in WhatsApp; the clinic must confirm the appointment.

This update does not deploy or replace a running website automatically.
