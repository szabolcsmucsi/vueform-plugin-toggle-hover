<template>
  <div :class="classes.content" v-html="content" />
</template>

<script setup>

const props = defineProps({
  content: {
    type: String,
  },
  classes: {
    type: Object,
  },
})
</script>

<style lang="scss">
.vf-toggle-tooltip {
  position: absolute;
  bottom: var(--vf-toggle-tooltip-offset, 2.6rem);
  max-width: var(--vf-toggle-tooltip-max-width, 380px);
  width: var(--vf-toggle-tooltip-width, max-content);
  box-shadow: 0 0 var(--vf-toggle-tooltip-shadow-blur, 10px) var(--vf-toggle-tooltip-shadow-spread, 2px) var(--vf-toggle-tooltip-shadow-color, #0000001a);
  pointer-events: none;
  transform: translateX(calc(-50% + var(--vf-toggle-width) / 2));
}

.vf-toggle-tooltip:before {
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  bottom: -0.3rem;
  left: 50%;
  transform-origin: center;
  transform: rotateZ(-45deg) skew(-20deg, -20deg) translate(-50%, -50%);
  border: 0.5rem solid var(--vf-toggle-tooltip-content-bg, #FFFFFF);
  border-color: transparent transparent var(--vf-toggle-tooltip-content-bg, #FFFFFF) var(--vf-toggle-tooltip-content-bg, #FFFFFF);
  box-shadow: -0.25rem 0.25rem var(--vf-toggle-tooltip-shadow-blur, 10px) var(--vf-toggle-tooltip-shadow-spread, 2px) var(--vf-toggle-tooltip-shadow-color, #0000001a);
  box-sizing: border-box;
}

.vf-toggle-tooltip-content {
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  padding: var(--vf-toggle-tooltip-content-py, 0.5rem) var(--vf-toggle-tooltip-content-px, 0.5rem);
  background: var(--vf-toggle-tooltip-content-bg, #FFFFFF);
  font-size: var(--vf-toggle-tooltip-content-font-size, 0.875rem);
  line-height: var(--vf-toggle-tooltip-content-line-height, 1.2);
  color: var(--vf-toggle-tooltip-content-color, inherit);
}
</style>