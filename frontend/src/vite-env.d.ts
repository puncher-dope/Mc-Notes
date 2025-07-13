/// <reference types="vite/client" />


type StyleModule = {
  [key: string]: string;
};

declare module "*.module.css" {
  const style: StyleModule;
  export = style;
}