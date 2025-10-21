import React, { useState } from "react";
import { fileDataType } from "@/public/dummyData";

const List = ({ data }: { data: fileDataType[] }) => {
  const [files, setFiles] = useState<fileDataType[]>(data);
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const addFolder = (index: number) => {
    const folderName = prompt("Enter folder name:");
    if (!folderName) return;

    setFiles((prev) => {
      return prev.map((file, i) => {
        if (i === index) {
          if (!file.isFolder) {
            alert("Cannot add a folder inside a file!");
            return file;
          }
          return {
            ...file,
            children: [
              ...file.children,
              { name: folderName, isFolder: true, children: [] },
            ],
          };
        }
        return file;
      });
    });
  };

  const handleExpand = (name: string) => {
    setExpanded((prev) => ({
      ...prev,
      [name]: !prev[name],
    }));
  };

  return (
    <div className="ml-4 mt-2 space-y-1">
      {files.map((file, index) => (
        <div key={file.name + index} className="text-sm">
          <div className="flex items-center justify-between">
            <p
              className="font-medium text-gray-200 cursor-pointer"
              onClick={() => handleExpand(file.name)}
            >
              {file.name}{" "}
              {file.isFolder && <span className="ml-2 text-gray-400">📁</span>}
            </p>
            {file.isFolder && (
              <button
                onClick={() => addFolder(index)}
                className="text-xs bg-gray-700 hover:bg-gray-600 text-white px-2 py-1 rounded"
              >
                + Folder
              </button>
            )}
          </div>

          {file.isFolder && expanded[file.name] && file.children.length > 0 && (
            <List data={file.children} />
          )}
        </div>
      ))}
    </div>
  );
};

export default List;
