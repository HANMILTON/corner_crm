const convertCaozuo = () => {
	return "<button class='btn btn-xs btn-default' data-type='detail'>退款</button>"
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
const mergeTime = (date,time) =>{
	var date = date.split(" ")[0]
	return date+ " " + time
}
const convertType = (type) => {
	switch(type){
		case "1":
			return "套餐订单"
			break;
		case "2":
			return "买单订单"
			break;
		case "3":
			return "预约订单"
			break;						
	}
}
export const orderOpts0 = {
	columns: [{
		th: '买单时间',
		field: 'time_pay'
	}, {
		th: '餐厅',
		field: 'shop_detail_info@shop_name',
		analy:true
	}, {
		th: '订单类型',
		field: 'order_type',
		convert: convertType
	}, {
		th: 'app用户',
		field: 'app_user_name'
	}, {
		th: 'app用户手机号',
		field: 'mobile'
	}, {
		th: '应付(元)',
		field: 'amount'
	}, {
		th: '实付(元)',
		field: 'money_pay'
	}]
}
export const orderOpts1 = {
	columns: [{
		th: '下单时间',
		field: 'time_add'
	}, {
		th: '餐厅',
		field: 'shop_detail_info@shop_name',
		analy:true
	}, {
		th: '套餐',
		field: 'order_item@0@goods_name',
		analy:true
	}, {
		th: '数量',
		field: 'order_item@0@num',
		analy:true
	}, {
		th: '应付(元)',
		field: 'amount'
	}, {
		th: '实付(元)',
		field: 'money_pay'
	}, {
		th: '状态',
		field: 'status',
		convert: convertStatus
	}, {
		th: 'find码',
		field: 'find_code'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}
export const orderOpts2 = {
	columns: [{
		th: '买单时间',
		field: 'time_pay'
	}, {
		th: '餐厅',
		field: 'shop_detail_info@shop_name',
		analy:true
	}, {
		th: 'app用户',
		field: 'app_user_name'
	}, {
		th: 'app用户手机号',
		field: 'mobile'
	}, {
		th: '应付(元)',
		field: 'amount'
	}, {
		th: '实付(元)',
		field: 'money_pay'
	}]
}
export const orderOpts3 = {
	columns: [{
		th: '下单时间',
		field: 'time_add'
	}, {
		th: '餐厅',
		field: 'shop_detail_info@shop_name',
		analy:true
	}, {
		th: 'app用户',
		field: 'app_user_name'
	}, {
		th: 'app用户手机号',
		field: 'reserve_mobile'
	}, {
		th: '预约时间',
		field: 'time_start@reserve_time',
		merge: mergeTime
	}, {
		th: '人数',
		field: 'reserve_people'
	}, {
		th: '应付(元)',
		field: 'amount'
	}, {
		th: '支付(元)',
		field: 'money_pay'
	}, {
		th: '操作',
		field: 'reserve_status',
		convertDom: convertCaozuo
	}]
};