import styled from 'styled-components';

const ReceiveTextStyle = styled.p`
  border: 1px solid var(--light-gray);
  max-width: 240px;
  background-color: var(--white);
  border-radius: 5px;
  padding: 12px;
  border-radius: 0px 10px 10px 10px;
  font-weight: 400;
  font-size: 14px;
  line-height: 18px;
`;

export default function ReceiveText({ message }) {
  return <ReceiveTextStyle>{message}</ReceiveTextStyle>;
}
