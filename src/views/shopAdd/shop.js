const convertCaozuo = (val) => {
	if(val == 0){
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='up'>上线</span>"
	}else{
		return "<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='down'>下线</span>"
	}
	
}
const mergeName = (email,mobile) => {
	return email || mobile
}
export const shopOpts = {
	columns: [{
		th: '编号',
		field: 'id'
	}, {
		th: '商家名称',
		field: 'shop_name'
	}, {
		th: '用户名',
		field: 'shop_user_e_mail@shop_user_mobile',
		merge: mergeName
	}, {
		th: '地址',
		field: 'address'
	}, {
		th: '操作',
		field: 'is_online',
		convertDom: convertCaozuo
	}]
}