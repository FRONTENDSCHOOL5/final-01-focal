import styled from "styled-components";

const ReceiveImagesStyle = styled.img`
  width: 273px;
  height: 100%;
  border-radius: 10px;
`;
export default function ReceiveImage({ src }) {
  return <ReceiveImagesStyle src={src} alt="이미지" />;
}
