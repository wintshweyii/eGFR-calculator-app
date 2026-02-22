import { db } from '@/services/database';
import React, {
  createContext,
  useContext,
  useState,
} from 'react';

export type CKDHistory = {
  history_id: number;
  age?: number;
  sex?: 'Male' | 'Female';
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
};

const HistoryContext =
  createContext<HistoryContextType | undefined>(
    undefined
  );

export const HistoryProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {

  const [history, setHistory] =
    useState<CKDHistory[]>([]);

  const loadHistory = async () => {
    try {
      const result =
        db.getAllSync<CKDHistory>(
          `SELECT *
           FROM egfr_history
           ORDER BY created_at DESC`
        );

      setHistory(result);
    } catch (error) {
      console.log('Load History Error:', error);
    }
  };

  const filterHistory = async (
    filter: HistoryFilter
  ) => {
    try {
      let query =
        `SELECT * FROM egfr_history WHERE 1=1`;
      const params: any[] = [];

      if (filter.fromDate) {
        query += ` AND created_at >= ?`;
        params.push(
          filter.fromDate.toISOString()
        );
      }

      if (filter.toDate) {
        query += ` AND created_at <= ?`;
        params.push(
          filter.toDate.toISOString()
        );
      }

      if (
        filter.method &&
        filter.method !== 'All'
      ) {
        query +=
          ` AND calculation_method = ?`;
        params.push(filter.method);
      }

      query += ` ORDER BY created_at DESC`;

      const result =
        db.getAllSync<CKDHistory>(
          query,
          params
        );

      setHistory(result);
    } catch (error) {
      console.log('Filter Error:', error);
    }
  };

  const deleteHistory = async (
    id: number
  ) => {
    try {
      db.runSync(
        `DELETE FROM egfr_history
         WHERE history_id = ?`,
        [id]
      );

      await loadHistory();
    } catch (error) {
      console.log(
        'Delete History Error:',
        error
      );
    }
  };

  const deleteAllHistory = async () => {
    try {
      db.runSync(
        `DELETE FROM egfr_history`
      );

      setHistory([]);
    } catch (error) {
      console.log(
        'Delete All Error:',
        error
      );
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
      }}
    >
      {children}
    </HistoryContext.Provider>
  );
};

export const useHistory = () => {
  const context =
    useContext(HistoryContext);

  if (!context)
    throw new Error(
      'useHistory must be inside provider'
    );

  return context;
};