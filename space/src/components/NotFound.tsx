import { styled } from "styled-components";

const Container = styled.div`
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
