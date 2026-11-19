import { StyleSheet, Text, View } from 'react-native';
import { usePokemon } from '../hooks/UsePokemon'

export default function CardPokemon() {
  //const { data, loading, erro } = usePokemon(url);
  return (
    <View style={styles.container}>
      <Text>Isto é um card!</Text>
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
