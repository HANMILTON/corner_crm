const convertCaozuo = (val) => {
	if(val == 0){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>上线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}else if(val == 1){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}
}
const convertType = (val) => {
	// console.log(val)
	switch(val){
		case "1":
			return `链接`
			break;
		case "2":
			return `文本`
			break;					
	}
}
export const bannerOpts = {
	columns: [{
		th: '编号',
		field: 'id'
	}, {
		th: '图片',
		field: 'banner_img',
		img: true
	}, {
		th: '标题',
		field: 'banner_title'
	}, {
		th: '类型',
		field: 'banner_type',
		convert: convertType
	}, {
		th: '操作',
		field: "is_online",
		convertDom: convertCaozuo
	}]
}