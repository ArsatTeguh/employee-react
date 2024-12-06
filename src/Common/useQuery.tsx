import { useState, useEffect } from "react";

export function useMediaQuery(query: any) {
  const [matches, setMatches] = useState(false);

  useEffect(() => {
    var bol = true
   if (bol) {
    const media = window.matchMedia(query);

    const updateMatches = (event: any) => {
      setMatches(event.matches);
    };

    setMatches(media.matches);

    media.addEventListener("change", updateMatches);

    return () => {
      media.removeEventListener("change", updateMatches);
    };
   }
   console.log("woi");
   
   return () => bol = false
  }, [query]);

  return { matches };
}