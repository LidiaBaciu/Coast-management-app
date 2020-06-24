const localDataName = 'mateInvoice';
const orderStatusOptions = ['Solved', 'Unresolved'];
const columns = [
	{
		title: 'Id',
		dataIndex: 'id',
		rowKey: 'id',
	},
	{
		title: 'Description',
		dataIndex: 'description',
		rowKey: 'description',
	},
	{
		title: 'For buoy',
		dataIndex: 'buoyId',
		rowKey: 'buoyId',
	},
	/*
	{
		title: 'Reported by',
		dataIndex: 'username',
		rowKey: 'username',
	},*/
	{
		title: 'Timestamp',
		dataIndex: 'timestamp',
		rowKey: 'timestamp',
	},
];

export {
	columns,
	localDataName,
	orderStatusOptions,
};
