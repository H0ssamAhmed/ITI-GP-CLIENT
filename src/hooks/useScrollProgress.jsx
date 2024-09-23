import { useEffect, useState } from "react";

function useScrollProgress() {
  const [completion, setCompletion] = useState(0);

  useEffect(() => {
    const updateScrollCompletion = () => {
      const currentProgress = window.scrollY;
      const scrollHeight =
        document.documentElement.scrollHeight - window.innerHeight;

      if (scrollHeight > 0) {
        const progress = Number((currentProgress / scrollHeight) * 100).toFixed(
          2
        );
        console.log("Scroll Progress:", progress); // Check if this gets logged
        setCompletion(progress);
      }
    };

    window.addEventListener("scroll", updateScrollCompletion);

    return () => {
      window.removeEventListener("scroll", updateScrollCompletion);
      console.log("useEffect cleanup");
    };
  }, []);

  return completion;
}

export default useScrollProgress;
