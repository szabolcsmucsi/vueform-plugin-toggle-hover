# Toggle Tooltip plugin for [Vueform](https://github.com/vueform/vueform)

Plugin for [Vueform](https://github.com/vueform/vueform) to add a small speech bubble above the `ToggleElement` on hover.

## Prerequisites

- [Vueform 1.5.4+](https://github.com/vueform/vueform)

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
        tooltip-text-on="This tooltip will show when toggle is on"
        tooltip-text-off="This tooltip will show when toggle is off"
    />
  </Vueform>
</template>
```

## Options

| Name | {Type} Default | Description |
| --- | --- | --- |
| **tooltipText** | `{string} undefined` | The text in the modal when toggle is **On** or **Off** (mutually exclusive with `tooltipOnText` and `tooltipOffText`). |
| **tooltipOnText** | `{string} undefined` | The text in the modal when toggle is **On**. |
| **tooltipOffText** | `{string} undefined` | The text in the modal when toggle is **Off**. |

## Classes

Classes can be changed using the built-in Vueform [class management](https://vueform.com/docs/styles-and-layout#add-classes) with `TooltipModal` key, eg.:

```vue
<ToggleElement
  ...
  :replace-classes="{
    TooltipModal: {
      container: {
        'vf-toggle-tooltip' : 'my-overlay-class',
      },
      content: {
        'vf-toggle-tooltip-content' : 'my-wrapper-class',
      }
      // ...
    }
  }"
/>
```

## CSS Vars

You can customize the following CSS vars dedicated for this plugin:

```css
*, :root, :before, :after {
  /* Modal */
  --vf-toggle-tooltip-offset: 2.6rem;
  --vf-toggle-tooltip-max-width: 380px;
  --vf-toggle-tooltip-width: max-content;
  --vf-toggle-tooltip-shadow-blur: 10px;
  --vf-toggle-tooltip-shadow-spread: 2px;
  --vf-toggle-tooltip-shadow-color: #0000001a;
  
  /* Content */
  --vf-toggle-tooltip-content-py: 0.5rem;
  --vf-toggle-tooltip-content-px: 0.5rem;
  --vf-toggle-tooltip-content-bg: #FFFFFF;
  --vf-toggle-tooltip-content-font-size: 0.875rem;
  --vf-toggle-tooltip-content-line-height: 1.2;
  --vf-toggle-tooltip-content-color: inherit;
}
```

The plugin also uses the following Vueform default CSS vars:

```css
*, :root, :before, :after {
  --vf-toggle-width;
}
```

## License

[MIT](https://opensource.org/licenses/MIT)