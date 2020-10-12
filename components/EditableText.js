import { useState, useEffect } from "react";
import Textarea from "react-autosize-textarea";

// TODO: call onChange after no changes in X seconds

export default function ({
  value: defaultValue,
  onChange,
  className = "",
  placeholder,
}) {
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) setValue(defaultValue);
  }, [defaultValue]);

  return (
    <Textarea
      className={className}
      value={value || ""}
      onChange={e => setValue(e.target.value)}
      onKeyDown={e => {
        if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
          e.preventDefault();
          e.stopPropagation();
          e.target.blur();
        }
      }}
      placeholder={placeholder}
      onFocus={e => setEditing(true)}
      onBlur={e => {
        onChange(value);
        setEditing(false);
      }}
    />
  );
}
