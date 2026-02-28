import React from "react";
import { StyleSheet } from "react-native";
import Toast from "react-native-toast-message";

export type HistoryAction = "save" | "delete" | "deleteAll";

export const showHistoryToast = (action: HistoryAction) => {
  switch (action) {
    case "save":
      Toast.show({
        type: "success",
        text1: "History Saved ✅",
        text2: "Your history record has been saved successfully.",
        position: "bottom",
        visibilityTime: 2500,
      });
      break;
    case "delete":
      Toast.show({
        type: "error",
        text1: "History Deleted 🗑️",
        text2: "The selected history record has been removed.",
        position: "bottom",
        visibilityTime: 2500,
      });
      break;
    case "deleteAll":
      Toast.show({
        type: "error",
        text1: "All History Deleted 🗑️",
        text2: "All history records have been removed.",
        position: "bottom",
        visibilityTime: 2500,
      });
      break;
    default:
      break;
  }
};

const HistoryToast = () => {
  return <Toast />;
};

export default HistoryToast;

const styles = StyleSheet.create({});
