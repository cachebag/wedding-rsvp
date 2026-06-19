/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SPANISH_ONLY?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
