# UI/UX Pro Max Design System Guidelines

Comprehensive design guide for web and mobile applications powered by UI/UX Pro Max skill. Contains 67 styles, 96 color palettes, 57 font pairings, 99 UX guidelines, and 25 chart types across 13 technology stacks.

---

## When to Apply

Reference these guidelines when:
- Designing new UI components or pages
- Choosing color palettes and typography
- Reviewing code for UX issues
- Building landing pages or dashboards
- Implementing accessibility requirements

---

## How to Use This System

### Step 1: Generate Design System (REQUIRED)

**Always start with design system generation** to get comprehensive recommendations:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<product_type> <industry> <keywords>" --design-system -p "Project Name"
```

**Example:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "fintech crypto dashboard modern" --design-system -p "Crypto Analytics"
```

This returns:
- Complete design pattern recommendation
- Style guide (glassmorphism, minimalism, etc.)
- Color palette optimized for product type
- Typography pairings (heading + body fonts)
- Visual effects and animations
- Anti-patterns to avoid

### Step 2: Persist Design System (Optional)

To save design system for reuse across sessions:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name"
```

This creates:
- `design-system/MASTER.md` — Global design rules
- `design-system/pages/` — Page-specific overrides

**With page-specific override:**
```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<query>" --design-system --persist -p "Project Name" --page "dashboard"
```

### Step 3: Domain-Specific Searches (As Needed)

After getting the design system, use detailed searches:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --domain <domain> [-n <max_results>]
```

**Available Domains:**

| Domain | Use For | Example Keywords |
|--------|---------|------------------|
| `product` | Product type recommendations | SaaS, e-commerce, portfolio, healthcare, beauty |
| `style` | UI styles, colors, effects | glassmorphism, minimalism, dark mode, brutalism |
| `typography` | Font pairings, Google Fonts | elegant, playful, professional, modern |
| `color` | Color palettes by product type | saas, ecommerce, healthcare, fintech |
| `landing` | Page structure, CTA strategies | hero, testimonial, pricing, social-proof |
| `chart` | Chart types, library recommendations | trend, comparison, timeline, funnel |
| `ux` | Best practices, anti-patterns | animation, accessibility, z-index, loading |
| `react` | React/Next.js performance | waterfall, bundle, suspense, memo |
| `web` | Web interface guidelines | aria, focus, keyboard, semantic |

### Step 4: Stack-Specific Guidelines

Get implementation-specific best practices:

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "<keyword>" --stack html-tailwind
```

**Available Stacks:**

| Stack | Focus |
|-------|-------|
| `html-tailwind` | Tailwind utilities, responsive, a11y (DEFAULT) |
| `react` | State, hooks, performance, patterns |
| `nextjs` | SSR, routing, images, API routes |
| `vue` | Composition API, Pinia, Vue Router |
| `svelte` | Runes, stores, SvelteKit |
| `shadcn` | shadcn/ui components, theming, forms |

---

## Priority Rules by Category

### 1. Accessibility (CRITICAL)

- **color-contrast** - Minimum 4.5:1 ratio for normal text
- **focus-states** - Visible focus rings on interactive elements
- **alt-text** - Descriptive alt text for meaningful images
- **aria-labels** - aria-label for icon-only buttons
- **keyboard-nav** - Tab order matches visual order
- **form-labels** - Use label with for attribute

### 2. Touch & Interaction (CRITICAL)

- **touch-target-size** - Minimum 44x44px touch targets
- **hover-vs-tap** - Use click/tap for primary interactions
- **loading-buttons** - Disable button during async operations
- **error-feedback** - Clear error messages near problem
- **cursor-pointer** - Add cursor-pointer to clickable elements

### 3. Performance (HIGH)

- **image-optimization** - Use WebP, srcset, lazy loading
- **reduced-motion** - Check prefers-reduced-motion
- **content-jumping** - Reserve space for async content

### 4. Layout & Responsive (HIGH)

- **viewport-meta** - width=device-width initial-scale=1
- **readable-font-size** - Minimum 16px body text on mobile
- **horizontal-scroll** - Ensure content fits viewport width
- **z-index-management** - Define z-index scale (10, 20, 30, 50)

### 5. Typography & Color (MEDIUM)

- **line-height** - Use 1.5-1.75 for body text
- **line-length** - Limit to 65-75 characters per line
- **font-pairing** - Match heading/body font personalities

### 6. Animation (MEDIUM)

- **duration-timing** - Use 150-300ms for micro-interactions
- **transform-performance** - Use transform/opacity, not width/height
- **loading-states** - Skeleton screens or spinners

### 7. Style Selection (MEDIUM)

- **style-match** - Match style to product type
- **consistency** - Use same style across all pages
- **no-emoji-icons** - Use SVG icons, not emojis

### 8. Charts & Data (LOW)

- **chart-type** - Match chart type to data type
- **color-guidance** - Use accessible color palettes
- **data-table** - Provide table alternative for accessibility

---

## Common Rules for Professional UI

### Icons & Visual Elements

| Rule | Do | Don't |
|------|----|----- |
| **No emoji icons** | Use SVG icons (Heroicons, Lucide, Simple Icons) | Use emojis like 🎨 🚀 ⚙️ as UI icons |
| **Stable hover states** | Use color/opacity transitions on hover | Use scale transforms that shift layout |
| **Correct brand logos** | Research official SVG from Simple Icons | Guess or use incorrect logo paths |
| **Consistent icon sizing** | Use fixed viewBox (24x24) with w-6 h-6 | Mix different icon sizes randomly |

### Interaction & Cursor

| Rule | Do | Don't |
|------|----|----- |
| **Cursor pointer** | Add `cursor-pointer` to all clickable/hoverable cards | Leave default cursor on interactive elements |
| **Hover feedback** | Provide visual feedback (color, shadow, border) | No indication element is interactive |
| **Smooth transitions** | Use `transition-colors duration-200` | Instant state changes or too slow (>500ms) |

### Light/Dark Mode Contrast

| Rule | Do | Don't |
|------|----|----- |
| **Glass card light mode** | Use `bg-white/80` or higher opacity | Use `bg-white/10` (too transparent) |
| **Text contrast light** | Use `#0F172A` (slate-900) for text | Use `#94A3B8` (slate-400) for body text |
| **Muted text light** | Use `#475569` (slate-600) minimum | Use gray-400 or lighter |
| **Border visibility** | Use `border-gray-200` in light mode | Use `border-white/10` (invisible) |

