import { StyleSheet, Text, View, Image, ActivityIndicator, Pressable } from 'react-native';
import { usePokemon } from '../hooks/UsePokemon';
import { corDoTipo } from '../utils/typeColors';

export function CardPokemon({ url, onPress }) {
  const { data, loading, error } = usePokemon(url);

  if (error) {
    return (
      <View style={[styles.card, styles.cardErro]}>
        <Text style={styles.textoErro}>Não foi possível carregar.</Text>
        <Text style={styles.textoErro}>{error}</Text>
      </View>
    );
  }
  if (loading || !data) {
    return (
      <View style={[styles.card, styles.cardCarregando]}>
        <ActivityIndicator/>
      </View>
    );
  }

  const tipoPrincipal = data.types[0].type.name;
  const imagem =
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default;

  return (
    <Pressable onPress={onPress} style={[styles.card, { backgroundColor: corDoTipo(tipoPrincipal) }]}>
      <View style={styles.info}>
        <Text style={styles.numero}>#{String(data.id).padStart(3, '0')}</Text>
        <Text style={styles.nome}>{data.name}</Text>

        <View style={styles.tipos}>
          {data.types.map(({ type }) => (
            <View key={type.name} style={styles.badge}>
              <Text style={styles.badgeTexto}>{type.name}</Text>
            </View>
          ))}
        </View>
      </View>

      {imagem && <Image source={{ uri: imagem }} style={styles.imagem} />}
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: 340,
    minHeight: 110,
    borderRadius: 16,
    padding: 16,
    marginBottom: 12,
    // sombra no iOS
    shadowColor: '#000',
    shadowOpacity: 0.15,
    shadowRadius: 6,
    shadowOffset: { width: 0, height: 3 },
    // sombra no Android
    elevation: 4,
  },
  cardCarregando: {
    backgroundColor: '#eee',
    justifyContent: 'center',
  },
  cardErro: {
    backgroundColor: '#fdd',
    flexDirection: 'column',
    alignItems: 'flex-start',
  },
  textoErro: { color: '#900' },
  info: { flex: 1 },
  numero: {
    color: 'rgba(255,255,255,0.8)',
    fontWeight: 'bold',
    fontSize: 14,
  },
  nome: {
    color: '#fff',
    fontSize: 22,
    fontWeight: 'bold',
    textTransform: 'capitalize',
    marginBottom: 6,
  },
  tipos: { flexDirection: 'row', gap: 6 },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 3,
  },
  badgeTexto: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
    textTransform: 'capitalize',
  },
  imagem: { width: 90, height: 90 },
});