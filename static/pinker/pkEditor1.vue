<template>
	<div>
		<quill-editor ref="myTextEditor"
      v-model="html"
      :options="editorOption"
      @change="onEditorChange($event)">
	</quill-editor>
	<form action="" method="post" enctype="multipart/form-data" id="uploadFormMulti">
	 <input style="display: none" id="uniqueId" type="file" name="file" multiple accept="image/jpg,image/jpeg,image/png,image/gif" @change="uploadImg">
	 </form>
	</div>	
</template>
<script>
import {
  pkFetch
} from '../api/pkFetch'
const {
  uploadServer
} = window.config

import { quillEditor } from 'vue-quill-editor'
import Quill from 'quill'
import { ImageResize } from './ImageResize.js'
Quill.register('modules/imageResize', ImageResize)
	export default{
		props:["html"],
		components:{
			quillEditor
		},
		data(){
			return {
				imgUrl:"",
				showImg:false,
				selectText:"",
				baseOffset: 0 ,
				focusOffset: 0,
				fontColor: "#000000",
				fontBgColor: "#cccccc",
				uploadServer,
				ImageResize,
				theme: 'snow',
				editorOption:{
					 modules: {
			            imageResize: {
			              displaySize: true
			            }
					}
				}
			}
		},
		methods:{
		    onEditorChange({ editor, html, text }) {
		      // console.log('editor change!', editor, html, text)
		      // console.log(this.html)
		      this.$emit("update:html",html)
		    },
		    uploadImg(){
		      var formData = new FormData(document.getElementById('uploadFormMulti'))
		      pkFetch.postFile(this.uploadServer, formData)
		      .then(res => this.uploadSuccess(res))
		    },
		    uploadSuccess(data){
		    	var url = data.data
		    	var vm = this
		    	if (url != null && url.length > 0) {
				   var value = url
				   vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
				   value = value.indexOf('http') != -1 ? value : 'http:' + value
				   vm.$refs.myTextEditor.quill.insertEmbed(vm.addImgRange != null?vm.addImgRange.index:0, 'image', value, Quill.sources.USER)
				  } else {
				   vm.$message.warning("图片增加失败")
				  }
				}
		    
		},

		mounted(){
			var vm =this
			// console.dir(new ImageResize())
			var imgHandler = async function(state) {
			vm.addImgRange = vm.$refs.myTextEditor.quill.getSelection()
			if (state) {
			  var fileInput = document.getElementById("uniqueId") //隐藏的file文本ID
			  fileInput.click() //加一个触发事件
			}
			}
			vm.$refs.myTextEditor.quill.getModule("toolbar").addHandler("image", imgHandler)

		}
	}
</script>
