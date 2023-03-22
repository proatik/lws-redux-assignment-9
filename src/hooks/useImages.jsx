import { useState } from "react";

// images.
import akash from "../assets/images/avatars/akash.png";
import almas from "../assets/images/avatars/almas.png";
import ferdous from "../assets/images/avatars/ferdous.png";
import riyadh from "../assets/images/avatars/riyadh.png";
import sadh from "../assets/images/avatars/sadh.png";
import salahuddin from "../assets/images/avatars/salahuddin.png";
import sumit from "../assets/images/avatars/sumit.png";

const avatars = {
  akash,
  almas,
  ferdous,
  riyadh,
  sadh,
  salahuddin,
  sumit,
};

const useImages = () => {
  const [images] = useState(avatars);

  const getImage = (path) => {
    const name = path.split(/\//).pop().replace(".png", "");
    return images[name];
  };

  //   return images;
  return getImage;
};

export default useImages;
