<template>
  <div v-if='show' transition='expand' :class="['expand-transition','alert', 'alert-'+theme]">
    {{msg}}
    <i @click='show=false' class="close">&times;</i>
  </div>
</template>
<script>
export default {
  props: {
    theme: {
      type: String,
      default: 'success'
    },
    msg: {
      type: String,
      required: true
    },
    show: {
      type: Boolean,
      twoWay: true,
      default: false
    },
    closeTime: {
      type: Number,
      default: 2000
    }
  },
  watch: {
    show(val) {
      if (val) {
        setTimeout(() => {
          // this.show = false
          this.$emit("update:show",false)
        }, this.closeTime)
      }
    }
  }
}
</script>
<style scoped>
.alert {
  width: 300px;
  height: 50px;
  line-height: 40px;
  position: fixed;
  z-index: 9999;
  left: 0;right: 0;top:0;bottom:0;
  margin: auto;
  padding: 5px;
}

.expand-transition {
  transition: all .3s ease;
  opacity: 0.9;
}

.expand-enter,
.expand-leave {
  opacity: 0;
  width: 0;
}
</style>
