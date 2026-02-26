import { showHistoryToast } from "@/components/toast";
import grades from "@/data/cdkGrades.json";
import { db } from "@/services/database";
import React, { createContext, useContext } from "react";

type CalculateParams = {
  serumCreatinine: number;
  age: number;
  sex: "Male" | "Female";
  unit: "mg/dL" | "µmol/L";
};

type CKDGrade = {
  grade: string;
  min: number;
  max: number;
  description: string;
};

type CDKContextType = {
  calculateEGFR: (params: CalculateParams) => Promise<{
    egfr: number;
    grade: string;
  }>;
};

const CDKContext = createContext<CDKContextType | undefined>(undefined);

export const CDKProvider = ({ children }: { children: React.ReactNode }) => {
  const getGrade = (value: number): string => {
    const found = (grades as CKDGrade[]).find(
      (g) => value >= g.min && value <= g.max,
    );

    return found ? `${found.grade} (${found.description})` : "Unknown";
  };

  const saveHistory = async (record: {
    history_id: number;
    age: number;
    sex: string;
    serum_creatinine: number;
    creatinine_unit: string;
    egfr_result: number;
    egfr_result_grade: string;
    calculation_method: string;
    created_at: string;
  }) => {
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
          record.age,
          record.sex,
          null,
          null,
          record.serum_creatinine,
          record.creatinine_unit,
          record.egfr_result,
          record.egfr_result_grade,
          record.calculation_method,
          record.created_at,
        ],
      );
      showHistoryToast("save");
    } catch (error) {
      console.log("SQLite Save Error:", error);
    }
  };

  const calculateEGFR = async ({
    serumCreatinine,
    age,
    sex,
    unit,
  }: CalculateParams) => {
    let scr = serumCreatinine;

    if (unit === "µmol/L") {
      scr = serumCreatinine / 88.4;
    }

    const k = sex === "Female" ? 0.7 : 0.9;
    const a = sex === "Female" ? -0.241 : -0.302;
    const femaleFactor = sex === "Female" ? 1.012 : 1;

    const minPart = Math.min(scr / k, 1);
    const maxPart = Math.max(scr / k, 1);

    const egfr =
      142 *
      Math.pow(minPart, a) *
      Math.pow(maxPart, -1.2) *
      Math.pow(0.9938, age) *
      femaleFactor;

    const rounded = Number(egfr.toFixed(0));
    const grade = getGrade(rounded);

    await saveHistory({
      history_id: Date.now(),
      age,
      sex,
      serum_creatinine: serumCreatinine,
      creatinine_unit: unit,
      egfr_result: rounded,
      egfr_result_grade: grade,
      calculation_method: "CKD-EPI",
      created_at: new Date().toISOString(),
    });

    return {
      egfr: rounded,
      grade,
    };
  };

  return (
    <CDKContext.Provider value={{ calculateEGFR }}>
      {children}
    </CDKContext.Provider>
  );
};

export const useCDK = () => {
  const context = useContext(CDKContext);

  if (!context) {
    throw new Error("useCDK must be used inside CDKProvider");
  }

  return context;
};
