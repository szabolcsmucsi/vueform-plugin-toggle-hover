# Toggle Confirm Vueform Plugin

Plugin for Vueform to add a small speech bubble like dialog box above the `ToggleElement` on hover.

## Prerequisites

- [Vueform 1.5.0+](https://github.com/vueform/vueform)

## Installation

1. Install the plugin

```bash
npm install vueform-plugin-toggle-tooltip
```

2. Add the plugin in `vueform.config.js`

```js
// vueform.config.js

import ToggleTooltipPlugin from 'vueform-plugin-toggle-tooltip'

export default {
  // ...
  plugins: [
    ToggleTooltipPlugin,
  ]
}

```

## Usage

```vue
<template>
  <Vueform>
    <ToggleElement
      name="toggle"
      hover-text="Some string or even <strong>HTML</strong>!"
    />
  </Vueform>
</template>
```

## Options

| Name             | {Type} Default       | Description             |
|------------------|----------------------|-------------------------|
| **hoverContent** | `{string} undefined` | Content of hover dialog |