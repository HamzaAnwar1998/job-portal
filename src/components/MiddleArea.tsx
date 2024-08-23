import { useState } from "react";
import "../styles/layout/MiddleArea.scss";
import Select from "react-select";
import Icon from "react-icons-kit";
import { basic_magnifier } from "react-icons-kit/linea/basic_magnifier";
import { basic_picture_multiple } from "react-icons-kit/linea/basic_picture_multiple";
import { basic_video } from "react-icons-kit/linea/basic_video";
import {
  CSSObjectWithLabel,
  components,
  ControlProps,
  GroupBase,
  Props as SelectProps,
} from "react-select";
import { MDBTable, MDBTableBody, MDBTableHead } from "mdb-react-ui-kit";
import "mdb-react-ui-kit/dist/css/mdb.min.css";
import data from "../data/data.json";
import Tippy from "@tippyjs/react";
import "tippy.js/dist/tippy.css";

function generateColors(length: number) {
  const colors = [];

  // Define the colors in the gradient
  const gradientColors = [
    "#34495e",
    "#9b59b6",
    "#3498db",
    "#62cb31",
    "#ffb606",
    "#e67e22",
    "#e74c3c",
    "#c0392b",
    "#175935",
    "#1f9d61",
    "#cc2473",
    "#d828c9",
    "#453095",
    "#9100ff",
    "#884a39",
    "#c38154",
  ];

  // Generate new colors after the eighth position
  const gradientLength = gradientColors.length;
  for (let i = 0; i < length; i++) {
    let color;
    if (i < gradientLength) {
      color = gradientColors[i];
    } else {
      // Generate a new color based on a pattern
      const colorIndex = i % gradientLength;
      const patternIndex = Math.floor(i / gradientLength) - 1;
      const patternColor = gradientColors[colorIndex];

      const patternColors = [
        "#212e48",
        "#800080",
        "#2d86ff",
        "#00d327",
        "#ffcb2b",
        "#ffa800",
        "#f25410",
        "#cd4c3a",
      ];

      const newColorIndex = patternIndex % patternColors.length;
      const newColor = patternColors[newColorIndex];

      // Combine the pattern color and new color
      color = mixColors(patternColor, newColor);
    }
    colors.push(color);
  }
  return colors;
}

// Helper function to mix two colors
function mixColors(color1: string, color2: string) {
  // Perform your logic to mix the colors
  // Here's a simple example that mixes the colors by averaging their RGB values
  const rgb1 = hexToRGB(color1);
  const rgb2 = hexToRGB(color2);

  const mixedColor = {
    r: Math.floor((rgb1.r + rgb2.r) / 2),
    g: Math.floor((rgb1.g + rgb2.g) / 2),
    b: Math.floor((rgb1.b + rgb2.b) / 2),
  };
  return rgbToHex(mixedColor);
}

// Helper function to convert hex color to RGB object
function hexToRGB(hex: string) {
  const r = parseInt(hex.slice(1, 3), 16);
  const g = parseInt(hex.slice(3, 5), 16);
  const b = parseInt(hex.slice(5, 7), 16);
  return { r, g, b };
}

// Helper function to convert RGB object to hex color
// eslint-disable-next-line @typescript-eslint/no-explicit-any
function rgbToHex(rgb: { r: any; g: any; b: any }) {
  const { r, g, b } = rgb;
  const hexR = r.toString(16).padStart(2, "0");
  const hexG = g.toString(16).padStart(2, "0");
  const hexB = b.toString(16).padStart(2, "0");
  return `#${hexR}${hexG}${hexB}`;
}

// Define the type for your options
interface OptionType {
  value: string;
  label: string;
}

// Custom Control component with typed props
const Control = (
  props: ControlProps<OptionType, false, GroupBase<OptionType>>
) => <components.Control {...props}>{props.children}</components.Control>;

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

