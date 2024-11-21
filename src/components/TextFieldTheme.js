// theme.js
import { createTheme } from "@mui/material/styles";

const TextFieldtheme = createTheme({
  components: {
    MuiTextField: {
      styleOverrides: {
        root: {
          "& .MuiOutlinedInput-root": {
            "& fieldset": {
              borderColor: "rgba(138, 43, 226, 0.8)", // Violet border color
            },
            "&:hover fieldset": {
              borderColor: "#7b1fa2", // Darker violet on hover
            },
            "&.Mui-focused fieldset": {
              borderColor: "#9c27b0", // Bright violet when focused
              borderWidth: 2, // Thicker border when focused
            },
          },
          "& .MuiInputLabel-root": {
            color: "#9c27b0", // Violet label color
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#7b1fa2", // Darker violet when label is focused
          },
          "& .MuiOutlinedInput-input": {
            padding: "12px 14px", // Custom padding for input text
          },
        },
      },
    },
  },
});

export default TextFieldtheme;