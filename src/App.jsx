import Bar from "./components/Bar";
import BodyText from "./components/BodyText";
import Box from "@mui/material/Box";

function App() {
  return (
    <>
      <Box
        sx={{
          fontFamily: "Arial",
        }}
      >
        <Bar />
        <BodyText />
      </Box>
    </>
  );
}

export default App;
