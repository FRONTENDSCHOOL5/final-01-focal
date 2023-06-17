import { atom } from 'recoil';

const localStorageEffect = ({ setSelf }) => {
  const savedValue = localStorage.getItem('token');
  if (savedValue != null) {
    setSelf(true);
  }
};

export const loginState = atom({
  key: 'loginState',
  default: false,
  effects: [localStorageEffect],
});
