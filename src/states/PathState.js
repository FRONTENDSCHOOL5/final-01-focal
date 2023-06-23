import { atom } from 'recoil';

const localStorageEffect = ({ setSelf, onSet }) => {
  const savedValue = localStorage.getItem('pathname');
  console.log(savedValue, window.location.pathname);
  if (savedValue != null) {
    if (window.location.pathname === savedValue) {
      setSelf(savedValue);
    }
  }

  onSet((newValue) => {
    localStorage.setItem('pathname', newValue);
  });
};

export const pathState = atom({
  key: 'pathState',
  default: '/',
  effects: [localStorageEffect],
});
