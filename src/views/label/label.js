
const convertCaozuo = () => {
	return `<span class='success-font cursor-pointer' data-type='edit'>编辑</span>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<span class='info-font cursor-pointer' data-type='evaluate'>评价</span>`
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
const mergeName = (name,level) => {
	let str = ""
	for(let i=1;i<level;i++){
		str += "----------"
	}
	// console.log(name,level)
	if(level == 1){
		return "<div class='text-left'>" + name + "<button class='btn btn-xs btn-default' data-type='add'>+</button></div>"
	}else{
		str
		return "<div class='text-left'> "+str+">" + name + "<button class='btn btn-xs btn-default' data-type='add'>+</button></div>"
	}
}
export const labelOpts = {
	columns: [{
		th: 'id',
		field: 'id'
	}, {
		th: '标签名称',
		field: 'category_name@level',
		merge: mergeName
	}, {
		th: '分类级别',
		field: 'level'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}