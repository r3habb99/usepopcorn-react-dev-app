import { useEffect, useRef, useState } from "react";

export function useUserRatingCount() {
  const [userRating, setUserRating] = useState("");

  const countRef = useRef(0);

  useEffect(
    function () {
      if (userRating) countRef.current++;
    },
    [userRating]
  );
  return { userRating, setUserRating, countRef };
}
