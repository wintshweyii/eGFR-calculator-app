import React from "react";
import { StyleSheet, View } from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type DropdownItem = {
  id: number | string;
  name: string;
};

type Props = {
  data: DropdownItem[];
  selectedValue: number | string | null;
  onSelect: (id: number | string | null) => void;
};

const CustomDropdown = ({ data, selectedValue, onSelect }: Props) => {
  return (
    <View style={styles.container}>
      <Dropdown
        style={styles.dropdown}
        containerStyle={styles.dropdownContainer}
        itemContainerStyle={styles.itemContainer}
        itemTextStyle={styles.itemText}
        selectedTextStyle={styles.selectedText}
        activeColor="#d9ecfa"
        data={data}
        labelField="name"
        valueField="id"
        value={selectedValue}
        onChange={(item) => onSelect(item.id)}
      />
    </View>
  );
};

export default CustomDropdown;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  dropdown: {
    marginLeft: 5,
    paddingVertical: 8,
    paddingHorizontal: 10,
    backgroundColor: "white",
    borderRadius: 6,
    width: 115,
    height: 35,
  },

  dropdownContainer: {
    borderRadius: 10,
  },
  selectedText: {
    color: "#000000",
    fontSize: 11,
  },
  itemContainer: {
    height: 50,
  },
  itemText: {
    color: "#1691E9",
    fontSize: 10,
  },
});
