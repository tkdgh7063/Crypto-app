import styled from "styled-components";
import Circle from "./Circle";

const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function App() {
  return (
    <Container>
      <Circle bgColor="turquoise" borderColor="white" />
      <Circle bgColor="tomato" text="TOMATO" />
    </Container>
  );
}

export default App;
