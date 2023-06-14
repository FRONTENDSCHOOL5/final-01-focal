import styled from 'styled-components';
import ImageSrc from '../../assets/images/basic-profile-s.png';
import ImageSrc2 from '../../assets/images/profile-upload.png';

const PostMainStyle = styled.main`
  display: flex;
  padding: 20px 0 20px 16px;
  min-width: 390px;
  width: 100%;
  height: 100vh;
  background-color: #fff;
  margin-top: 48px;
`;

const UploadImageStyle = styled.img`
  width: 42px;
  height: 42px;
  border-radius: 50%;
  margin-right: 12px;
  border: 0.5px solid var(--border-color);
`;

const PostWriteStyle = styled.article`
  position: relative;
  min-width: 300px;
  width: 100%;
  padding-right: 16px;
  overflow-y: scroll;
`;

const PostFormStyle = styled.form`
  width: 100%;
  height: 100%;
  padding-top: 12px;

  textarea {
    width: 100%;
    height: 100%;
    margin-bottom: 16px;
    font-weight: 400;
    font-size: 14px;
    line-height: 18px;
    //textarea 속성 초기화
    border: none;
    outline: none;
    padding: 0;
    background: transparent;
    resize: none;
    box-shadow: none;
    font-family: inherit;
    font-size: inherit;
    margin: 0;
  }
  .upload-btn {
    position: fixed;
    bottom: 16px;
    right: 16px;
    width: 50px;
    height: 50px;
    background-image: url(${ImageSrc2});
    background-position: center;
    background-size: cover;
    cursor: pointer;
    z-index: 100;
  }
`;

function PostUpload() {
  return (
    <PostMainStyle>
      <h2 className="a11y-hidden">게시글 작성</h2>
      <UploadImageStyle src={ImageSrc} alt="사용자이미지" />
      <PostWriteStyle>
        <h3 className="a11y-hidden">게시글 작성</h3>
        <PostFormStyle>
          <textarea
            name="text"
            placeholder="게시글 입력하기..."
            data-value="0"
            data-dl-input-translation="true"
          ></textarea>
          <label className="upload-btn"></label>
        </PostFormStyle>
      </PostWriteStyle>
    </PostMainStyle>
  );
}

export default PostUpload;
