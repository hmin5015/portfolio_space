import { styled } from "styled-components";

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: calc(100% - 95px);
  text-align: center;
`;

export const NotFound = () => {
  return (
    <Container>
      404
      <br />
      NOT FOUND
    </Container>
  );
};
