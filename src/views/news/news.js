
const convertCaozuo = (type,status) => {
	if(type == 1 || type == 2){
		if(status == 0){
			return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>上线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>`			
		}else{
			return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>`	
		}
	}else{
		return `<span class='success-font cursor-pointer' data-type='edit'>查看</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='delete'>删除</span>`
	}

}

const convertType = (type) => {
	switch(type){
		case '1':
		 return "商家"
		 break;
		case '2':
		 return "管理员"
		 break;
		case '3':
		 return "订单评论"
		 break;
		case '4':
		 return "朋友圈"
		 break;		 		 		 
	}
}
const mergeContent = (type,text,detail) => {
	if(type == 1 || type == 2){
		return text
	}else{
		return detail[0].text
	}
}
const mergeImg = (type,img,detail) => {
	if(type == 1 || type == 2){
		if(!img) return ""
		var imgArr = img.split(",")
	}else{
		if(!detail[0].images) return ""
		var imgArr = detail[0].images.split(",")
	}
	let str = ""
	for(let i=0;i<imgArr.length;i++){
		str += "<img height='60px' src = '"+imgArr[i]+"'/> "
	}
	return str
}
export const newsOpts = {
	columns: [{
		th: 'id',
		field: 'id'
	}, {
		th: '发布时间',
		field: 'time_add'
	}, {
		th: '发布人',
		field: 'name',
	}, {
		th: '消息内容',
		field: 'news_type@description@detail',
		merge: mergeContent
	}, {
		th: '消息图片',
		field: 'news_type@img@detail',
		merge: mergeImg			
	}, {
		th: '消息类型',
		field: 'news_type',
		convert: convertType
	}, {
		th: '操作',
		field: "news_type@is_online",
		merge: convertCaozuo
	}]
}