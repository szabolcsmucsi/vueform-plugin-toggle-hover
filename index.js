import { toRefs, computed, onMounted, onBeforeUnmount } from 'vue'
import './index.scss'

export default function vueformPluginToggleTooltip() {
  return {
    apply: 'ToggleElement',
    props: {
      hoverText: {
        type: String,
      },
    },
    setup(props, context, component) {
      if (!props.hoverText) {
        return {
          ...component
        }
      }
      
      const {
        hoverText: hoverContent,
      } = toRefs(props)
      
      let $hoverDOM
      let elInitialPositionProperty
      
      // ============== COMPUTED ==============
      
      const $el = computed(() => {
        return component.input.value.$el
      })
      
      // ============== METHODS ===============
      
      const handleMousenter = () => {
        $hoverDOM = document.createElement('div')
        $hoverDOM.setAttribute('data-vf-toggle-tooltip-wrapper', '')
        $hoverDOM.innerHTML = hoverContent.value
        
        $el.value.append($hoverDOM)
        $el.value.style.position = 'relative'
      }
      
      const handleMouseleave = () => {
        $hoverDOM.remove()
        $el.value.style.position = elInitialPositionProperty
      }
      
      // ================ HOOKS ===============
      
      onMounted(() => {
        elInitialPositionProperty = $el.value.style.position
        
        $el.value.addEventListener('mouseenter', handleMousenter)
        $el.value.addEventListener('mouseleave', handleMouseleave)
      })
      
      onBeforeUnmount(() => {
        $el.value.addEventListener('mouseenter', handleMousenter)
        $el.value.addEventListener('mouseleave', handleMouseleave)
      })
      
      
      return {
        ...component
      }
    }
  }
}