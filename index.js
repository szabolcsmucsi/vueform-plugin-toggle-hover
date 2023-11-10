import { createApp, h, ref, onMounted, computed, onBeforeUnmount, toRefs } from 'vue'
import { useClasses } from '@vueform/vueform'
import TooltipModal from './TooltipModal.vue'

export default function vueformPluginToggleTooltip() {
  return {
    apply: 'ToggleElement',
    props: {
      tooltipText: {
        type: String,
      },
      tooltipOnText: {
        type: String,
      },
      tooltipOffText: {
        type: String,
      },
    },
    setup(props, context, component) {
      if (!props.tooltipText && !props.tooltipOnText && !props.tooltipOffText) {
        return component
      }
      
      const {
        tooltipText,
        tooltipOnText,
        tooltipOffText,
      } = toRefs(props)
      
      let $hoverDOM
      let elInitialPositionProperty
      let TooltipApp
      
      // ================ DATA ================
      
      const modal$ = ref(null)
      
      // ============== COMPUTED ==============
      
      const $el = computed(() => {
        return component.input.value.$el
      })
      
      const modalContent = computed(() => {
        if (component.value.value && tooltipOnText.value && !tooltipText.value) {
          return tooltipOnText.value
        }
        if (!component.value.value && tooltipOffText.value && !tooltipText.value) {
          return tooltipOffText.value
        }
        
        return tooltipText.value
      })
      
      const { classes } = useClasses(props, { name: ref('TooltipModal') }, {
        form$: component.form$,
        el$: component.el$,
        theme: component.theme,
        Templates: component.Templates,
        View: component.View,
        component$: ref({
          merge: true,
          defaultClasses: {
            container: 'vf-toggle-tooltip',
            content: 'vf-toggle-tooltip-content',
          }
        })
      })
      
      // ============== METHODS ===============
      
      const renderModal = () => {
        TooltipApp = createApp({
          render() {
            return h(TooltipModal, {
              content: modalContent.value,
              classes: classes.value,
              ref: 'modal$'
            })
          }
        })
        
        $hoverDOM = document.createElement('div')
        $hoverDOM.setAttribute('data-vf-toggle-tooltip', '')
        $hoverDOM.setAttribute('class', classes.value.container.join(' '))
        
        $el.value.append($hoverDOM)
        $el.value.style.position = 'relative'
        
        modal$.value = TooltipApp.mount('div[data-vf-toggle-tooltip]')
      }
      
      const removeModal = () => {
        TooltipApp.unmount()
        document.querySelector('[data-vf-toggle-tooltip]').remove()
        TooltipApp = undefined
      }
      
      const createModal = () => {
        if (
          (component.value.value && !tooltipOnText.value && !tooltipText.value) ||
          (!component.value.value && !tooltipOffText.value && !tooltipText.value)
        ) {
          return
        }
        
        renderModal()
      }
      
      const handleChange = () => {
        component.value.value = !component.value.value
        
        if (TooltipApp) {
          removeModal()
        }
        
        createModal()
      }
      
      const handleMouseenter = () => {
        createModal()
      }
      
      const handleMouseleave = () => {
        if (!TooltipApp) {
          return
        }
        
        removeModal()
        $el.value.style.position = elInitialPositionProperty
      }
      
      // ================ HOOKS ===============
      
      onMounted(() => {
        elInitialPositionProperty = $el.value.style.position
        
        $el.value.addEventListener('mouseenter', handleMouseenter)
        $el.value.addEventListener('mouseleave', handleMouseleave)
      })
      
      onBeforeUnmount(() => {
        $el.value.addEventListener('mouseenter', handleMouseenter)
        $el.value.addEventListener('mouseleave', handleMouseleave)
      })
      
      
      return {
        ...component,
        handleChange,
      }
    }
  }
}