const MiddleArea = () => {
  // select options
  const options = [
    { value: "anwarhamza919@gmail.com", label: "Hamza Anwar" },
    { value: "chocolate", label: "Chocolate" },
    { value: "strawberry", label: "Strawberry" },
    { value: "vanilla", label: "Vanilla" },
  ];

  // admin name
  const [admin, setAdmin] = useState("anwarhamza919@gmail.com");

  // progress bars colors
  const progressColors = generateColors(data.length);

  return (
    <div className="middle-area">
      <div className="middle-content flex-start">
        <nav className="w-full p-2 bg-white shadow-xl shadow-slate-200 flex flex-col xl:flex-row xl:items-center xl:justify-between">
          <div className="w-full flex flex-col xl:flex-row xl:items-center">
            <div className="w-full mb-2 xl:w-auto xl:!mb-0 xl:mr-2 xl:max-w-[250px]">
              <GoodSelect
                value={options.find((option) => option.value === admin)}
                onChange={(option) => setAdmin(option?.value ?? "")}
                options={options}
                styles={styles}
              />
            </div>
            <div className="w-full mb-2 xl:w-auto xl:!mb-0 xl:mr-2 xl:max-w-[250px]">
              <GoodSelect
                styles={styles}
                defaultValue={{ label: "Filter Here", value: "filter-here" }}
              />
            </div>
            <div className="w-full mb-0 xl:w-auto xl:mb-0 xl:mr-0 xl:max-w-[250px]">
              <GoodSelect
                styles={styles}
                defaultValue={{ label: "Filter Here", value: "filter-here" }}
              />
            </div>
          </div>
          <div className="search-container">
            <input type="text" placeholder="Search" className="search-input" />
            <span className="search-icon">
              <Icon icon={basic_magnifier} size={20} />
            </span>
          </div>
        </nav>

        {/* table */}
        <div className="custom-table">
          <MDBTable align="middle">
            <MDBTableHead className="!bg-white thead">
              <tr>
                <th scope="col">User</th>
                <th scope="col">Job Title</th>
                <th scope="col">Company Name</th>
                <th scope="col">Applied On</th>
                <th scope="col">Resume & Cover</th>
                <th scope="col">Admin</th>
                <th scope="col">Fail Reason</th>
                <th scope="col" className="text-right">
                  Actions
                </th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {data.map((item, index) => (
                <tr
                  key={index}
                  style={{
                    backgroundColor: index % 2 === 0 ? "#fafafa" : "#fff",
                  }}
                >
                  <td>
                    <div className="d-flex align-items-center">
                      <div
                        className="rounded-circle"
                        style={{
                          padding: "8px",
                          width: "50px",
                          height: "50px",
                          backgroundColor: progressColors[index],
                          color: "#fff",
                          letterSpacing: "0.09em",
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                          textAlign: "center",
                          fontSize: "18px",
                          fontWeight: "bold",
                        }}
                      >
                        {`${item.user.split(" ")[0][0]}${
                          item.user.split(" ")[1][0]
                        }`}
                      </div>
                      <div className="ms-3">
                        <p className="fw-bold mb-1">{item.user}</p>
                        <p className="text-muted mb-0">{item.email}</p>
                      </div>
                    </div>
                  </td>
                  <td>
                    <p className="text-base font-bold">{item.jobTitle}</p>
                  </td>
                  <td>
                    <p className="text-base">{item.companyName}</p>
                  </td>
                  <td>
                    <p className="text-base">{item.appliedOn}</p>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bg-green-500 text-white font-semibold py-2 px-4 rounded shadow hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      Click to view
                    </button>
                  </td>
                  <td>
                    <p
                      className="text-base"
                      style={{
                        color: item.admin === "Approved" ? "green" : "red",
                      }}
                    >
                      {item.admin}
                    </p>
                  </td>
                  <td>
                    <Tippy content={item.admin}>
                      <button
                        type="button"
                        className="bg-gray-200 text-black font-semibold py-2 px-4 rounded hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400"
                      >
                        Hover to view
                      </button>
                    </Tippy>
                  </td>
                  <td>
                    <button
                      type="button"
                      className="bg-gray-50 text-xs border border-slate-400 mr-1 text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <Icon
                        icon={basic_picture_multiple}
                        size={16}
                        className="mr-1"
                      />
                      Screenshot
                    </button>
                    <button
                      type="button"
                      className="bg-gray-50 text-xs border border-slate-400 text-black font-semibold py-2 px-4 rounded hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-green-400"
                    >
                      <Icon icon={basic_video} size={16} className="mr-1" />
                      Video
                    </button>
                  </td>
                </tr>
              ))}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </div>
  );
};

export default MiddleArea;
