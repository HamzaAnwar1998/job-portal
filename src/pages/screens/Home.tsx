import Layout from "../../components/Layout";

// define type for props
interface HomeProps {
  sidebarToggled: boolean;
  setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Home: React.FC<HomeProps> = ({ sidebarToggled, setSidebarToggled }) => {
  return (
    <>
      <Layout
        sidebarToggled={sidebarToggled}
        setSidebarToggled={setSidebarToggled}
      />
    </>
  );
};

export default Home;
