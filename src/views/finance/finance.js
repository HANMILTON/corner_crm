const convertCaozuo = () => {
	return "<button class='info-font cursor-pointer' data-type='settlement'>结算</button>"
}
const convertType = (val) => {
	switch(val){
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
export const financeOpts = {
	columns: [{
		th: '餐厅',
		field: 'shop_name'
	}, {
		th: '消费时间',
		field: 'time_settlement_shop'
	}, {
		th: '消费类型',
		field: 'order_type',
		convert: convertType
	}, {
		th: '订单编号',
		field: 'order_number'
	}, {
		th: '消费金额',
		field: 'money_pay'
	}, {
		th: '结算金额',
		field: 'money_settlement'
	}, {
		th: '操作',
		convertDom: convertCaozuo
	}]
}
export const financeArr1 = [{
		th: '餐厅',
		field: 'shop_name',
		width: 160
	}, {
		th: '消费时间',
		field: 'time_settlement_shop',
		width: 180
	}]
export const financeArr2 = [{
		th: '订单编号',
		field: 'order_number',
		width: 210
	}, {
		th: '消费金额',
		field: 'money_pay',
		width: 100
	}, {
		th: '结算金额',
		field: 'money_settlement',
		width: 100
	}]