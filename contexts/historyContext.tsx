import { showHistoryToast } from '@/components/toast';
import { db } from '@/services/database';
import React, { createContext, useContext, useState, } from 'react';
import { Alert, Share } from 'react-native';

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
  exportAllHistory: () => Promise<void>;           
  exportSingleHistory: (id: number) => Promise<void>;
};

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString([], {
      hour: '2-digit',
      minute: '2-digit',
    })}`;
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
        const fromISO = new Date(
          filter.fromDate.setHours(0, 0, 0, 0)
        ).toISOString();
        query += ` AND created_at >= ?`;
        params.push(fromISO);
      }

      if (filter.toDate) {
        const toISO = new Date(
          filter.toDate.setHours(23, 59, 59, 999)
        ).toISOString();
        query += ` AND created_at <= ?`;
        params.push(toISO);
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
      showHistoryToast('delete');
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
      showHistoryToast('deleteAll');
    } catch (error) {
      console.log(
        'Delete All Error:',
        error
      );
    }
  };

  const exportSingleHistory  = async (id: number) => {
  try {
    const historyItem = history.find(item => item.history_id === id);
    if (!historyItem) {
      Alert.alert('Error', 'History item not found');
      return;
    }

    const content = `
      History Record
      --------------
      Date: ${formatDate(historyItem.created_at)}
      Age: ${historyItem.age}
      Sex: ${historyItem.sex}
      Serum Creatinine: ${historyItem.serum_creatinine} ${historyItem.creatinine_unit}
      Height: ${historyItem.height ?? '-'} ${historyItem.height_unit ?? ''}
      eGFR Result: ${historyItem.egfr_result}
      Grade: ${historyItem.egfr_result_grade ?? '-'}
      `;

    await Share.share({
      title: `History-${id}`,
      message: content,
    });

  } catch (error) {
    console.error('Save Error:', error);
    Alert.alert('Error', 'Failed to save history item.');
  }
};

const exportAllHistory = async () => {
  try {
    if (!history || history.length === 0) {
      Alert.alert('No Data', 'No history to export.');
      return;
    }
    let content = 'All History Records\n-------------------\n';
    history.forEach(item => {
      content += `
        Date: ${formatDate(item.created_at)}
        Age: ${item.age}
        Sex: ${item.sex}
        Serum Creatinine: ${item.serum_creatinine} ${item.creatinine_unit}
        Height: ${item.height ?? '-'} ${item.height_unit ?? ''}
        eGFR Result: ${item.egfr_result}
        Grade: ${item.egfr_result_grade ?? '-'}
        -------------------
        `;
    });

    await Share.share({
      title: 'All History Export',
      message: content,
    });

  } catch (error) {
    console.error('Export Error:', error);
    Alert.alert('Error', 'Failed to export history.');
  }
};



// Export single history as PDF
// const exportSingleHistoryPDF = async (id: number) => {
//   try {
//     const historyItem = history.find(item => item.history_id === id);
//     if (!historyItem) {
//       Alert.alert('Error', 'History item not found');
//       return;
//     }

//     const htmlContent = `
//       <h2 style="color:#2f6d43;">History Record</h2>
//       <hr/>
//       <p><strong>Date:</strong> ${formatDate(historyItem.created_at)}</p>
//       <p><strong>Age:</strong> ${historyItem.age}</p>
//       <p><strong>Sex:</strong> ${historyItem.sex}</p>
//       <p><strong>Serum Creatinine:</strong> ${historyItem.serum_creatinine} ${historyItem.creatinine_unit}</p>
//       <p><strong>Height:</strong> ${historyItem.height ?? '-'} ${historyItem.height_unit ?? ''}</p>
//       <p><strong>eGFR Result:</strong> ${historyItem.egfr_result}</p>
//       <p><strong>Grade:</strong> ${historyItem.egfr_result_grade ?? '-'}</p>
//     `;

//     const options = {
//       html: htmlContent,
//       fileName: `History-${id}`,
//       directory: 'Documents',
//     };

//     const file = await RNHTMLtoPDF.convert(options);

//     await Share.share({
//       title: `History-${id}`,
//       url: Platform.OS === 'android' ? `file://${file.filePath}` : file.filePath,
//     });

//     Alert.alert('Success', 'PDF exported successfully!');
//   } catch (error) {
//     console.error(error);
//     Alert.alert('Error', 'Failed to export history as PDF.');
//   }
// };

// // Export all history as PDF
// const exportAllHistoryPDF = async () => {
//   try {
//     if (!history || history.length === 0) {
//       Alert.alert('No Data', 'No history to export.');
//       return;
//     }

//     let htmlContent = `<h2 style="color:#2f6d43;">All History Records</h2><hr/>`;

//     history.forEach(item => {
//       htmlContent += `
//         <p>
//           <strong>Date:</strong> ${formatDate(item.created_at)}<br/>
//           <strong>Age:</strong> ${item.age}<br/>
//           <strong>Sex:</strong> ${item.sex}<br/>
//           <strong>Serum Creatinine:</strong> ${item.serum_creatinine} ${item.creatinine_unit}<br/>
//           <strong>Height:</strong> ${item.height ?? '-'} ${item.height_unit ?? ''}<br/>
//           <strong>eGFR Result:</strong> ${item.egfr_result}<br/>
//           <strong>Grade:</strong> ${item.egfr_result_grade ?? '-'}
//         </p>
//         <hr/>
//       `;
//     });

//     const options = {
//       html: htmlContent,
//       fileName: 'All_History',
//       directory: 'Documents',
//     };

//     const file = await RNHTMLtoPDF.convert(options);

//     await Share.share({
//       title: 'All History Export',
//       url: Platform.OS === 'android' ? `file://${file.filePath}` : file.filePath,
//     });

//     Alert.alert('Success', 'PDF exported successfully!');
//   } catch (error) {
//     console.error(error);
//     Alert.alert('Error', 'Failed to export all history as PDF.');
//   }
// };

  return (
    <HistoryContext.Provider
      value={{
        history,
        loadHistory,
        filterHistory,
        deleteHistory,
        deleteAllHistory,
        exportSingleHistory,
        exportAllHistory
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