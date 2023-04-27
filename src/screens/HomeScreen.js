import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  FlatList,
  Dimensions,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { AntDesign, FontAwesome } from "@expo/vector-icons";
import axios from "axios";

const { width } = Dimensions.get("window");

const HomeScreen = ({ navigation }) => {
  const [livros, setLivros] = useState([]);
  const [busca, setBusca] = useState("");
  const searchInputRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const response = await axios.get("http://localhost:3000/books/livros");
        setLivros(response.data);
      } catch (err) {
        console.error(err);
      }
    }
    fetchData();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.item}>
      <Text style={styles.title} numberOfLines={1}>
        {item.titulo}
      </Text>
      <Text style={styles.author} numberOfLines={1}>
        {item.autor}
      </Text>
      <Text style={styles.description} numberOfLines={2}>
        {item.descricao}
      </Text>
      <Text style={styles.downloadLink} numberOfLines={1}>
        {item.link_download}
      </Text>
    </View>
  );

  const filtrarLivros = (livros, busca) => {
    if (busca.length === 0) {
      return livros;
    }
    const resultado = livros.filter(
      (livro) =>
        livro.titulo.toLowerCase().includes(busca.toLowerCase()) ||
        livro.autor.toLowerCase().includes(busca.toLowerCase()) ||
        livro.descricao.toLowerCase().includes(busca.toLowerCase()) ||
        livro.link_download.toLowerCase().includes(busca.toLowerCase())
    );
    return resultado;
  };

  const handleSearchIconPress = () => {
    searchInputRef.current.focus();
  };

  return (
    <View style={styles.container}>
      {/* Barra de navegação */}
      <View style={styles.navbar}>
        <TouchableOpacity style={styles.navItem}>
          <AntDesign name="setting" size={24} color="black" />
        </TouchableOpacity>
        <Text style={styles.navTitle}>Livros</Text>
        <TouchableOpacity
          style={styles.navItem}
          onPress={() => handleSearchIconPress()}
        >
          <FontAwesome name="search" size={24} color="black" />
        </TouchableOpacity>
      </View>
      {/* Campo de busca */}
      <View style={styles.searchContainer}>
        <TextInput
          ref={searchInputRef}
          style={styles.searchInput}
          placeholder="Buscar livros"
          onChangeText={(text) => setBusca(text)}
          value={busca}
        />
        <TouchableOpacity
          style={styles.searchIcon}
          onPress={() => handleSearchIconPress()}
        ></TouchableOpacity>
      </View>
      {/* Lista de livros */}
      <FlatList
        data={filtrarLivros(livros, busca)}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={{ width }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    padding: 20,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
    borderRadius: 10,
    backgroundColor: "#fafafa",
    elevation: 2,
    maxWidth: width - 40,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 5,
  },
  author: {
    fontSize: 16,
    fontStyle: "italic",
    color: "#555",
    marginBottom: 5,
  },
  description: {
    marginTop: 10,
    fontSize: 16,
    color: "#444",
  },
  downloadLink: {
    marginTop: 10,
    fontSize: 14,
    color: "blue",
    textDecorationLine: "underline",
  },
  navbar: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
    marginBottom: 10,
  },
  navItem: {
    padding: 10,
  },
  navTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  searchContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 10,
    paddingHorizontal: 10,
    marginBottom: 20,
  },
  searchInput: {
    flex: 1,
    height: 40,
    fontSize: 16,
    paddingLeft: 10,
  },
  searchIcon: {
    paddingRight: 10,
  },
  searchButton: {
    marginLeft: 10,
    backgroundColor: "#2ecc71",
    paddingHorizontal: 15,
    paddingVertical: 10,
    borderRadius: 10,
  },
  searchButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default HomeScreen;
