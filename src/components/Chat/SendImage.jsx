import styled from "styled-components";

const SendImageStyle = styled.img`
  width: 273px;
  height: 100%;
  border-radius: 10px;
`;
export default function SendImage({ src }) {
  return <SendImageStyle src={src} alt="이미지" />;
}
