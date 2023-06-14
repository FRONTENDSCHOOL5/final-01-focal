import styled from 'styled-components';

const InputContainerStyle = styled.div`
  width: 100%;
  margin-bottom: 16px;
`;

const LabelStyle = styled.label`
  display: block;
  color: var(--sub-txt-color);
  font-weight: 500;
  font-size: 12px;
  line-height: 15px;
  margin-bottom: 10px;
`;

const InputStyle = styled.input`
  width: 100%;
  font-size: 14px;
  line-height: 14px;
  padding-bottom: 8px;
  border: none;
  color: #000000;
  border-bottom: 1px solid var(--border-color);

  &::placeholder {
    color: #dbdbdb;
  }
`;

function InputField({
  labelText,
  inputId,
  inputType,
  inputPlaceholder,
  dataState,
}) {
  return (
    <InputContainerStyle>
      <LabelStyle htmlFor={inputId}>{labelText}</LabelStyle>
      <InputStyle
        type={inputType}
        id={inputId}
        placeholder={inputPlaceholder}
        data-state={dataState}
      />
    </InputContainerStyle>
  );
}

export default InputField;
