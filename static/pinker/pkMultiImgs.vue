<template>
  <div class="pad">
    <div class="form-box">
      <div class="no-img" v-if="!imgs">点击左下角上传图片(可多选)</div>
      <div class="img-list" v-else>
        <div class="img-box" v-for="(img,index) in imgArr">
          <button @click="deleteImg(index)" class="del-btn btn btn-danger">&times;</button>
          <img :src="img">
        </div>
      </div>
    </div>
    <form id="form-0">
      <input class="upload" @change="fileChange($event)" type="file" name="file" id="file" multiple="" value="">
      <label for="file" class="label"></label>
    </form>
    <button @click="deleteAll" class="del-all btn btn-danger">删除全部</button>
  </div>
</template>
<style scoped>
  .pad{
    padding: 10px;
    position: relative;
  }
  .form-box{
    min-height: 100px;
    overflow: hidden;
    margin-bottom: 10px;
  }
  .no-img{
    height: 100px;
    line-height: 100px;
    color: #666666;
    text-align: center;
  }
  .img-box{
    float:left;
    position: relative;
  }
  .img-box:hover > .del-btn{
    display: block;
  }
  .del-btn{
    display: none;
    position: absolute;
    right: 0;
    top:0;
    width: 20px;
    height: 20px;
    font-size: 18px;
    line-height: 20px; 
    padding: 0;
    text-align: center;    
  }
  .img-list img{
    height: 80px;
    margin: 3px;
  }
  form{
    width: 50px;
    height: 50px;
  }
  .upload{
    display: none;
  }
  .label{
    display: block;
    width: 50px;
    height: 50px;
    background: url(add-img.png) no-repeat;
    background-size: cover;
    cursor: pointer;
  }
  .del-all{
    position: absolute;
    right: 10px;
    bottom: 10px;
  }
</style>
<script>
import {
  pkFetch
} from '../api/pkFetch'
const {
  uploadServer
} = window.config
export default {
  props: {
    imgs: {
      twoWay: true,
      required: true
    },
  },
  data() {
    return {
      imgArr:this.imgs && this.imgs.split(","),
      fileId: "file"+Math.floor(Math.random()*1000),
      uploadServer,
      user_id: sessionStorage.getItem("user_id"),
      upload_validate_str: sessionStorage.getItem("upload_validate_str")
    }
  },
  methods: {
    fileChange(e) {
      // return console.log(e.target.files)
      let imgs = Array.prototype.slice.call(e.target.files)
      console.log(imgs)
      let len = imgs.length
      if(this.imgArr.length + len > 9){
        return alert("图片最多上传9张,请重新上传")
      }
      let that = this
      let imgRanderIndex = 0;
      imgs.forEach(function(file){
        let reader = new window.FileReader()
        reader.readAsDataURL(file)
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
            formData.append("file",file)
            formData.append("user_type","admin")
            formData.append("user_id",that.user_id)
            formData.append("upload_validate_str",that.upload_validate_str)
            that.upload(formData)          
          }
        }
      })
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
    deleteImg(index){
      this.imgArr.splice(index,1)
      let imgs = this.imgArr.join(",")
      this.$emit("update:imgs",imgs)
    },
    deleteAll(){
      this.imgArr = []
      this.$emit("update:imgs","")
    },
    upload(formData) {
      console.log(formData)
      pkFetch.postFile(this.uploadServer, formData)
      .then(res => this.uploadSuccess(res))
    },
    uploadSuccess(res){
      if(res.code==200){
        this.imgArr.push(res.data)    
        let imgs = this.imgArr.join(",")
        this.$emit("update:imgs",imgs)
      }
    }
  }
}
</script>
