const convertCaozuo = (val) => {
	if(val == 0){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>上线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}else{
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='delete'>删除</span>"
	}
	
}
export const shopOpts = {
	columns: [{
		th: '编号',
		field: 'id'
	}, {
		th: '商家名称',
		field: 'shop_name'
	}, {
		th: '地址',
		field: 'address'
	}, {
		th: '操作',
		field: 'is_online',
		convertDom: convertCaozuo
	}]
}