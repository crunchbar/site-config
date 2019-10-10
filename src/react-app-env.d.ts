/// <reference types="react-scripts" />

declare module 'json5-writer';

declare module '!!raw-loader!*' {
  const contents: string
  export = contents
}
