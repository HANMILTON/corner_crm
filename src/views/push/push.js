const convertCaozuo = (val,status) => {
	if(val == 0){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>推送</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}else if(val == 1){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}
}
const convertType = (val) => {
	switch(val){
		case "1":
			return `标题`
			break;
		case "2":
			return `标题、详情`
			break;		
		case "3":
			return `标题、图片、详情`
			break;				
	}
}
export const pushOpts = {
	columns: [{
		th: '编号',
		field: 'id'
	}, {
		th: '推送时间',
		field: 'time_online'
	}, {
		th: '标题',
		field: 'title'
	}, {
		th: '类型',
		field: 'push_type_2',
		convert: convertType
	}, {
		th: '操作',
		field: "is_online",
		convertDom: convertCaozuo
	}]
}