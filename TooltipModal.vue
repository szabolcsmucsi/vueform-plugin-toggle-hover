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
  bottom: 2.6rem;
  
  max-width: 400px;
  width: max-content;
  
  min-height: 50px;
  
  padding: 1rem;
  
  background: #FFFFFF;
  pointer-events: none;
  
  transform: translateX(calc(-50% + var(--vf-toggle-width) / 2));
  box-shadow: 0 0 20px 5px rgba(0, 0, 0, 0.25);
}

.vf-toggle-tooltip-modal:after{
  content: "";
  position: absolute;
  width: 0;
  height: 0;
  bottom: -0.3rem;
  left: 50%;
  box-sizing: border-box;
  
  border: 0.5rem solid #ffffff;
  border-color: transparent transparent #ffffff #ffffff;
  
  transform-origin: center;
  transform: rotateZ(-45deg) skew(-20deg, -20deg) translate(-50%, -50%);
  
  box-shadow: -10px 10px 14px 0px rgba(0, 0, 0, 0.25);
}

</style>