<template>
  <div>
    <div class="col-sm-12 pad-no" @mouseenter.stop="img ? showMask=true : ''" @mouseleave.stop="img ? showMask=false : ''">
      <form :class="sizeCls" :id="'form'+fileId">
        <input type="file" @change='fileChange($event)' :id='fileId' name="file" class="jofile">
        <img class="upload-img" v-if="img" :src="img">
        <label v-else class="prompt" :for="fileId">
          <div class="prompt-logo"><img src="./prompt-logo.png"></div>
          <div class="prompt-text">点击上传图片</div>
        </label>
      </form>
      <div class="mask" v-if="showMask">
          <button @click="deleteImg" class="del-btn btn btn-danger">&times;</button>
      </div>
    </div>
  </div>
</template>
<script>
import {
  pkFetch
} from '../api/pkFetch'
const {
  uploadServer
} = window.config
export default {
  props: {
    img: {
      twoWay: true,
      required: true
    },
    size:{
      type: String,
      default: "normal"
    }
  },
  data() {
    return {
      file: {},
      showMask:false,
      // doUpload:false,
      fileId: "file"+Math.floor(Math.random()*1000),
      formData:{},
      uploadServer,
      user_id: sessionStorage.getItem("user_id"),
      upload_validate_str: sessionStorage.getItem("upload_validate_str")
    }
  },
  computed: {
    sizeCls() {
      let height = this.img ? " no-height" : ""
      return this.size + "-upload" + height
      // return ['pk-group', this.size ? `pk-group-${this.size}` : '']
    }
  },
  methods: {
    fileChange(e) {
      let file = e.target.files[0]     
      let reader = new window.FileReader()
      reader.readAsDataURL(file)
      let that = this
      reader.onload = () => {
        this.file = {
          imgFile: file,
          imgBase64: reader.result,
          uploaded: false
        }
        if(file.size > 200000){
            let img = document.createElement("img")
            img.src = reader.result
            img.onload=function(){
              let imgBase64 = that.getCanvasStr(img)
              that.uploadBaseStr(imgBase64)
            }
        } else{
          let formData = new FormData()
          formData.append("file",file)
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
    deleteImg(){
        this.img = "" 
        this.showMask=false
        this.$emit('update:img',"")
    },
    upload(formData) {
      console.log(formData)
      pkFetch.postFile(this.uploadServer, formData)
      .then(res => this.uploadSuccess(res))
    },
    uploadSuccess(res){
      if(res.code==200){
        this.$emit('update:img', res.data)
        this.img = res.data     
      }
    }
  }
}
</script>
<style scoped>
.pad-no{
  padding: 10px;
  position: relative;
}
.normal-upload,.small-upload,.width-upload{
  position: relative;
  cursor: pointer;
  min-height: 140px;
  text-align: left;
}
.normal-upload .upload-img{
  max-height: 200px;
  max-width: 100%;
}
.width-upload .upload-img{
  width: 100%;
}
.small-upload .upload-img{
  width: 100px;
  height: 100px;
/*  position: absolute;
  top:0;bottom: 0;
  margin: auto; */ 
}
.no-height{
  min-height: 0;
}
.prompt{
  height: 50px;
  text-align: center;
  position: absolute;
  top:0;left:0;right: 0;bottom: 0;
  margin: auto;
  cursor: pointer;
}
.prompt-text{
  padding-top: 10px;
  color: grey;
}
.mask{
  width: 100%;
  height: 100%;
  background: rgba(0,0,0,.3);
  position: absolute;
  top:0;left: 0;
}
.close{
  width: 20px;text-align: center;
  position: absolute;
  top:2px;
  right:2px;
  color: red;
}
.jofile {
  display: none;
}
.img-wrap {
  position: relative;
  display: inline-block;
  margin: 20px 2px;
  box-shadow: 2px 2px 10px #666;
}
.del-btn {
  width: 20px;
  height: 20px;
  font-size: 18px;
  line-height: 20px; 
  padding: 0;
  text-align: center;
  position: absolute;
  right: 1%;
  top: 1%;
}
</style>
