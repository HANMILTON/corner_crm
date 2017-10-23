<template>
  <div role="dialog" v-bind:class="{
    'modal':true,
    'fade':effect === 'fade',
    'zoom':effect === 'zoom'
    }">
    <div v-bind:class="{'modal-dialog':true,'modal-lg':large,'modal-sm':small,'model-elg':tooLarge}" role="document" v-bind:style="{width: optionalWidth}">
      <div class="modal-content">
        <slot name="modal-header">
          <div class="modal-header">
            <button type="button" class="close" @click="close"><span>&times;</span></button>
            <h4 class="modal-title">{{title}}</h4>
          </div>
        </slot>
        <slot name="modal-body">
          <div class="modal-body"></div>
        </slot>
        <slot name="modal-footer">
          <div class="modal-footer">
            <button type="button" class="btn btn-default" @click="close">关闭</button>
            <button type="button" class="btn btn-primary" @click="confirm">{{confirmText}}</button>
          </div>
        </slot>
      </div>
    </div>
  </div>
</template>
<script>

export default {
  props: {
    title: {
      type: String,
      default: ''
    },
    show: {
      require: true,
      type: Boolean,
      twoWay: true
    },
    width: {
      default: null
    },
    callback: {
      type: Function,
      default () {}
    },
    effect: {
      type: String,
      default: null
    },
    backdrop: {
      type: Boolean,
      default: false
    },
    large: {
      type: Boolean,
      default: false
    },
    small: {
      type: Boolean,
      default: false
    },
    tooLarge: {
      type: Boolean,
      default: false 
    },
    confirmText: {
      type: String,
      default: "提交"
    }
  },
  mounted() {
    this.$watch('show', (val) => {
      const el = this.$el
      const body = document.body
      const scrollBarWidth = this.getScrollBarWidth()
      // console.log(el,body,scrollBarWidth)
      if (val) {
        el.querySelector('.modal-content').focus()
        el.style.display = 'block'
        setTimeout(() => el.classList.add('in'), 0)
        body.classList.add('modal-open')
        if (scrollBarWidth !== 0) {
          body.style.paddingRight = scrollBarWidth + 'px'
        }
        if (this.backdrop) {
          this._blurModalContentEvent = this.listen(this.$el, 'click', (e) => {
            if (e.target === el) {
              body.classList.remove('modal-open')
              this.$emit("update:show",false)
            }
          })
        }
      } else {
        if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
        el.classList.remove('in')
        setTimeout(() => {
          el.style.display = 'none'
          body.classList.remove('modal-open')
          body.style.paddingRight = '0'
        }, 300)
      }
    }, {
      immediate: true
    })
  },
  // watch:{
  //   "show"(val){
  //     const el = this.$el
  //     const body = document.body
  //     const scrollBarWidth = this.getScrollBarWidth()
  //     // console.log(el,body,scrollBarWidth)
  //     if (val) {
  //       el.querySelector('.modal-content').focus()
  //       el.style.display = 'block'
  //       setTimeout(() => el.classList.add('in'), 0)
  //       body.classList.add('modal-open')
  //       if (scrollBarWidth !== 0) {
  //         body.style.paddingRight = scrollBarWidth + 'px'
  //       }
  //       if (this.backdrop) {
  //         this._blurModalContentEvent = this.listen(this.$el, 'click', (e) => {
  //           if (e.target === el) {
  //             body.classList.remove('modal-open')
  //             this.$emit("update:show",false)
  //           }
  //         })
  //       }
  //     } else {
  //       if (this._blurModalContentEvent) this._blurModalContentEvent.remove()
  //       el.classList.remove('in')
  //       setTimeout(() => {
  //         el.style.display = 'none'
  //         body.classList.remove('modal-open')
  //         body.style.paddingRight = '0'
  //       }, 300)
  //     }
  //   }
  // },
  computed: {
    optionalWidth: function() {
      if (this.width === null) {
        return null;
      } else if (Number.isInteger(this.width)) {
        return this.width + "px";
      }
      return this.width;
    },
  },
  methods: {
    close() {
      // this.show = false
      this.$emit("update:show",false)
      // document.body.classList.remove('modal-open')
    },
    confirm() {
      document.body.classList.remove('modal-open')
      this.callback()
    },
    getScrollBarWidth(){
	  if (document.documentElement.scrollHeight <= document.documentElement.clientHeight) {
	    return 0
	  }
	  let inner = document.createElement('p')
	  inner.style.width = '100%'
	  inner.style.height = '200px'

	  let outer = document.createElement('div')
	  outer.style.position = 'absolute'
	  outer.style.top = '0px'
	  outer.style.left = '0px'
	  outer.style.visibility = 'hidden'
	  outer.style.width = '200px'
	  outer.style.height = '150px'
	  outer.style.overflow = 'hidden'
	  outer.appendChild(inner)

	  document.body.appendChild(outer)
	  let w1 = inner.offsetWidth
	  outer.style.overflow = 'scroll'
	  let w2 = inner.offsetWidth
	  if (w1 === w2) w2 = outer.clientWidth

	  document.body.removeChild(outer)

	  return (w1 - w2)
	},
	listen(target, eventType, callback) {
	    if (target.addEventListener) {
	      target.addEventListener(eventType, callback, false)
	      return {
	        remove() {
	          target.removeEventListener(eventType, callback, false)
	        }
	      }
	    } else if (target.attachEvent) {
	      target.attachEvent('on' + eventType, callback)
	      return {
	        remove() {
	          target.detachEvent('on' + eventType, callback)
	        }
	      }
	    }
	  }
  }
}
</script>
<style scoped>
.modal {
  transition: all 0.3s ease;
}

.modal.in {
  background-color: rgba(0, 0, 0, 0.5);
}

.modal.zoom .modal-dialog {
  -webkit-transform: scale(0.1);
  -moz-transform: scale(0.1);
  -ms-transform: scale(0.1);
  transform: scale(0.1);
  top: 300px;
  opacity: 0;
  -webkit-transition: all 0.3s;
  -moz-transition: all 0.3s;
  transition: all 0.3s;
}
.model-elg{
  width:90%;
}
.modal.zoom.in .modal-dialog {
  -webkit-transform: scale(1);
  -moz-transform: scale(1);
  -ms-transform: scale(1);
  transform: scale(1);
  -webkit-transform: translate3d(0, -300px, 0);
  transform: translate3d(0, -300px, 0);
  opacity: 1;
}
</style>
