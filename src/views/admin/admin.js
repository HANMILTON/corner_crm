const convertCaozuo = (val) => {
	return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>`	
}
export const adminOpts = {
	columns: [
	{
		th: '账号id',
		field: 'id'
	}, {
		th: '账号呢称',
		field: 'nick_name'
	}, {
		th: '登录账号',
		field: 'user_name'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}