import { showHistoryToast } from '@/components/toast';
import grades from '@/data/cdkGrades.json';
import { db } from '@/services/database';
import React, { createContext, useContext } from 'react';

type CalculateParams = {
  height: number;
  heightUnit: 'cm' | 'inch';
  serumCreatinine: number;
  unit: 'mg/dL' | 'µmol/L';
};

type CKDGrade = {
  grade: string;
  min: number;
  max: number;
  description: string;
};

type BedsideContextType = {
  calculateBedsideEGFR: (
    params: CalculateParams
  ) => Promise<{
    egfr: number;
    grade: string;
  }>;
};

const BedsideContext =
  createContext<BedsideContextType | undefined>(undefined);

  export const BedsideProvider = ({
    children,
  }: {
    children: React.ReactNode;
  }) => {

  const getGrade = (value: number): string => {
    const found = (grades as CKDGrade[]).find(
      g => value >= g.min && value <= g.max
    );

    return found
      ? `${found.grade} (${found.description})`
      : 'Unknown';
  };

  const saveHistory = async (record: any) => {
    try {
      db.runSync(
        `INSERT INTO egfr_history
        (
          history_id,
          age,
          sex,
          height,
          height_unit,
          serum_creatinine,
          creatinine_unit,
          egfr_result,
          egfr_result_grade,
          calculation_method,
          created_at
        )
        VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
        [
          record.history_id,
          null,          // age
          null,          // sex
          record.height,
          record.height_unit,
          record.serum_creatinine,
          record.creatinine_unit,
          record.egfr_result,
          record.egfr_result_grade,
          record.calculation_method,
          record.created_at,
        ]
      );
        showHistoryToast('save');
    } catch (error) {
      console.log('SQLite Bedside Save Error:', error);
    }
  };

  const calculateBedsideEGFR = async ({
    height,
    heightUnit,
    serumCreatinine,
    unit,
  }: CalculateParams) => {

    let heightCM = height;

    if (heightUnit === 'inch') {
      heightCM = height * 2.54;
    }

    let scr = serumCreatinine;

    if (unit === 'µmol/L') {
      scr = serumCreatinine / 88.4;
    }

    const egfr = (0.413 * heightCM) / scr;

    const rounded = Number(egfr.toFixed(0));
    const grade = getGrade(rounded);

    await saveHistory({
      history_id: Date.now(),
      height,
      height_unit: heightUnit,
      serum_creatinine: serumCreatinine,
      creatinine_unit: unit,
      egfr_result: rounded,
      egfr_result_grade: grade,
      calculation_method: 'Bedside Schwartz',
      created_at: new Date().toISOString(),
    });

    return {
      egfr: rounded,
      grade,
    };
  };

  return (
    <BedsideContext.Provider
      value={{ calculateBedsideEGFR }}
    >
      {children}
    </BedsideContext.Provider>
  );
};

export const useBedside = () => {
  const context = useContext(BedsideContext);

  if (!context) {
    throw new Error(
      'useBedside must be used inside BedsideProvider'
    );
  }

  return context;
};