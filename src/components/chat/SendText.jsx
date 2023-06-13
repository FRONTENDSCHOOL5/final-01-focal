import styled from "styled-components";

const SentTextStyle = styled.p`
  max-width: 240px;
  background-color: #f26e22;
  border-radius: 10px 0px 10px 10px;
  padding: 12px;
  color: #fff;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export default function SendText({ message }) {
  return <SentTextStyle>{message}</SentTextStyle>;
}
