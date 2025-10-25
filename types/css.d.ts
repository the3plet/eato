// Type declarations for importing CSS files (side-effect imports and CSS modules)
// This lets you do `import './globals.css'` (side-effect) and `import styles from './foo.module.css'`.

declare module '*.css' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.scss' {
  const content: { [className: string]: string };
  export default content;
}

declare module '*.sass' {
  const content: { [className: string]: string };
  export default content;
}

// Allow plain side-effect imports of CSS (no bindings needed)
declare module './*.css';
