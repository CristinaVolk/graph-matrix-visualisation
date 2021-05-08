import { useCallback } from "react";

const replaceTags = /(<([^>]+)>)/gi;

export function useComponent(changeLayout) {
  const runLayout = useCallback(
    (event) => {
      changeLayout(
        event.target.innerHTML.replace(replaceTags, "").toLowerCase(),
      );
    },
    [changeLayout],
  );

  return { runLayout };
}
