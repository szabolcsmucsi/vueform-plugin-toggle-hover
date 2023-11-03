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
      tooltipTitle: {
        type: String,
      },
      tooltipOnTitle: {
        type: String,
      },
      tooltipOffTitle: {
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
        tooltipTitle,
        tooltipOnTitle,
        tooltipOffTitle,
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
      
      const modalTitle = computed(() => {
        if (component.value.value && tooltipOnTitle.value && !tooltipTitle.value) {
          return tooltipOnTitle.value
        }
        if (!component.value.value && tooltipOffTitle.value && !tooltipTitle.value) {
          return tooltipOffTitle.value
        }
        
        return tooltipTitle.value
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
            modal: 'vf-toggle-tooltip-modal',
            title: 'vf-toggle-tooltip-title',
            content: 'vf-toggle-tooltip-content',
          }
        })
      })
      
      // ============== METHODS ===============
      
      const createModal = () => {
        TooltipApp = createApp({
          render() {
            return h(TooltipModal, {
              content: modalContent.value,
              title: modalTitle.value,
              classes: classes.value,
              ref: 'modal$'
            })
          }
        })
        
        $hoverDOM = document.createElement('div')
        $hoverDOM.setAttribute('data-vf-toggle-tooltip-modal', '')
        $hoverDOM.setAttribute('class', classes.value.modal.join(' '))
        
        $el.value.append($hoverDOM)
        $el.value.style.position = 'relative'
        
        modal$.value = TooltipApp.mount('div[data-vf-toggle-tooltip-modal]')
      }
      
      const removeModal = () => {
        TooltipApp.unmount()
        document.querySelector('[data-vf-toggle-tooltip-modal]').remove()
        TooltipApp = undefined
      }
      
      const handleChange = () => {
        component.value.value = !component.value.value
        
        if (TooltipApp) {
          removeModal()
        }
        
        handleMouseenter()
      }
      
      const handleMouseenter = () => {
        if (
          (component.value.value && !tooltipOnText.value && !tooltipText.value) ||
          (!component.value.value && !tooltipOffText.value && !tooltipText.value)
        ) {
          return
        }
        
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