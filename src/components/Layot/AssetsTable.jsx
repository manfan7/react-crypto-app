import { Table } from "antd";
import { useCrypto } from "../../context/crypto-context";
const columns = [
  {
    title: "Name",
    dataIndex: "name",

    // specify the condition of filtering result
    // here is that finding the name started with `value`

    sorter: (a, b) => a.name.length - b.name.length,
    sortDirections: ["descend"],
  },
  {
    title: "Price, $",
    dataIndex: "price",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.price - b.price,
  },
  {
    title: "Amount",
    dataIndex: "amount",
    defaultSortOrder: "descend",
    sorter: (a, b) => a.amount - b.amount,
  },
];

export default function AssetsTable() {
  const { assets } = useCrypto();
  const data = assets.map((a) => ({
    key: a.id,
    name: a.id,
    price: a.price,
    amount: a.amount,
  }));
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  return (
    <Table
      pagination={false}
      columns={columns}
      dataSource={data}
      onChange={onChange}
    />
  );
}
