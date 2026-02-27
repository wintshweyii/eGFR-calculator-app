import ConfirmModal from "@/components/delete-confirm-modal";
import HeaderComponent from "@/components/header";
import Search from "@/components/search";
import { useHistory } from "@/contexts/historyContext";
import AntDesign from "@expo/vector-icons/AntDesign";
import Entypo from "@expo/vector-icons/Entypo";
import Feather from "@expo/vector-icons/Feather";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import { router, useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import {
  Alert,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const History = () => {
  const {
    history,
    loadHistory,
    deleteHistory,
    deleteAllHistory,
    exportAllHistory,
    exportSingleHistory,
  } = useHistory();
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteType, setDeleteType] = useState<"single" | "all" | null>(null);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [menuVisibleId, setMenuVisibleId] = useState<number | null>(null);

  useFocusEffect(
    useCallback(() => {
      loadHistory();
    }, []),
  );

  const formatDate = (dateString: string) => {
    const d = new Date(dateString);
    return `${d.toLocaleDateString()} | ${d.toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    })}`;
  };

  const getGradeColor = (grade: string) => {
    if (!grade) return "#999";
    const g = grade.toUpperCase();

    if (g.includes("G1")) return "#2ECC71";
    if (g.includes("G2")) return "#27AE60";
    if (g.includes("G3A")) return "#F1C40F";
    if (g.includes("G3B")) return "#F39C12";
    if (g.includes("G4")) return "#E67E22";
    if (g.includes("G5")) return "#E74C3C";

    return "#3498DB";
  };

  const handleDelete = (id: number) => {
    setSelectedId(id);
    setDeleteType("single");
    setModalVisible(true);
  };

  const handleDeleteAll = () => {
    if (!history.length) {
      Alert.alert("No Data", "No history to delete.");
      return;
    }
    setDeleteType("all");
    setModalVisible(true);
  };

  const handleConfirmDelete = async () => {
    if (deleteType === "single" && selectedId !== null)
      await deleteHistory(selectedId);

    if (deleteType === "all") await deleteAllHistory();

    setModalVisible(false);
    setDeleteType(null);
    setSelectedId(null);
  };

  return (
    <Pressable
      style={{ flex: 1, backgroundColor: "#E6F0FA" }}
      onPress={() => setMenuVisibleId(null)}
    >
      <HeaderComponent
        text={<AntDesign name="info-circle" size={20} color="#8BC6F0" />}
        onAboutPress={() => router.push("/info")}
      />

      <View style={styles.container}>
        <Search />

        {history.length > 0 && (
          <View style={styles.resultCountContainer}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
              <Text style={styles.resultCountText}>
                Histor{history.length !== 1 ? "ies" : "y"} Found
              </Text>

              <View style={styles.countBadge}>
                <Text style={styles.countBadgeText}>{history.length}</Text>
              </View>
            </View>

            <View style={{ flexDirection: "row" }}>
              <Pressable onPress={exportAllHistory}>
                <Entypo name="export" size={25} color="#1691E9" />
              </Pressable>

              <Pressable style={{ marginLeft: 10 }} onPress={handleDeleteAll}>
                <MaterialIcons
                  name="delete-outline"
                  size={25}
                  color="#e71f44"
                />
              </Pressable>
            </View>
          </View>
        )}

        <ScrollView
          style={styles.resultContainer}
          showsVerticalScrollIndicator={false}
        >
          {history.length === 0 ? (
            <Text style={styles.nohistoryTxt}>No history to display</Text>
          ) : (
            history.map((item) => (
              <View key={item.history_id} style={styles.historyCard}>
                <View style={styles.firstPart}>
                  <Text>
                    <Ionicons name="calendar-outline" size={14} />{" "}
                    {formatDate(item.created_at)}
                  </Text>

                  <TouchableOpacity
                    onPress={(e) => {
                      e.stopPropagation();
                      setMenuVisibleId(
                        menuVisibleId === item.history_id
                          ? null
                          : item.history_id,
                      );
                    }}
                  >
                    <Feather name="more-vertical" size={18} color="#848488" />
                  </TouchableOpacity>
                </View>

                <View style={styles.secondPart}>
                  <View style={styles.inputDataBox}>
                    <Text style={styles.inputData}>
                      S cr: {item.serum_creatinine} {item.creatinine_unit}
                    </Text>
                    {item.age && (
                      <Text style={styles.inputData}>
                        Age: {item.age} Years
                      </Text>
                    )}
                    {item.sex && (
                      <Text style={styles.inputData}>Gender: {item.sex}</Text>
                    )}
                    {item.height && (
                      <Text style={styles.inputData}>
                        Height: {item.height} {item.height_unit}
                      </Text>
                    )}
                  </View>

                  <View style={styles.resultData}>
                    <Text>
                      <Text style={styles.resultValue}>{item.egfr_result}</Text>{" "}
                      ml/min/1.73m²
                    </Text>
                    <Text
                      style={[
                        styles.resultGrade,
                        {
                          backgroundColor: getGradeColor(
                            item.egfr_result_grade,
                          ),
                        },
                      ]}
                    >
                      {item.egfr_result_grade}
                    </Text>
                  </View>
                </View>

                <View style={styles.thirdPart}>
                  <Text style={styles.calculatedMethod}>
                    Calculated with {item.calculation_method}
                  </Text>
                </View>

                {menuVisibleId === item.history_id && (
                  <View style={styles.menuBox}>
                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        setMenuVisibleId(null);
                        exportSingleHistory(item.history_id);
                      }}
                    >
                      <Entypo name="export" size={16} color="#1691E9" />
                      <Text style={styles.menuText}>Export</Text>
                    </TouchableOpacity>

                    <TouchableOpacity
                      style={styles.menuItem}
                      onPress={() => {
                        setMenuVisibleId(null);
                        handleDelete(item.history_id);
                      }}
                    >
                      <MaterialIcons name="delete-outline" size={18} color="#e71f44" />
                      <Text style={[styles.menuText, { color: "#e71f44" }]}>
                        Delete
                      </Text>
                    </TouchableOpacity>
                  </View>
                )}
              </View>
            ))
          )}
        </ScrollView>
      </View>

      <ConfirmModal
        visible={modalVisible}
        confirmText={
          deleteType === "all"
            ? "Are you sure you want to delete ALL history records?"
            : "Are you sure you want to delete this history record?"
        }
        onConfirm={handleConfirmDelete}
        onCancel={() => {
          setModalVisible(false);
          setDeleteType(null);
          setSelectedId(null);
        }}
      />
    </Pressable>
  );
};

