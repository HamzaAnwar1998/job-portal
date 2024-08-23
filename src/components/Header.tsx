import { useState } from "react";
import "../styles/layout/Header.scss";
import { Icon } from "react-icons-kit";
import { menu } from "react-icons-kit/feather/menu";
import { basic_magnifier } from "react-icons-kit/linea/basic_magnifier";
import { user } from "react-icons-kit/feather/user";
import logo from "../assets/logo.png";
import Select from "react-select";
import {
  CSSObjectWithLabel,
  components,
  ControlProps,
  GroupBase,
  Props as SelectProps,
} from "react-select";

// Define the type for your options
interface OptionType {
  value: string;
  label: string;
}

// Custom Control component with typed props
const Control = (
  props: ControlProps<OptionType, false, GroupBase<OptionType>>
) => (
  <components.Control {...props}>
    <Icon
      icon={user}
      size={20}
      style={{
        paddingLeft: "8px",
        marginRight: "8px",
        color: "#3bb742",
      }}
    />
    {props.children}
  </components.Control>
);

// Type for GoodSelect using SelectProps
type GoodSelectProps = SelectProps<OptionType, false, GroupBase<OptionType>>;

// Select component using the custom Control
const GoodSelect = (props: GoodSelectProps) => (
  <Select {...props} components={{ Control }} />
);

// custom styles
const styles = {
  menuList: (base: CSSObjectWithLabel): CSSObjectWithLabel => ({
    ...base,

    "::-webkit-scrollbar": {
      width: "4px",
      height: "0px",
    },
    "::-webkit-scrollbar-track": {
      background: "#f1f1f1",
    },
    "::-webkit-scrollbar-thumb": {
      background: "#e1e1e9",
    },
    "::-webkit-scrollbar-thumb:hover": {
      background: "#b1b1b9",
    },
  }),
  control: (
    base: CSSObjectWithLabel,
    state: { isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...base,
    border: state.isFocused ? "1px solid #3bb742" : "1px solid #cccccc",
    boxShadow: state.isFocused ? "0px 0px 1px #3bb742" : "none",
    "&:hover": {
      border: "1px solid #3bb742",
      boxShadow: "0px 0px 1px #3bb742",
    },
  }),
  option: (
    base: CSSObjectWithLabel,
    { isSelected, isFocused }: { isSelected: boolean; isFocused: boolean }
  ): CSSObjectWithLabel => ({
    ...base,
    backgroundColor: isSelected
      ? "#3bb742"
      : isFocused
      ? "rgba(59, 183, 66, 0.2)"
      : base.backgroundColor,
    color: isSelected ? "white" : base.color,
    "&:active": {
      backgroundColor: isSelected ? "#3bb742" : "rgba(59, 183, 66, 0.2)",
    },
  }),
};

// define type for header props
interface HeaderProps {
  sidebarToggled: boolean;
  setSidebarToggled: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header: React.FC<HeaderProps> = ({
  sidebarToggled,
  setSidebarToggled,
}) => {
  // select options
  const options = [
    { value: "anwarhamza919@gmail.com", label: "Hamza Anwar" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // admin name
  const [admin, setAdmin] = useState("anwarhamza919@gmail.com");

  return (
    <header>
      <div className="header-leftside">
        <div className="header-logo">
          <img src={logo} alt="logo" />
        </div>

        <div
          className="header-menu-icon"
          onClick={() => setSidebarToggled(!sidebarToggled)}
        >
          <Icon icon={menu} size={14} />
        </div>

        <div className="search-container">
          <input type="text" placeholder="Search" className="search-input" />
          <span className="search-icon">
            <Icon icon={basic_magnifier} size={20} />
          </span>
        </div>
      </div>
      <div className="header-rightside">
        <div style={{ width: "200px", marginRight: "25px" }}>
          <GoodSelect
            value={options.find((option) => option.value === admin)}
            onChange={(option) => setAdmin(option?.value ?? "")}
            options={options}
            styles={styles}
          />
        </div>
      </div>
    </header>
  );
};

export default Header;
