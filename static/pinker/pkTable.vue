<template>
  <div>
    <div :class="{'table-responsive':true,'nowrap':option.nowrap}">
      <table class="table table-hover table-bordered table-condensed">
        <tr class="table-head">
          <th v-for='col in option.columns' :class="['text-center',option.orderBy===col.field?'text-success':'text-info',]">
            {{col.th}}
          </th>
        </tr>
        <tbody>
          <tr v-for="row in data">
            <td valign="middle" v-for='col in option.columns' class="text-center">
              <div v-if='col.convertDom' @click='trclick($event,row)' v-html="col.convertDom(row[col.field])"></div>
              <div v-if='col.convert' v-html="col.convert(row[col.field])">
                <!-- {{col.convert(row[col.field])}} -->
              </div>
              <div v-if='col.merge' @click='trclick($event,row)' v-html="multiFields(row,col)"></div>
              <div v-if='col.analy' v-html="multiAnalys(row,col)"></div>
              <div v-if="col.img">
                <img :src="row[col.field]" height="50px">
              </div>
              <div v-if='!col.convertDom&& !col.cut && !col.convert && !col.merge && !col.img'>
                {{row[col.field]}}
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    data: {
      type: Array,
      required: true,
      coerce(val) {
        return val ? val : []
      }
    },
    option: {
      type: Object,
      required: true
    },
    searchField: String,
    searchValue: String,
  },
  data() {
    return {
      // startPage: 0,
      // pageCount: 15
    }
  },
  methods: {
    trclick($event, row) {
      // console.log($event)
      // let Event = new Vue();
      let type = $event.target.dataset.type
      if (type) this.$emit('trclick', $event, row, type)
    },
    multiFields(row, col) {
      if (col.field.indexOf('@') !== -1) { // 多字段拼接方法
        let fieldArr = col.field.split('@') // 字段分割
        let colArr = fieldArr.map((v) => row[v]) // 获取字段值
        return col.merge(...colArr) // 执行拼接回调
      } else {
        return row[col.field]
      }
    },
    multiAnalys(row, col) {
      if (col.field.indexOf('@') !== -1) { // 多字段拼接方法
        let fieldArr = col.field.split('@') // 字段分割
        let colArr = []
        colArr.push(row[fieldArr.shift()])
        colArr = colArr.concat(fieldArr)
        let dataObj = colArr[0]
        for(let i=1;i<colArr.length;i++){
          dataObj = dataObj[colArr[i]]
        }
        return dataObj // 执行拼接回调
      } else {
        return row[col.field]
      }
    }
  },
  // computed: {
  //   totalPage() { // 总页数计算
  //     return Math.ceil(this.data.length / this.pageCount)
  //   },
  // },
  // watch: {
  //   startPage(nowPage) { // 不能超限选取页码
  //     if (nowPage >= this.totalPage) this.startPage = this.totalPage - 1
  //     if (nowPage <= 0) this.startPage = 0
  //   },
  //   data(newData, oldData) {
  //     if (newData.length !== oldData.length) this.startPage = 0
  //   }
  // }
}
</script>
<style scoped>
.table-responsive{
  border-radius: 2px;
    /*overflow: hidden;*/
}
.table-head{
  background: #fafafa;
  border-right: 1px solid #ddd;
}
tr,th,td{
  white-space: nowrap;
  padding: 10px;
  color: grey;
}
.text-left{
  width: 200px;
  margin: 0 auto;
}
table .btn{
  border: none;
  color: #31708f;
  background: none;
}
th:last-of-type,td:last-of-type{
  border-right: 1px solid #ddd;
}
.text-center{
  padding: 10px;
  color: #1f2d3d;
  border-right: 1px solid transparent;
  vertical-align: middle;
  max-width: 100px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: initial;
}
tr:hover{
  background: #fafafa;
}
</style>
