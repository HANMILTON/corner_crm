const convertCaozuo = () => {
	return "<span class='info-font cursor-pointer' data-type='detail'>查看</span>"
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
export const checkOpts = {
	columns: [{
		th: '提交时间',
		field: 'time_submit'
	}, {
		th: '餐厅名称',
		field: 'business_name'
	}, {
		th: '公司名称',
		field: 'company_name'
	}, {
		th: '审核进度',
		field: 'validate_status',
		convert: convertStatus
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}