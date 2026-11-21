import { useEffect } from 'react'
import {
  StyleSheet, Text, View, Image, ScrollView,
  Pressable, ActivityIndicator, BackHandler,
} from 'react-native'
import { usePokemon } from '../hooks/UsePokemon'
import { PokemonStats } from '../components/PokemonStats'
import { corDoTipo } from '../utils/typeColors'

export default function Details({ changePage, pokemon }) {
  const { data, loading, error } = usePokemon(pokemon)

  // botão "voltar" físico do Android também volta para a home
  useEffect(() => {
    const sub = BackHandler.addEventListener('hardwareBackPress', () => {
      changePage('home')
      return true // avisa que já tratamos o evento (não fecha o app)
    })
    return () => sub.remove()
  }, [changePage])

  const BackButton = ({ light }) => (
    <Pressable
      onPress={() => changePage('home')}
      hitSlop={10}
      style={({ pressed }) => [styles.backButton, pressed && { opacity: 0.6 }]}
    >
      <Text style={[styles.backText, light && { color: '#fff' }]}>← Voltar</Text>
    </Pressable>
  )

  if (error) {
    return (
      <View style={styles.center}>
        <BackButton />
        <Text>Não foi possível carregar o pokémon.</Text>
        <Text>{error}</Text>
      </View>
    )
  }

  if (loading || !data) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
      </View>
    )
  }

  const mainColor = corDoTipo(data.types[0].type.name)
  const image =
    data.sprites.other?.['official-artwork']?.front_default ??
    data.sprites.front_default

  // a API manda altura em decímetros e peso em hectogramas
  const heightM = (data.height / 10).toFixed(1)
  const weightKg = (data.weight / 10).toFixed(1)

  return (
    <ScrollView style={styles.container} contentContainerStyle={{ paddingBottom: 32 }}>
      {/* cabeçalho colorido */}
      <View style={[styles.header, { backgroundColor: mainColor }]}>
        <BackButton light />

        <View style={styles.titleRow}>
          <Text style={styles.name}>{data.name}</Text>
          <Text style={styles.number}>#{String(data.id).padStart(3, '0')}</Text>
        </View>

        <View style={styles.types}>
          {data.types.map(({ type }) => (
            <View key={type.name} style={styles.badge}>
              <Text style={styles.badgeText}>{type.name}</Text>
            </View>
          ))}
        </View>

        {image && <Image source={{ uri: image }} style={styles.image} />}
      </View>

      {/* corpo branco */}
      <View style={styles.body}>
        <View style={styles.infoRow}>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{heightM} m</Text>
            <Text style={styles.infoLabel}>Altura</Text>
          </View>
          <View style={styles.infoBox}>
            <Text style={styles.infoValue}>{weightKg} kg</Text>
            <Text style={styles.infoLabel}>Peso</Text>
          </View>
        </View>

        <Text style={[styles.sectionTitle, { color: mainColor }]}>Habilidades</Text>
        <View style={styles.abilities}>
          {data.abilities.map(({ ability, is_hidden }) => (
            <Text key={ability.name} style={styles.ability}>
              {ability.name.replace('-', ' ')}
              {is_hidden && <Text style={styles.hidden}> (oculta)</Text>}
            </Text>
          ))}
        </View>

        <Text style={[styles.sectionTitle, { color: mainColor }]}>Status base</Text>
        <PokemonStats stats={data.stats} color={mainColor} />
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#fff' },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    backgroundColor: '#fff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 10,
    borderBottomLeftRadius: 32,
    borderBottomRightRadius: 32,
    alignItems: 'center',
  },
  backButton: { alignSelf: 'flex-start', marginBottom: 10 },
  backText: { fontSize: 16, fontWeight: '600', color: '#333' },
  titleRow: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'baseline',
  },
  name: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold',
    textTransform: 'capitalize',
  },
  number: { color: 'rgba(255,255,255,0.8)', fontSize: 18, fontWeight: 'bold' },
  types: { flexDirection: 'row', gap: 8, alignSelf: 'flex-start', marginTop: 8 },
  badge: {
    backgroundColor: 'rgba(255,255,255,0.3)',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 4,
  },
  badgeText: { color: '#fff', fontWeight: '600', textTransform: 'capitalize' },
  image: { width: 220, height: 220, marginTop: 10 },
  body: { paddingHorizontal: 20, paddingTop: 20 },
  infoRow: { flexDirection: 'row', justifyContent: 'space-around', marginBottom: 20 },
  infoBox: { alignItems: 'center' },
  infoValue: { fontSize: 20, fontWeight: 'bold' },
  infoLabel: { color: '#777', marginTop: 2 },
  sectionTitle: { fontSize: 18, fontWeight: 'bold', marginTop: 10, marginBottom: 8 },
  abilities: { gap: 4, marginBottom: 10 },
  ability: { fontSize: 16, textTransform: 'capitalize' },
  hidden: { color: '#999', fontSize: 14, textTransform: 'none' },
})