### Layout & Spacing

| Rule | Do | Don't |
|------|----|----- |
| **Floating navbar** | Add `top-4 left-4 right-4` spacing | Stick navbar to `top-0 left-0 right-0` |
| **Content padding** | Account for fixed navbar height | Let content hide behind fixed elements |
| **Consistent max-width** | Use same `max-w-6xl` or `max-w-7xl` | Mix different container widths |

---

## Pre-Delivery Checklist

Before delivering UI code, verify these items:

### Visual Quality
- [ ] No emojis used as icons (use SVG instead)
- [ ] All icons from consistent icon set (Heroicons/Lucide)
- [ ] Brand logos are correct (verified from Simple Icons)
- [ ] Hover states don't cause layout shift
- [ ] Use theme colors directly (bg-primary) not var() wrapper

### Interaction
- [ ] All clickable elements have `cursor-pointer`
- [ ] Hover states provide clear visual feedback
- [ ] Transitions are smooth (150-300ms)
- [ ] Focus states visible for keyboard navigation

### Light/Dark Mode
- [ ] Light mode text has sufficient contrast (4.5:1 minimum)
- [ ] Glass/transparent elements visible in light mode
- [ ] Borders visible in both modes
- [ ] Test both modes before delivery

### Layout
- [ ] Floating elements have proper spacing from edges
- [ ] No content hidden behind fixed navbars
- [ ] Responsive at 375px, 768px, 1024px, 1440px
- [ ] No horizontal scroll on mobile

### Accessibility
- [ ] All images have alt text
- [ ] Form inputs have labels
- [ ] Color is not the only indicator
- [ ] `prefers-reduced-motion` respected

---

## Example Workflow

**User request:** "Build a modern SaaS dashboard with analytics"

### 1. Analyze Requirements
- Product type: SaaS dashboard
- Style keywords: modern, clean, professional
- Industry: SaaS/Analytics
- Stack: React (or html-tailwind default)

### 2. Generate Design System

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "saas dashboard analytics modern professional" --design-system -p "Analytics Dashboard"
```

**Output:** Complete design system with pattern, style, colors, typography, effects

### 3. Supplement with Detailed Searches

```bash
# Get UX guidelines for animation and charts
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "animation loading" --domain ux

# Get chart recommendations
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "trend analytics real-time" --domain chart
```

### 4. Stack Guidelines

```bash
python3 .claude/skills/ui-ux-pro-max/scripts/search.py "responsive layout grid" --stack html-tailwind
```

### 5. Implement

Synthesize design system + detailed searches and implement the design following all guidelines.

---

## Tips for Better Results

1. **Be specific with keywords** - "healthcare SaaS dashboard" > "app"
2. **Search multiple times** - Different keywords reveal different insights
3. **Combine domains** - Style + Typography + Color = Complete design system
4. **Always check UX** - Search "animation", "z-index", "accessibility" for common issues
5. **Use stack flag** - Get implementation-specific best practices
6. **Iterate** - If first search doesn't match, try different keywords

---

## General Implementation Guidelines

### Code Quality
- Only use absolute positioning when necessary
- Opt for responsive layouts using flexbox and grid
- Refactor code as you go to keep it clean
- Keep file sizes small and put helper functions in their own files
- No placeholders or incomplete implementations

### Design System
- Use base font-size from design system recommendations
- Follow color palette from generated design system
- Maintain consistency across all pages
- Never mix different design styles in the same project

### Component Best Practices
- One primary button per section to guide users
- Secondary buttons for alternative actions
- Tertiary buttons for least important actions
- Don't use dropdown if there are 2 or fewer options
- Chips should come in sets of 3 or more

---

## Prerequisites

Python 3.x is required for search scripts. Check installation:

```bash
python3 --version
```

If not installed:
- **macOS:** `brew install python3`
- **Ubuntu/Debian:** `sudo apt update && sudo apt install python3`
- **Windows:** `winget install Python.Python.3.12`

---

## Resources

- Design System Location: `.claude/skills/ui-ux-pro-max/`
- Search Script: `.claude/skills/ui-ux-pro-max/scripts/search.py`
- Data Files: `.claude/skills/ui-ux-pro-max/data/`
  - `styles.csv` - 67 UI styles
  - `colors.csv` - 96 color palettes
  - `typography.csv` - 57 font pairings
  - `ux-guidelines.csv` - 99 UX best practices
  - `charts.csv` - 25 chart types
  - And more...
