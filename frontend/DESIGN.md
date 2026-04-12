# Design System Document: The Neon-Botanical Editorial

## 1. Overview & Creative North Star
### Creative North Star: "The Digital Alchemist"
This design system moves away from the sterile, grid-locked structures of standard web design. Instead, it embraces **The Digital Alchemist**—a vision where organic growth meets high-contrast editorial precision. We are building an experience that feels like a rare, late-night gallery opening: dark, immersive, and pulsating with life.

By utilizing recursive patterns and a "black-out" canvas, we break the template look through **intentional asymmetry**. Layouts should feel like they are growing from the center outward, rather than being slotted into boxes. We use high-contrast typography scales and vibrant, "glowing" accents to ensure every interaction feels like a celebratory spark in a void.

---

## 2. Colors
Our palette is rooted in a deep, absolute darkness, allowing our vibrant pinks and warm accents to vibrate with intensity.

*   **Primary (#ff87be / #ff6cb5):** Used for the skeletal structure of the experience—the tree trunk, branches, and critical navigation paths.
*   **Secondary (#ff68a7):** Reserved for "blooming" elements—hearts, particles, and interactive feedback.
*   **Tertiary (#ffe792):** A celebratory "gold" used sparingly for highlights and special moments of joy.

### The "No-Line" Rule
**Strict Mandate:** Prohibit 1px solid borders for sectioning. We define boundaries through tonal shifts. If a section needs to be separated from the `surface` (#0e0e0e), use `surface-container-low` (#131313) or `surface-container-high` (#1f1f1f). Lines are for growth (the tree), not for containers.

### Surface Hierarchy & Nesting
Treat the UI as physical layers of "Obsidian Glass."
*   **Base:** `surface-container-lowest` (#000000) for the main canvas.
*   **Nested Containers:** An inner card should use `surface-container` (#191919), and a pop-over should use `surface-bright` (#2c2c2c). This creates a sense of "lift" without the clutter of lines.

### The "Glass & Gradient" Rule
To achieve a high-end feel, use **Glassmorphism** for floating UI. Apply `surface` colors at 60% opacity with a `backdrop-blur` of 20px. 
*   **Signature Texture:** Apply a subtle radial gradient on `primary` buttons, transitioning from `primary` (#ff87be) to `primary-container` (#ff6cb5) at a 45-degree angle. This provides a "neon-tube" depth that flat colors lack.

---

## 3. Typography
We use **Space Grotesk** across the entire system. Its monospace-adjacent qualities provide a "clean typewriter" aesthetic that balances whimsy with technical precision.

*   **Display (Large/Medium):** Set at `3.5rem` / `2.75rem`. Use these for the "Birthday Message." The generous tracking and tall x-height make the text feel like an editorial headline in a fashion magazine.
*   **Headline & Title:** Use these for navigation and sub-headers. They should always be `on-surface` (#ffffff) to cut through the dark background.
*   **Body & Labels:** Set in `body-md` (0.875rem). The monospace feel ensures that even long-form celebratory text feels intentional and structured.

**Editorial Tip:** Use `display-lg` with a slight `text-shadow` of the `primary` color (low opacity) to mimic the glow of the recursive tree.

---

## 4. Elevation & Depth
In a pure black environment, traditional shadows are invisible. We must use **Tonal Layering**.

*   **The Layering Principle:** Stack `surface-container-low` on `surface` for a subtle lift. For high-priority modals, use `surface-container-highest` (#262626).
*   **Ambient Shadows:** When an element must "float" (like a heart-particle tooltip), use an ambient glow rather than a black shadow. The shadow should be `primary_dim` (#fd68b3) at 5% opacity with a 40px blur.
*   **The "Ghost Border" Fallback:** If accessibility requires a container edge, use the **Ghost Border**: `outline-variant` (#484848) at 15% opacity. Never use a 100% opaque border.

---

## 5. Components

### Buttons
*   **Primary:** Roundedness `full` (9999px). Background: `primary_fixed` gradient. Text: `on_primary_fixed` (#000000).
*   **Tertiary (Ghost):** No background. Text: `primary`. On hover, apply a `surface-variant` (#262626) background at 30% opacity.

### Chips (Heart Petals)
Use `md` (1.5rem) roundedness. Use `secondary_container` (#b90068) for the background to create a "dimmed glow" effect.

### Inputs & Typewriter Fields
Text inputs should have no bottom line. Instead, use a `surface-container-low` background with a `sm` (0.5rem) corner radius. The cursor should blink in `primary` (#ff69b4) to mimic a typewriter.

### Cards (The "Horticulture" Card)
Forbid the use of divider lines. Separate "Gift" items or "Message" sections using 2rem of vertical whitespace (from our Spacing Scale) or by shifting the background from `surface-container` to `surface-container-high`.

### Special Component: The Particle Tooltip
A semi-transparent (`surface` at 70%) container with `xl` (3rem) roundedness and a `backdrop-blur`. Used for displaying metadata about specific "bloomed" hearts on the tree.

---

## 6. Do's and Don'ts

### Do
*   **Do** use asymmetrical spacing. If a text block is on the left, let the tree branches occupy the right-hand negative space.
*   **Do** animate text using a "typewriter" stagger (50ms per character).
*   **Do** use `primary` and `secondary` colors for interactive states to make them feel "alive."

### Don't
*   **Don't** use pure white (#ffffff) for large blocks of background; it breaks the "Digital Alchemist" mood. White is for text only.
*   **Don't** use standard "Material" shadows. They disappear in our #000000 base. Use tonal shifts.
*   **Don't** use sharp 0px corners. Even our most "brutalist" elements should have at least `sm` (0.5rem) roundedness to maintain the "whimsical" mood.
*   **Don't** use 1px dividers. If you feel the need to separate, use space.

---

## 7. Motion Principles
*   **Recursive Growth:** Tree branches should expand using a `cubic-bezier(0.16, 1, 0.3, 1)` easing for a natural, snapping-into-place feel.
*   **Heart Bloom:** Particles should scale from 0% to 110% then settle at 100% to mimic an organic "pop."
*   **Luminescence:** Key CTAs should have a pulse animation that subtly cycles between `primary` and `primary_dim`.