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
.vf-toggle-tooltip-modal {
  position: absolute;
  bottom: var(--vf-toggle-tooltip-modal-offset, 2.6rem);
  max-width: var(--vf-toggle-tooltip-modal-max-width, 380px);
  width: var(--vf-toggle-tooltip-modal-width, max-content);
  padding: var(--vf-toggle-tooltip-modal-py, 0.5rem) var(--vf-toggle-tooltip-modal-px, 0.5rem);
  background: var(--vf-toggle-tooltip-modal-bg, #FFFFFF);
  box-shadow: var(--vf-toggle-tooltip-modal-shadow, 0 0 10px 2px #0000001a);
  pointer-events: none;
  transform: translateX(calc(-50% + var(--vf-toggle-width) / 2));
}

.vf-toggle-tooltip-modal:after{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  bottom: -0.3rem;
  left: 50%;
  transform-origin: center;
  transform: rotateZ(-45deg) skew(-20deg, -20deg) translate(-50%, -50%);
  border: 0.5rem solid var(--vf-toggle-tooltip-modal-bg, #FFFFFF);
  border-color: transparent transparent var(--vf-toggle-tooltip-modal-bg, #FFFFFF) var(--vf-toggle-tooltip-modal-bg, #FFFFFF);
  box-shadow: -10px 10px 14px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.vf-toggle-tooltip-content {
  font-size: var(--vf-toggle-tooltip-modal-content-font-size, 0.875rem);
  line-height: var(--vf-toggle-tooltip-modal-content-line-height, 1.2);
  color: var(--vf-toggle-tooltip-modal-content-color, inherit);
}
</style>