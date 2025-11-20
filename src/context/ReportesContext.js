import React, { createContext, useState, useContext } from "react";

const ReportesContext = createContext();

export function ReportesProvider({ children }) {
  const [reports, setReports] = useState([]);

  const addReport = (report) => {
    const newReport = {
      id: Date.now(),
      date: new Date().toLocaleString("es-CO"),
      status: "Pendiente",
      ...report,
    };

    setReports((prev) => [...prev, newReport]);
  };

  return (
    <ReportesContext.Provider value={{ reports, addReport }}>
      {children}
    </ReportesContext.Provider>
  );
}

export const useReportes = () => useContext(ReportesContext);
