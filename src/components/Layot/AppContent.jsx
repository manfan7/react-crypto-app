import { Layout, Typography } from "antd";
import { useCrypto } from "../../context/crypto-context";
import PortfolioChart from "./PortfolioChart";
import AssetsTable from "./AssetsTable";

const { Content } = Layout;
const contentStyle = {
  textAlign: "center",
  minHeight: "calc(100vh - 60px)",
  color: "#fff",
  backgroundColor: "#001529",
  padding: "1rem",
};
export default function AppContent() {
  const { crypto, assets } = useCrypto();

  return (
    <Content style={contentStyle}>
      <Typography.Title level={3} style={{ color: "white", textAlign: "left" }}>
        Portfolio:
        {assets
          .map((asset) => {
            const coin = crypto.find((c) => c.id === asset.id);
            return asset.amount * coin.price;
          })
          .reduce((acc, val) => (acc += val), 0)
          .toFixed(2)}
        $
      </Typography.Title>
      <PortfolioChart />
      <AssetsTable />
    </Content>
  );
}
