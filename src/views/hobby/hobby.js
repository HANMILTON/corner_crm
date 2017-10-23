const convertCaozuo = (val) => {
	return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='del'>删除</span>`	
}
export const hobbyOpts = {
	columns: [
	{
		th: '兴趣id',
		field: 'id'
	}, {
		th: '兴趣名称',
		field: 'hobby_name'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}