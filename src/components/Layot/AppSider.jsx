import { Layout, Card, Statistic, List, Typography, Spin, Tag } from "antd";
import { ArrowDownOutlined, ArrowUpOutlined } from "@ant-design/icons";

import { capitalize } from "./utils";
import { useContext } from "react";
import CryptoContext from "../../context/crypto-context";
const { Sider } = Layout;
const siderStyle = {
  textAlign: "center",
  lineHeight: "120px",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};

export default function AppSider() {
  const { loading, assets } = useContext(CryptoContext);
  return (
    <Sider width="25%" style={siderStyle}>
      {loading ? <Spin fullscreen /> : ""}
      {assets.map((asset) => (
        <Card key={asset.id} style={{ marginBottom: "1rem" }}>
          <Statistic
            title={capitalize(asset.id)}
            value={asset.totalAmount}
            precision={2}
            valueStyle={{
              color: asset.grow ? "#3f8600" : "red",
            }}
            prefix={asset.grow ? <ArrowUpOutlined /> : <ArrowDownOutlined />}
            suffix="$"
          />
          <List
            size="small"
            dataSource={[
              {
                title: "Total profit",
                value: asset.totalProfit,
                withTag: true,
              },
              { title: "Asset amount", value: asset.amount, isPlain: true },
              /* { title: "Difference", value: asset.growPercent }, */
            ]}
            renderItem={(item) => (
              <List.Item>
                <span>{item.title}</span>
                <span>
                  {item.withTag && (
                    <Tag color={asset.grow ? "green" : "red"}>
                      {asset.growPercent}%
                    </Tag>
                  )}
                </span>
                {item.isPlain ? (
                  <span>{item.value}</span>
                ) : (
                  <Typography.Text type={asset.grow ? "success" : "danger"}>
                    {item.value.toFixed(2)}$
                  </Typography.Text>
                )}
              </List.Item>
            )}
          />
        </Card>
      ))}
    </Sider>
  );
}
