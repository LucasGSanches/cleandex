import { FlatList, StyleSheet, Text, View } from 'react-native';
import { usePokemon } from '../hooks/UsePokemon'

export default function Home() {
  const { data, loading, erro } = usePokemon(
    'https://pokeapi.co/api/v2/pokemon?limit=20'
  )
  if (loading) return <p>Carregando pokémons...</p>
  if (erro) {
    return (
      <div>
        <p>Não foi possível carregar os pokémons.</p>
        <p>{erro}</p>
      </div>
    )
  }
  console.log(data);
  return (
    <View style={styles.container}>
      <Text>Você está em Home!</Text>
      <FlatList
        data={data.results}
        keyExtractor={(item) => item.name}
        renderItem={({ item}) => (
          <Text>{item.name}</Text>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
