import "../styles/layout/Layout.scss";
import Header from "./Header";
import MiddleArea from "./MiddleArea";
import Sidebar from "./Sidebar";

// define type for layout props
interface LayoutProps {
  sidebarToggled: boolean;
  setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Layout: React.FC<LayoutProps> = ({
  sidebarToggled,
  setSidebarToggled,
}) => {
  return (
    <div className="wrapper">
      <div className={`dashboard ${!sidebarToggled ? "toggled" : ""}`}>
        <Header
          sidebarToggled={sidebarToggled}
          setSidebarToggled={setSidebarToggled}
        />
        <div className="content-wrapper">
          <Sidebar sidebarToggled={sidebarToggled} />
          <MiddleArea />
        </div>
      </div>
    </div>
  );
};

export default Layout;
