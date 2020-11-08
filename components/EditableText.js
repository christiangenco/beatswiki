import React from "react";
import { useState, useEffect } from "react";
import Textarea from "react-textarea-autosize";

// TODO: call onChange after no changes in X seconds

export default function ({
  value: defaultValue,
  onChange,
  className = "",
  placeholder,
  onFocus,
  onBlur,
  singleLine = false,
}) {
  const [value, setValue] = useState(defaultValue);
  const [editing, setEditing] = useState(false);

  useEffect(() => {
    if (!editing) setValue(defaultValue);
  }, [defaultValue]);

  const props = {
    className: className,
    value: value || "",
    onChange: (e) => setValue(e.target.value),
    onKeyDown: (e) => {
      if ((e.key === "Enter" && !e.shiftKey) || e.key === "Escape") {
        e.preventDefault();
        e.stopPropagation();
        e.target.blur();
      }
    },
    placeholder: placeholder,
    onFocus: (e) => {
      setEditing(true);
      onFocus && onFocus();
    },
    onBlur: (e) => {
      onChange(value);
      setEditing(false);
      onBlur && onBlur();
    },
  };

  if (singleLine) return <input type="text" {...props} />;
  else return <Textarea {...props} />;
}
