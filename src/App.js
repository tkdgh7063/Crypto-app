import styled, { keyframes } from "styled-components";

const Wrapper = styled.div`
  display: flex;
  height: 100vh;
  width: 100vw;
  justify-content: center;
  align-items: center;
`;

const rotationAnimation = keyframes`
  0% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
  50% {
    transform: rotate(360deg);
    border-radius: 100px;
  }
  100% {
    transform: rotate(0deg);
    border-radius: 0px;
  }
`;

const Text = styled.span`
  color: white;
  font-weight: 400;
`;

const Box = styled.div`
  background-color: ${(props) => props.bgColor};
  width: 100px;
  height: 100px;
  display: flex;
  justify-content: center;
  align-items: center;
  animation: ${rotationAnimation} 1.5s linear infinite;
  ${Text} {
    &:hover {
      font-weight: 800;
    }
    &:active {
      opacity: 0;
    }
  }
`;

const Circle = styled(Box)`
  border-radius: 50px;
`;

const Btn = styled.button`
  background-color: tomato;
  border: 0;
  border-radius: 15px;
  color: white;
`;

const Input = styled.input.attrs({
  required: true,
  minLength: 4,
  maxLength: 8,
})`
  background-color: turquoise;
`;

function App() {
  return (
    <Wrapper>
      <Box bgColor="teal">
        <Text>HI IM BOX</Text>
      </Box>
      <Circle bgColor="tomato">
        <span>HI IM CIRCLE</span>
      </Circle>
      <Btn>Log In</Btn>
      <Btn as="a" href="/">
        Log In
      </Btn>
      <Input />
      <Input />
      <Input />
      <Input />
      <Input />
    </Wrapper>
  );
}

export default App;
