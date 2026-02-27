import BedsideCalculation from "@/components/BedsideCalculation";
import BedsideFormula from "@/components/BedsideFormula";
import BedsideUsage from "@/components/BedsideUsage";
import TabButton from "@/components/TabButton";
import Ionicons from "@expo/vector-icons/Ionicons";
import { router, Stack } from "expo-router";
import React, { useState } from "react";
import { Keyboard, Pressable, StyleSheet, Text, View } from "react-native";

const BedsideMethod = () => {
  const [activeTab, setActiveTab] = useState<"calc" | "usage" | "formula">(
    "calc",
  );

  const renderContent = () => {
    switch (activeTab) {
      case "calc":
        return <BedsideCalculation />;
      case "usage":
        return <BedsideUsage />;
      case "formula":
        return <BedsideFormula />;
    }
  };

  return (
    <Pressable style={{ flex: 1 }} onPress={Keyboard.dismiss}>
      <View style={styles.container}>
        <Stack.Screen
          options={{
            header: () => (
              <View
                style={{
                  height: 130,
                  backgroundColor: "#fff",
                  flexDirection: "row",
                  alignItems: "center",
                  paddingHorizontal: 10,
                  borderBottomLeftRadius: 25,
                }}
              >
                <Ionicons
                  style={{ marginTop: 30 }}
                  name="chevron-back"
                  size={22}
                  onPress={() => router.replace("/")}
                />
                <Text
                  style={{
                    fontWeight: "600",
                    fontSize: 24,
                    marginLeft: 10,
                    marginTop: 30,
                  }}
                >
                  The Bedside Schwartz Method
                </Text>
              </View>
            ),
          }}
        />

        <View style={styles.tabContainer}>
          <TabButton
            label="Calculator"
            active={activeTab === "calc"}
            onPress={() => setActiveTab("calc")}
          />
          <TabButton
            label="Usage"
            active={activeTab === "usage"}
            onPress={() => setActiveTab("usage")}
          />
          <TabButton
            label="Formula"
            active={activeTab === "formula"}
            onPress={() => setActiveTab("formula")}
          />
        </View>

        <View style={styles.contentCard}>{renderContent()}</View>
      </View>
    </Pressable>
  );
};

export default BedsideMethod;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#eaf3fb",
    padding: 16,
    marginTop: -30,
  },
  tabContainer: {
    flexDirection: "row",
    backgroundColor: "#8BC6F0",
    borderRadius: 12,
    padding: 4,
    width: "88%",
    marginLeft: "auto",
    marginRight: "auto",
    marginTop: "13%",
  },
  contentCard: {
    borderRadius: 12,
    padding: 20,
    alignItems: "center",
    height: "auto",
  },
});
