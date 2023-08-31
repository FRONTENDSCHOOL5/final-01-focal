import defaultImage from '../assets/images/basic-profile.png';

export const handleImageError = (e) => {
  e.target.src = defaultImage;
};
