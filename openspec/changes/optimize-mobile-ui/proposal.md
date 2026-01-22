## Why
The current mobile interface is cluttered with 3D elements that are not optimized for small screens, and button styles need to be standardized according to the project design specifications to ensure consistency and better user experience.

## What Changes
- Hide 3D coordinate axes on mobile devices (screens smaller than 'md' breakpoint).
- Standardize button layout and typography to match project design specs (radius, borders, spacing).
- Ensure buttons have consistent padding and font sizes across the application.

## Impact
- **Affected Specs**: UI/Layout, UI/Components
- **Affected Code**: 
    - `components/coordinate-axis-3d.tsx`
    - `components/ui/button.tsx`
    - `components/terminal-button.tsx`
