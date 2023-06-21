import styled from 'styled-components';

const RadioInputBox = styled.div`
  display: flex;
  align-items: center;

  label {
    font-weight: 500;
    font-size: 12px;
    color: var(--sub-text-color);
    cursor: pointer;
  }

  input {
    margin-right: 10px;
  }

  p {
    margin-top: 6px;
    font-weight: 400;
    font-size: 12px;
    color: var(--red);
  }
`;

export default function RadioInput({
  id,
  children,
  error = '',
  validate,
  value,
  onChange,
  checked,
}) {
  return (
    <RadioInputBox>
      <label htmlFor={id}>
        <input
          type="radio"
          id={id}
          onBlur={validate}
          checked={checked}
          onChange={onChange}
          value={value}
        />
        {children}
      </label>
      {error && <p>*{error}</p>}
    </RadioInputBox>
  );
}

const RadioInputGroupBox = styled.div`
  display: flex;
  flex-direction: column;

  p.title {
    font-weight: 500;
    font-size: 12px;
    color: var(--sub-text-color);
    margin-bottom: 6px;
  }

  div.inputs {
    display: flex;
    gap: 15px;
  }
`;

export function RadioInputGroup({ title, children }) {
  return (
    <RadioInputGroupBox>
      <p className="title">{title}</p>
      <div className="inputs">{children}</div>
    </RadioInputGroupBox>
  );
}
