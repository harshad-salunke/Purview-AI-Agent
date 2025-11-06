# Microsoft Purview Agentic AI Portal - Design Guidelines

## Design Approach
**System-Based Approach**: Modern enterprise UI with dark mode as default, utilizing Tailwind CSS + Shadcn UI or Material UI component library for consistency and professional polish.

## Core Visual Identity

### Color Palette
- **Primary Accent**: Azure Blue or Electric Teal for interactive elements, highlights, and brand presence
- **Dark Mode Foundation**: Deep dark backgrounds with subtle gradients
- **Status Colors**: Red (High priority), Orange (Medium), Green (Low), success and error states

### Typography
- **Large, Bold Headings**: For page titles and asset names
- **Clear Hierarchy**: Distinct sizing between page headers, section titles, card titles, and body text
- **Readable Body Text**: Optimized for dark backgrounds with sufficient contrast

## Layout Architecture

### Navigation Structure
**Left Sidebar Menu** (fixed, always visible):
- 💬 Chat (Agent Interaction) - primary page
- 💡 Recommendations
- 🗂️ Data Assets
- ⚙️ Settings (theme toggle, user profile)

**Spacing System**: Use Tailwind units of 2, 4, 6, and 8 for consistent spacing (p-4, m-6, gap-8, etc.)

## Page-Specific Design Guidelines

### Chat Page (Main Interface)
**Layout Components**:
- **Chat History Panel** (left collapsible): List of previous sessions with timestamp and agent context
- **Main Chat Area** (center, scrollable): Vertical message feed with alternating user/system messages
- **Input Area** (bottom sticky):
  - Agent selection dropdown showing active agent name above input
  - @mention autocomplete overlay for data assets
  - File upload icon button
  - Send icon (paper plane)
  - Suggested questions chips displayed when agent is selected

**Chat Elements**:
- System messages with animated agent avatar
- Asset cards in vertical list format with "View More" buttons
- Editable curation cards with metadata fields and Approve/Cancel actions
- Typing animation indicator for realistic AI conversation simulation
- Smooth scroll behavior for message feed

### Data Asset Detail Page
**Tabbed Navigation Structure**:
1. Overview - Description, Owner, Collection, Sensitivity, Classification
2. Technical Metadata - Schema, Fields, Data Types, Storage
3. Business Metadata - Glossary terms, Domain, Steward
4. Quality & Compliance - Quality score, scan dates, validation rules
5. Lineage - Visual flow diagram (arrows showing upstream/downstream)
6. Comments/Activity Log - Timeline view

**Top Section**: Asset name (large), type badge, collection, status chip, action buttons (Edit, Approve, Cancel)

**Right Insight Panel**: Quick info cards showing owner, dates, sensitivity, AI suggestions

**Related Assets Section**: Card grid below metadata tabs

### Recommendations Page
**Filter Bar**: Priority dropdown with badge counts (High, Medium, Low)

**Recommendation Cards**:
- Title with priority indicator (colored dot or badge)
- Description text
- "Fix" action button
- Hover effects with subtle elevation

**Modal System**: Detail view opens for viewing affected assets and fix actions

### Recommendation Details Page
**Header**: Back button, recommendation title, affected asset count

**Filter Bar**: Search input, importance dropdown, status filter, collection filter

**Asset List**: Card or table view with:
- Asset name and type
- Importance badge
- Status chip (Pending/Fixed)
- Owner information
- Quick summary
- "View More" and "Fix" buttons

**Fix Modal**: Side panel with assignment controls, metadata inputs, Save/Cancel actions

## Component Library

### Cards
- Rounded corners (rounded-lg)
- Subtle shadows with glow on hover
- Dark background with lighter borders
- Smooth transitions (transition-all duration-300)

### Buttons
- Primary: Accent color fill with hover brightness increase
- Secondary: Outline style with hover fill
- Icon buttons: Circular or square with hover background
- Action buttons: Contextual colors (green for approve, red for cancel)

### Modals & Overlays
- Backdrop blur effect
- Centered with max-width constraints
- Smooth fade-in animation
- Close button in top-right corner

### Form Elements
- Dark input backgrounds with lighter borders
- Focus states with accent color rings
- Dropdown menus with smooth open/close animations
- File upload with drag-and-drop visual feedback

### Status Indicators
- Badges with rounded pill shapes
- Color-coded by status/priority
- Small, non-intrusive size
- High contrast text

### Data Displays
- Tables with zebra striping (subtle)
- Metadata key-value pairs in grid layout
- JSON viewers with syntax highlighting
- Schema tables with clear column headers

## Interactive Elements

### Animations
- **Typing Indicator**: Three-dot animation for AI responses
- **Message Entry**: Slide-up fade-in for new chat messages
- **Card Hover**: Subtle lift with shadow increase
- **Toast Notifications**: Slide-in from top-right corner
- **Loading Skeletons**: Pulse animation for content loading
- **Tab Switching**: Smooth cross-fade between tab content

### Transitions
- Page navigation: Fade transitions
- Modal open/close: Scale and fade
- Sidebar collapse: Width animation
- Dropdown menus: Slide-down with opacity

## Accessibility & UX

- High contrast ratios for dark mode text
- Keyboard navigation support for all interactive elements
- Focus indicators visible on all focusable elements
- Toast notifications with auto-dismiss and close button
- Breadcrumb navigation on detail pages
- Sticky action buttons on scrollable pages
- Responsive breakpoints for tablet/mobile views (desktop-first)

## Images
No hero images required. This is a data-focused enterprise application where visual emphasis is on structured content, data cards, and interface clarity rather than marketing imagery. Avatar icons for AI agents are small circular elements beside chat messages.