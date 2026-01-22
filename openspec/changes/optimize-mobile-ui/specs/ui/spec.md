## ADDED Requirements
### Requirement: Responsive 3D Elements
The system SHALL hide complex 3D visualizations on mobile devices to improve performance and usability.

#### Scenario: Mobile view
- **WHEN** the viewport width is less than the medium breakpoint (768px)
- **THEN** the 3D coordinate axis component SHALL NOT be visible

### Requirement: Button Standardization
The system SHALL provide consistent button styles across the application following the design system.

#### Scenario: Button variants
- **WHEN** a button is rendered
- **THEN** it SHALL have a border radius of 6-8px
- **AND** it SHALL have appropriate padding based on size (sm, default, lg)
- **AND** the font SHALL be medium weight sans-serif
