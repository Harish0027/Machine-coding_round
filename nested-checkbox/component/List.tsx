import { CheckBoxDataType } from "@/public/checkbox";
import React from "react";

const List = ({
  CheckBoxData,
  checked,
  setChecked,
}: {
  CheckBoxData: CheckBoxDataType[];
  checked: Record<string, number>;
  setChecked: (
    value:
      | Record<string, number>
      | ((prev: Record<string, number>) => Record<string, number>)
  ) => void;
}) => {
  const handleToggle = (id: number) => {
    setChecked((prev) => ({
      ...prev,
      [id]: prev[id] ? 0 : 1,
    }));
  };

  return (
    <div className="ml-5">
      {CheckBoxData.map((data, index) => (
        <div key={index}>
          <label>
            <input
              type="checkbox"
              checked={!!checked[data.id]}
              onChange={() => handleToggle(data.id)}
            />
            {data.name}
          </label>

          {data.children.length > 0 && (
            <List
              CheckBoxData={data.children}
              checked={checked}
              setChecked={setChecked}
            />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
