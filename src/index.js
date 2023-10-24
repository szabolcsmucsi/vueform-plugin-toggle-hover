import { onMounted, onBeforeUnmount } from 'vue'
import './index.scss'

export default function vueformPluginToggleHover() {
  return {
    apply: 'ToggleElement',
    props: {
      hoverText: {
        default: null,
        type: [String],
      },
    },
    setup(props, context, component) {
      
      if (!props.hoverText) {
        return {
          ...component
        }
      }
      
      let el
      
      const handleMousenter = (event) => {
        
        if (hoverHtmlExists()) {
          return
        }
        
        event.preventDefault()
        
        const box = document.createElement('div')
        box.setAttribute('data-vf-toggle-hover-wrapper', '')
        box.innerHTML = props.hoverText
        
        el.append(box)
      }
      const handleMouseleave = () => {
        el.removeChild(hoverHtmlExists())
      }
      
      const hoverHtmlExists = () => {
        return document.querySelector('div[data-vf-toggle-hover-wrapper]')
      }
      
      onMounted(() => {
        
        el = component.input.value.$el
        el.style.position = 'relative'
        
        el.addEventListener('mouseenter', handleMousenter)
        el.addEventListener('mouseleave', handleMouseleave)
      })
      
      onBeforeUnmount(() => {
        el.removeEventListener('mouseenter', handleMousenter)
        el.removeEventListener('mouseleave', handleMouseleave)
      })
      
      
      return {
        ...component
      }
    }
  }
}