export default History;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginHorizontal: "3%",
    marginTop: "40%",
    marginBottom: "20%",
  },
  header: {
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
  },
  resultContainer: {
    borderRadius: 10,
    padding: 8,
    width: "100%",
    margin: "auto",
    marginBottom: 20,
  },
  firstPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 5,
    paddingTop: 5,
  },
  secondPart: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingLeft: 10,
    paddingRight: 10,
  },
  inputDataBox: {
    paddingTop: 5,
    paddingLeft: 5,
  },
  inputData: {
    fontSize: 12,
  },
  resultData: {
    paddingRight: 5,
    alignItems: "flex-end",
  },
  resultValue: {
    color: "#1691E9",
    fontSize: 24,
  },
  resultGrade: {
    textAlign: "center",
    color: "white",
    borderRadius: 10,
    fontSize: 10,
    padding: 4,
  },
  thirdPart: {
    justifyContent: "center",
    alignItems: "center",
    padding: 3,
    paddingBottom: 5,
  },
  calculatedMethod: {
    fontSize: 12,
    color: "#1691E9",
    padding: 4,
  },
  historyCard: {
    marginBottom: 16,
    padding: 12,
    backgroundColor: "#fff",
    borderRadius: 12,
  },

  resultCountContainer: {
    paddingHorizontal: 10,
    paddingBottom: 5,
    justifyContent: "space-between",
    flexDirection: "row",
    width: "95%",
    margin: "auto",
    marginTop: 7,
    marginBottom: 7,
  },

  resultCountText: {
    fontSize: 15,
    // color: '#1691E9',
    fontWeight: "500",
  },
  resultCount: {
    fontSize: 16,
    color: "#1691E9",
    fontWeight: "700",
    // backgroundColor: '#1691E9',
  },
  nohistoryTxt: {
    textAlign: "center",
    padding: 20,
    fontStyle: "italic",
    color: "#6c757d",
    fontSize: 16,
    fontWeight: 500,
    marginTop: 20,
  },
  countBadge: {
    marginLeft: 10,
    backgroundColor: "#0a81d6",
    paddingHorizontal: 10,
    paddingVertical: 4,
    borderRadius: 5,
    alignItems: "center",
  },

  countBadgeText: {
    color: "white",
    fontWeight: "700",
    fontSize: 14,
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0,0,0,0.2)",
    justifyContent: "flex-start",
    alignItems: "flex-end",
  },

  menuBox: {
    position: "absolute",
    top: 35,
    right: 20,
    backgroundColor: "#fff",
    borderRadius: 5,
    width: 100,
    paddingVertical: 8,
    elevation: 8,
    shadowColor: "#000",
    shadowOpacity: 0.15,
    shadowRadius: 5,
  },

  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 10,
    paddingHorizontal: 15,
  },

  menuText: {
    marginLeft: 10,
    fontSize: 14,
    color: "#333",
  },
});
