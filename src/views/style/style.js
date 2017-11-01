const convertCaozuo = (val) => {
	return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='danger-font cursor-pointer' data-type='del'>删除</span>`	
}
export const styleOpts = {
	columns: [
	{
		th: '风格id',
		field: 'id'
	}, {
		th: '风格名称',
		field: 'style_name'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}