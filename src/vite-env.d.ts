/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly URL_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.PNG" {
  const src: string;
  export default src;
}
