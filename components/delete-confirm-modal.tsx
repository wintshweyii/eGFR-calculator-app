import Octicons from "@expo/vector-icons/Octicons";
import React from "react";
import {
  KeyboardAvoidingView,
  Modal,
  Platform,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

type DeleteGoalProps = {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
  confirmText: string;
};

const ConfirmModal = ({
  visible,
  onConfirm,
  onCancel,
  confirmText,
}: DeleteGoalProps) => {
  return (
    <Modal
      visible={visible}
      transparent
      animationType="fade"
      statusBarTranslucent
    >
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
      >
        <View style={styles.overlay}>
          <View style={styles.container}>
            <View style={styles.titleContent}>
              <Octicons name="alert" size={30} color="#b00020" />
              <Text style={styles.titleText}>{confirmText}</Text>
            </View>

            <View style={styles.buttonContent}>
              <TouchableOpacity
                onPress={onConfirm}
                style={[styles.button, styles.deleteBtn]}
              >
                <Text style={styles.deleteBtnText}>Delete</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={onCancel}
                style={[styles.button, styles.cancelBtn]}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </KeyboardAvoidingView>
    </Modal>
  );
};

export default ConfirmModal;

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    padding: 20,
    backgroundColor: "#ffffff",
    width: "80%",
    borderRadius: 20,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.45)",
    justifyContent: "center",
    alignItems: "center",
  },
  titleContent: {
    alignItems: "center",
    marginBottom: 25,
  },
  titleText: {
    fontWeight: "bold",
    fontSize: 16,
    textAlign: "center",
    marginTop: 10,
  },
  buttonContent: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  button: {
    borderRadius: 10,
    padding: 12,
    width: "45%",
    alignItems: "center",
  },
  deleteBtn: {
    backgroundColor: "#b00020",
  },
  deleteBtnText: {
    color: "white",
    fontWeight: "bold",
  },
  cancelBtn: {
    backgroundColor: "#e0e0e0",
  },
  cancelText: {
    fontWeight: "500",
  },
});
