/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_REACT_APP_MAPBOX_ACCESS_TOKEN: string;
    readonly VITE_AGRO_URL: string;
    // more env variables...
}
  
interface ImportMeta {
    readonly env: ImportMetaEnv;
}