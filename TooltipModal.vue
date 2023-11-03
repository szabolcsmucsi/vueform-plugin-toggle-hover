<template>
  <div v-if="title" :class="classes.title" v-html="title" />
  <div :class="classes.content" v-html="content" />
</template>

<script setup>

const props = defineProps({
  title: {
    type: String,
  },
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
  width: var(--vf-toggle-tooltip-modal-max-width, max-content);
  padding: var(--vf-toggle-tooltip-modal-py, 1.5rem) var(--vf-toggle-tooltip-modal-px, 1.5rem);
  background: var(--vf-toggle-tooltip-modal-bg, #FFFFFF);
  box-shadow: var(--vf-toggle-tooltip-modal-shadow, 0 0 20px 5px #0000001a);
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
  border: 0.5rem solid #ffffff;
  border-color: transparent transparent #ffffff #ffffff;
  box-shadow: -10px 10px 14px 0px rgba(0, 0, 0, 0.25);
  box-sizing: border-box;
}

.vf-toggle-tooltip-title {
  font-size: var(--vf-toggle-tooltip-modal-title-font-size, 18px);
  line-height: var(--vf-toggle-tooltip-modal-title-line-height, 1.2);
  font-weight: var(--vf-toggle-tooltip-modal-title-font-weight, 500);
  color: var(--vf-toggle-tooltip-modal-title-color, inherit);
  margin-bottom: var(--vf-toggle-tooltip-modal-title-mb, 0.75rem);
  padding-bottom: var(--vf-toggle-tooltip-modal-title-pb, 0.75rem);
  padding-right: var(--vf-toggle-tooltip-modal-close-width, 1.5rem);
  border-bottom: var(--vf-toggle-tooltip-modal-title-border-width, 1px) solid var(--vf-toggle-tooltip-modal-title-border-color, var(--vf-gray-300));
}

.vf-toggle-tooltip-content {
  font-size: var(--vf-toggle-tooltip-modal-font-size, 1rem);
  color: var(--vf-toggle-tooltip-modal-color, inherit);
}
</style>