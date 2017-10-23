const convertCaozuo = () => {
	return "<span class='info-font cursor-pointer' data-type='detail'>详细信息</span>"
}
const convertStatus = (val) =>{
	switch(val){
		case "1":
			return `未使用`
			break;
		case "2":
			return `已使用`
			break;						
	}
}
const convertName = (val) => {
	if(val){
		return val
	}else{
		return "未知"
	}
}
export const userOpts = {
	columns: [{
		th: '手机号',
		field: 'mobile'
	}, {
		th: '昵称',
		field: 'user_name',
		convert: convertName
	}, {
		th: '用户头像',
		field: 'user_header',
		img: true 		
	}, {
		th: '注册时间',
		field: 'time_register'
	}, {
		th: '最近登录',
		field: 'time_login'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}