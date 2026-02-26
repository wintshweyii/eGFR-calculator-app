import methodsandformulas from "@/data/methodsandformulas.json";
import React from "react";
import { FlatList, StyleSheet, Text, View } from "react-native";

const BedsideUsage = () => {
  const method = methodsandformulas.find((m) => m.id === "bedside");
  if (!method) return <Text>Method not found!</Text>;
  return (
    <View style={styles.container}>
      <Text style={styles.title}>BedsideUsage</Text>
      <FlatList
        data={method.usage}
        keyExtractor={(item, index) => index.toString()}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        renderItem={({ item }) => (
          <View style={styles.itemContainer}>
            <Text style={styles.bullet}>•</Text>
            <Text style={styles.itemText}>{item}</Text>
          </View>
        )}
      />
    </View>
  );
};

export default BedsideUsage;

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#FFFFFF",
    width: "98%",
    alignSelf: "center",
    borderRadius: 10,
    padding: 20,
    marginTop: 15,
    shadowColor: "#000",
    shadowOpacity: 0.08,
    shadowRadius: 10,
    shadowOffset: { width: 0, height: 4 },
  },
  title: {
    fontSize: 18,
    fontWeight: "700",
    color: "#1691E9",
    marginBottom: 15,
    textAlign: "center",
  },
  itemContainer: {
    flexDirection: "row",
    alignItems: "flex-start",
    marginBottom: 12,
  },
  bullet: {
    fontSize: 16,
    color: "#1691E9",
    marginRight: 8,
    lineHeight: 22,
  },
  itemText: {
    flex: 1,
    fontSize: 14,
    color: "#333",
    lineHeight: 22,
  },
});
