/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_URL_API: string;
  readonly VITE_URL_GIFTS: string;
  readonly VITE_API_TOKEN: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

declare module "*.PNG" {
  const src: string;
  export default src;
}
