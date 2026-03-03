# Changelog

## [1.1.0] - 2026-03-03

### Fixed
- **Hydration Error**: Added `suppressHydrationWarning` to the `<body>` tag in `layout.tsx` to prevent React hydration mismatches caused by browser extensions or theme scripts.
- **Turkish Typo**: Fixed "Keşdin" to "Keşfedin" in the Category Section header.

### Added
- **Localization**: Full multi-language support (TR, EN, DE, FR, AR) for the Homepage Category Section, including:
  - Section headers and descriptions.
  - Category filter tabs.
  - Category card labels, badges, and product counts.
  - "Explore" buttons.
- **Translation Keys**: Comprehensive set of keys added to `i18n.ts` for consistent UI labeling.

### Changed
- **Component Refactoring**: Updated `SectionHeader.tsx`, `FilterTabs.tsx`, and `CategoryCard.tsx` to use the unified `useGlobal` context for translations.
