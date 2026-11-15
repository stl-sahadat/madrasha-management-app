# Developer & Agent Guidelines — Madrasa Management App

## Key Rules & Architectural Principles
1. **Never Touch Legacy/External Folders**: Operate strictly inside the target repository.
2. **Bengali Currency Math**: Always use 0.01 precision and ensure Bengali in-words verbalizer is kept in sync.
3. **Zero Plaintext Credentials**: All user accounts must use Bcrypt password hashing.
4. **Physical Print Preservation**: Always ensure `@media print` rules hide headers, footers, and sidebars for official printable certificates and ID cards.
5. **Dual Bundling Target**:
   - `npm run build` runs Next.js production build.
   - `npx vite build` generates Cloudflare Pages static edge assets in `dist/`.
