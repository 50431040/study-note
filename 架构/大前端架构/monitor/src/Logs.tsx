import React from "react";
import { useQuery } from "react-query";

interface LogsProps {
  data: {
    filename: string;
    message: string;
  }[];
}

const Logs: React.FC<LogsProps> = ({ data }) => {
  const { data: errors } = useQuery(["errors"], () =>
    fetch("http://localhost:3001/api/logs", { method: "GET" })
  );

  console.log(errors)
  return (
    <ul>
      {/* {errors.map(({ filename, message }) => (
        <li>
          {filename} -- ${message}
        </li>
      ))} */}
    </ul>
  );
};

export default Logs;
