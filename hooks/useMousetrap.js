import { useEffect } from "react";
import Mousetrap from "mousetrap";

export default function useMousetrap(keybindings) {
  useEffect(() => {
    Object.entries(keybindings).forEach(([key, fn]) =>
      Mousetrap.bind(`${key}`, e => {
        e.preventDefault();
        fn(e);
      })
    );
    return () => Object.keys(keybindings).forEach(key => Mousetrap.unbind(key));
  }, [keybindings]);
}
