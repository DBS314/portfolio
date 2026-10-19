# Bala Srinivas — Swiss CAD & CAE Portfolio

A clean, distraction-free **Swiss International Style** engineering portfolio built for **HR/Recruiters** and **Freelance Clients**.

## How to Add a New Project as Your Career Progresses

Each project lives in its **own individual file** inside the [`projects/`](./projects/) directory:

1. Copy [`projects/_template.js`](./projects/_template.js) and rename it (for example: `projects/05-hydraulic-manifold.js`).
2. Fill in your **Problem Statement**, **Metrics**, and **Step-by-Step Story Slides** (CAD → Meshing → FEA/CFD → Final Product).
   - To use your own screenshots/renders (`.png`, `.jpg`, `.webp`), place them in an `assets/` folder, set `image: './assets/your-image.png'`, and add `useCustomImage: true` on that step.
3. Open [`projects/index.js`](./projects/index.js), import your new project file, and add it to the `PROJECTS` array.

The **Continuous Cube Stream**, **Top Dynamic Scroll Bar**, **Hero Directory**, **Image Gallery**, and **Resume Project Summary** will all update automatically.
