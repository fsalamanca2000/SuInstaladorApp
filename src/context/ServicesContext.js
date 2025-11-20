import React, { createContext, useContext, useEffect, useState } from "react";
import { database } from "../firebase/firebaseConfig";
import { ref, onValue } from "firebase/database";
import { IMAGE_MAP } from "../data/imageMap";

const ServicesContext = createContext();

export function ServicesProvider({ children }) {
  const [services, setServices] = useState({});
  const [loadingServices, setLoadingServices] = useState(true);

  useEffect(() => {
    const servicesRef = ref(database, "services");

    const unsubscribe = onValue(servicesRef, (snapshot) => {
      const data = snapshot.val() || {};

      const parsed = Object.fromEntries(
        Object.entries(data).map(([id, srv]) => {
          // 🔥 Asegurar extensión .jpg
          let imgKey = srv.image;
          if (!imgKey.includes(".")) {
            imgKey = `${imgKey}.jpg`;
          }

          return [
            id,
            {
              ...srv,
              image: IMAGE_MAP[imgKey] || null,
              imageName: imgKey,                
            },
          ];
        })
      );

      setServices(parsed);
      setLoadingServices(false);
    });

    return unsubscribe;
  }, []);

  return (
    <ServicesContext.Provider value={{ services, loadingServices }}>
      {children}
    </ServicesContext.Provider>
  );
}

export const useServices = () => useContext(ServicesContext);
