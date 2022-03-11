# Dental Admin

# Vue 3 + Typescript + Vite

<p>
<img src="https://img.shields.io/badge/vue-v3.2.31-blue.svg?color=4FC08D&logo=vuedotjs" alt="vue" />
<img src="https://img.shields.io/badge/vite-v2.8.6-blue.svg?color=646CFF&logo=vite&logoColor=646CFF" alt="vite" />
<img src="https://img.shields.io/badge/license-AGPL--3.0-green.svg" alt="license" />
</p>


## Recommended IDE Setup

- [VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=johnsoncodehk.volar)

## Type Support For `.vue` Imports in TS

Since TypeScript cannot handle type information for `.vue` imports, they are shimmed to be a generic Vue component type by default. In most cases this is fine if you don't really care about component prop types outside of templates. However, if you wish to get actual prop types in `.vue` imports (for example to get props validation when using manual `h(...)` calls), you can enable Volar's `.vue` type support plugin by running `Volar: Switch TS Plugin on/off` from VSCode command palette.
