const convertCaozuo = (val) => {
	if(val == 0){
		return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>上线</span>`		
	}else{
		return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>`
	}

}
const convertStatus = (val) => {
	// console.log(val)
	switch(val){
		case "0":
			return `未审核`
			break;
		case "1":
			return `通过`
			break;
		case "2":
			return `未通过`
			break;						
	}
}
export const sceneOpts = {
	columns: [{
		th: '排序',
		field: 'sort'
	}, {
		th: '场景名称',
		field: 'scene_name'
	}, {
		th: '图片',
		field: 'scene_img',
		img: true
	}, {
		th: '置顶时间段',
		field: 'hour_suggest_str'
	}, {
		th: '操作',
		field:'is_online',
		convertDom: convertCaozuo
	}]
}