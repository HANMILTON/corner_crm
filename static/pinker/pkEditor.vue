<template>
	<div>
		<div id="summernote"></div>
	</div>
</template>
<script>
	import {
	  pkFetch
	} from '../api/pkFetch'
	const {
	  uploadServer
	} = window.config
	export default{
		props:["html"],
		data(){
			return{
				uploadServer,
      			user_id: sessionStorage.getItem("user_id"),
      			upload_validate_str: sessionStorage.getItem("upload_validate_str")				
			}
		},
		methods:{
			sendFile(file){
		      let reader = new window.FileReader()
		      reader.readAsDataURL(file)
		      let that = this
		      reader.onload = () => {
		        if(file.size > 200000){
		            let img = document.createElement("img")
		            img.src = reader.result
		            img.onload=function(){
		              let imgBase64 = that.getCanvasStr(img)
		              that.uploadBaseStr(imgBase64)
		            }
		        } else{
		          let formData = new FormData()
		          formData.append("file", file)
         		  formData.append("user_type","admin")
          		  formData.append("user_id",this.user_id)
          		  formData.append("upload_validate_str",this.upload_validate_str)		          
		          this.upload(formData)          
		        }
		      }
			},
		    //图片压缩技术
		    getCanvasStr(img){
		      let standardWidth = 750
		      let rate = img.width<=750 ? 1 : img.width/750
		      let canvasWidth = img.width/rate
		      let canvasHeight = img.height/rate
		      let canvas = document.createElement("canvas")
		      canvas.width = canvasWidth
		      canvas.height = canvasHeight
		      let tmpCtx = canvas.getContext("2d")
		      tmpCtx.fillStyle = "#fff";
		      tmpCtx.drawImage(img,0,0,img.width,img.height,0,0,canvas.width,canvas.height)
		      let canvasStr = canvas.toDataURL("image/jpeg", 0.8)
		      console.log(canvasStr.length)
		      return canvasStr;
		    },  
		    //将图片转化为blob对象,上传到服务器
		    uploadBaseStr(imgBase64){
		      let $Blob= this.getBlobBydataURI(imgBase64,'image/jpeg');  
		      let formData = new FormData();  
		      formData.append("file", $Blob ,"file_"+Date.parse(new Date())+".jpeg");  
		       formData.append("user_type","admin")
          	formData.append("user_id",this.user_id)
          		formData.append("upload_validate_str",this.upload_validate_str)	    
		      this.upload(formData)
		    }, 
		    //获取blob对象
		    getBlobBydataURI(dataURI,type) {  
		        let binary = atob(dataURI.split(',')[1]);  
		        let array = [];  
		        for(let i = 0; i < binary.length; i++) {  
		            array.push(binary.charCodeAt(i));  
		        }  
		        return new Blob([new Uint8Array(array)], {type:type });  
		    },	
		    upload(formData) {
		      pkFetch.postFile(this.uploadServer, formData)
		      .then(res => this.uploadSuccess(res))
		    },		
		    uploadSuccess(res){
		      if(res.code==200){
   				$('#summernote').summernote('insertImage', res.data);
		      }
		    }		        		
		},
		mounted(){
			var that =this
		  $('#summernote').summernote({
		  	lang: 'zh-CN',
		  	placeholder: 'write here...',
			  toolbar: [
			    ['font', ['fontname','color','bold', 'italic', 'underline','strikethrough', 'superscript', 'subscript', 'clear']],
			    ['fontsize',['fontsize']],
			    ['para', ['ul', 'ol', 'paragraph','height']],
			    ['insert', ['picture','link','video','table','hr']],
			   	['misc',['fullscreen', 'codeview', 'undo','redo','help']]
			  ],
		  	callbacks:{
			  	onImageUpload: function(files){
			  		that.sendFile(files[0])
			  	},
			  	onChange: function(contents){
			  		if(contents.indexOf("viewport") == -1){
			  			contents += "<head><meta charset='utf-8'><title>corner-crm</title><meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' /></head><style>body{margin:8px;-webkit-overflow-scrolling: touch;}p{margin:0;padding:0}body img{max-width:100%}</style>"
			  		}
			  		that.$emit("update:html",contents)
			  	}
		  	},
		  	minHeight:50
		  })
		  $('#summernote').summernote('code', that.html)
		$(".note-image-input").attr("accept","image/jpg,image/jpeg,image/gif,image/png")
		}
	}	
</script>
