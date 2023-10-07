/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_KONSERVE_API: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
