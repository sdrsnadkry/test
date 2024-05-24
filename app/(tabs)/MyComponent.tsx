import React, { useState, useEffect, useRef } from "react";
import {
  Text,
  TouchableOpacity,
  FlatList,
  TextInput,
  ListRenderItemInfo,
  SafeAreaView,
} from "react-native";

interface Item {
  id: string;
  name: string;
}

interface Props {
  data: Item[];
}
const MyComponent = ({ data }: Props) => {
  // const {data} = props;
  const [selectedItems, setSelectedItems] = useState<Item[]>([]);
  const [dataSource, setDataSource] = useState<Item[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const inputRef = useRef<TextInput | null>(null);

  useEffect(() => {
    setDataSource(data ?? []);
  }, [data]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDataSource(
        data?.filter((item) =>
          item.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
      );
    }, 1000);

    return () => {
      clearTimeout(timer);
    };
  }, [searchTerm]);

  const handleSelect = (item: Item) => {
    if (selectedItems.find((selectedItem) => selectedItem.id === item.id)) {
      setSelectedItems((currentSelectedItems) =>
        currentSelectedItems.filter(
          (selectedItem) => selectedItem.id !== item.id
        )
      );
      return;
    }
    setSelectedItems((currentSelectedItems) => [...currentSelectedItems, item]);
  };

  const handleClear = () => {
    inputRef.current?.clear();
    setSearchTerm("");
  };

  const getSelectedItems = (item: Item) => {
    return selectedItems.some((selectedItem) => selectedItem.name === item.name)
      ? "Selected"
      : "Not selected";
  };

  const _renderItem = ({ item }: ListRenderItemInfo<Item>) => (
    <TouchableOpacity onPress={() => handleSelect(item)}>
      <Text>{item.name}</Text>
      <Text>{getSelectedItems(item)}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView>
      <TextInput
        ref={inputRef}
        onChangeText={setSearchTerm}
        value={searchTerm}
      />
      <TouchableOpacity onPress={handleClear}>
        <Text>Clear</Text>
      </TouchableOpacity>
      <FlatList
        data={dataSource}
        keyExtractor={(item) => item.id}
        renderItem={_renderItem}
      />
    </SafeAreaView>
  );
};

export default MyComponent;
