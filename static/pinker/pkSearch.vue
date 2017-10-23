<template>
  <div class="relative">
    <div class="search-box">
      <input @focus='showlist=true' v-model='keyword' type="text" class="form-control">
      <span @click="resetKeyword" class="reset">
          &times;
        </span>  
    </div>
    <div @click='showlist=false' v-if='showlist && keyword' class="list-group">
      <a @click='setKeyword(listItem)' href='javascript:;' class="list-group-item" v-for='listItem in filteredUsers'>{{listItem}}</a>
    </div>  
  </div>
</template>
<script>
export default {
  props: {
    list: {
      required: true
    },
    keyword: {
      type: String,
      required: true,
      twoWay: true
    }
  },
  data() {
    return {
      showlist: false
    }
  },
  computed: {
    filteredUsers: function () {
      var self = this
      return self.list.filter(function (user) {
        return user.indexOf(self.keyword) !== -1
      })
    }
  },  
  methods: {
    setKeyword(listItem) {
      this.keyword = listItem
      this.$emit("update:keyword",listItem)
    },
    resetKeyword() {
      this.keyword = ''
      this.$emit("update:keyword","")
    }
  }
}
</script>
<style scoped>
.relative{
/*  height: 34px;
  position: relative;
*/}

.list-group {
/*  position: absolute;
  z-index: 999;
  right: 0;
  top: 45px;*/
}
.list-group .list-group-item{
    font-size: 12px;
    padding: 5px;
}
.reset {
  cursor: pointer;
  position: absolute;
  right: 7px;
  top: 7px;
}
</style>
