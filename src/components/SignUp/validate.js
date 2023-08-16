const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
const accountnameRegex = /^[a-zA-Z0-9._]+$/;

const validateMessage = {
  emailNotEntered: '이메일을 입력해주세요',
  emailPatternMiss: '올바르지 않은 이메일 형식입니다.',
  emailCorrect: '사용 가능한 이메일 입니다.',
  passwordLength: '비밀번호는 6자 이상이어야 합니다.',
  usernameLength: '2자~10자 이내여야 합니다',
  accountnamePatternMiss: '영문, 숫자, 특수문자(.),(_)만 사용 가능합니다.',
  accountnameCorrect: '사용 가능한 계정ID 입니다.',
};
export { emailRegex, accountnameRegex, validateMessage };
