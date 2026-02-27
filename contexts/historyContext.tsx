import { showHistoryToast } from "@/components/toast";
import { db } from "@/services/database";
import * as Print from "expo-print";
import * as Sharing from "expo-sharing";
import React, { createContext, useContext, useState } from "react";
import { Alert } from "react-native";

export type CKDHistory = {
  history_id: number;
  age?: number;
  sex?: "Male" | "Female";
  height?: number;
  height_unit?: string;
  serum_creatinine: number;
  creatinine_unit: string;
  egfr_result: number;
  egfr_result_grade: string;
  calculation_method: string;
  created_at: string;
};

type HistoryFilter = {
  fromDate?: Date;
  toDate?: Date;
  method?: string;
};

type HistoryContextType = {
  history: CKDHistory[];
  loadHistory: () => Promise<void>;
  filterHistory: (filter: HistoryFilter) => Promise<void>;
  deleteHistory: (id: number) => Promise<void>;
  deleteAllHistory: () => Promise<void>;
  exportAllHistory: () => Promise<void>;
  exportSingleHistory: (id: number) => Promise<void>;
};

const formatDate = (dateString: string) => {
  const d = new Date(dateString);
  return d.toLocaleString();
};

const HistoryContext = createContext<HistoryContextType | undefined>(undefined);

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [history, setHistory] = useState<CKDHistory[]>([]);

  const loadHistory = async () => {
    try {
      const result = db.getAllSync<CKDHistory>(
        `SELECT * FROM egfr_history ORDER BY created_at DESC`,
      );
      setHistory(result);
    } catch (error) {
      console.log("Load History Error:", error);
    }
  };

  const filterHistory = async (filter: HistoryFilter) => {
    try {
      let query = `SELECT * FROM egfr_history WHERE 1=1`;
      const params: any[] = [];

      if (filter.fromDate) {
        const fromISO = new Date(
          filter.fromDate.setHours(0, 0, 0, 0),
        ).toISOString();
        query += ` AND created_at >= ?`;
        params.push(fromISO);
      }

      if (filter.toDate) {
        const toISO = new Date(
          filter.toDate.setHours(23, 59, 59, 999),
        ).toISOString();
        query += ` AND created_at <= ?`;
        params.push(toISO);
      }

      if (filter.method && filter.method !== "All") {
        query += ` AND calculation_method = ?`;
        params.push(filter.method);
      }

      query += ` ORDER BY created_at DESC`;

      const result = db.getAllSync<CKDHistory>(query, params);
      setHistory(result);
    } catch (error) {
      console.log("Filter Error:", error);
    }
  };

  const deleteHistory = async (id: number) => {
    try {
      db.runSync(`DELETE FROM egfr_history WHERE history_id = ?`, [id]);
      await loadHistory();
      showHistoryToast("delete");
    } catch (error) {
      console.log("Delete History Error:", error);
    }
  };

  const deleteAllHistory = async () => {
    try {
      db.runSync(`DELETE FROM egfr_history`);
      setHistory([]);
      showHistoryToast("deleteAll");
    } catch (error) {
      console.log("Delete All Error:", error);
    }
  };

  //differentiation columns between two methods
  const generateMethodSpecificFields = (item: CKDHistory) => {
    let methodFields = "";

    if (item.calculation_method === "CKD-EPI") {
      methodFields += `
        <p><strong>Age:</strong> ${item.age}</p>
        <p><strong>Sex:</strong> ${item.sex}</p>
      `;
    }

    if (item.calculation_method === "Bedside Schwartz") {
      methodFields += `
        <p><strong>Height:</strong> ${item.height} ${item.height_unit}</p>
      `;
    }

    return methodFields;
  };

  const exportSingleHistory = async (id: number) => {
    try {
      const historyItem = history.find((item) => item.history_id === id);

      if (!historyItem) {
        Alert.alert("Error", "History item not found");
        return;
      }

      const htmlContent = `
        <html>
          <body>
            <h1>Estimated Glomerular Filtration Rate (eGFR) Result</h1>
            <hr/>
            <p><strong>Date:</strong> ${formatDate(historyItem.created_at)}</p>
            ${generateMethodSpecificFields(historyItem)}
            <p><strong>Serum Creatinine:</strong> 
              ${historyItem.serum_creatinine} ${historyItem.creatinine_unit}
            </p>
            <p><strong>eGFR Result:</strong> ${historyItem.egfr_result}</p>
            <p><strong>Grade:</strong> ${historyItem.egfr_result_grade}</p>
            <p><strong>Calculation Method:</strong> ${historyItem.calculation_method}</p>
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
      // showHistoryToast("export");
    } catch (error) {
      console.error("Export PDF Error:", error);
      Alert.alert("Error", "Failed to export history item.");
    }
  };

  const exportAllHistory = async () => {
    try {
      if (!history.length) {
        Alert.alert("No Data", "No history to export.");
        return;
      }

      let rows = "";

      history.forEach((item) => {
        rows += `
          <hr/>
          <p><strong>Date:</strong> ${formatDate(item.created_at)}</p>
          ${generateMethodSpecificFields(item)}
          <p><strong>Serum Creatinine:</strong> 
            ${item.serum_creatinine} ${item.creatinine_unit}
          </p>
          <p><strong>eGFR Result:</strong> ${item.egfr_result}</p>
          <p><strong>Grade:</strong> ${item.egfr_result_grade}</p>
          <p><strong>Calculation Method:</strong> ${item.calculation_method}</p>
        `;
      });

      const htmlContent = `
        <html>
          <body>
            <h1>Estimated Glomerular Filtration Rate (eGFR) Result Report</h1>
            ${rows}
          </body>
        </html>
      `;

      const { uri } = await Print.printToFileAsync({ html: htmlContent });
      await Sharing.shareAsync(uri);
      // showHistoryToast("exportAll");
    } catch (error) {
      console.error("Export All PDF Error:", error);
      Alert.alert("Error", "Failed to export history.");
    }
  };

  return (
    <HistoryContext.Provider
      value={{
        history,
        loadHistory,
        filterHistory,
        deleteHistory,
        deleteAllHistory,
        exportSingleHistory,
        exportAllHistory,
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context = useContext(HistoryContext);
  if (!context) throw new Error("useHistory must be inside provider");
  return context;
};
