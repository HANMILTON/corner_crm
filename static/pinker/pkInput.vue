<template>
  <div :class="colArr">
    <div :class="sizeCls">
    <!-- {{data|json}} -->
      <span class="pk-group-addon">
          <span v-if='label'>{{label}}</span>
          <span v-if='data'>{{data.key}}</span>
      <slot name='label'></slot>
      </span>
      <slot></slot>
      <span v-if='after' class="pk-group-addon">{{after}}</span>
      <slot name='after'></slot>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    label: String,
    after: String,
    xs: {
      type: String,
      default: '12'
    },
    data:Object,
    sm: String,
    md: String,
    lg: String,
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    xsNum() {
      return this.xs ? `col-xs-${this.xs}`.trim() : ''
    },
    smNum() {
      return this.sm ? `col-sm-${this.sm}`.trim() : ''
    },
    mdNum() {
      return this.md ? `col-md-${this.md}`.trim() : ''
    },
    lgNum() {
      return this.lg ? `col-lg-${this.lg}`.trim() : ''
    },
    colArr() {
      return [this.xsNum, this.smNum, this.mdNum, this.lgNum]
    },
    sizeCls() {
      return ['pk-group', this.size ? `pk-group-${this.size}` : '']
    }
  }
}
</script>
<style scoped>
  .pk-group{
    width: 100%;
    margin: 3px 0;
    position: relative;
    display: table;
    border-collapse: separate;
  }
  .pk-group-addon{
    width: 100px;
    display: table-cell;
    padding: 6px 0px;
    font-size: 14px;
    font-weight: 400;
    line-height: 1;
    vertical-align: middle;
    color: #555;
    text-align: left;
    /* background-color: #eee; */
    /* border: 1px solid #ccc; */
    border-radius: 4px;
  }
</style>
