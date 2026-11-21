import { useState } from 'react'
import { TextInput, FlatList, StyleSheet, Text, View, ActivityIndicator, Pressable } from 'react-native'
import { usePokemonList } from '../hooks/UsePokemonList'
import { CardPokemon } from '../components/CardPokemon'
import { usePokemonSearch } from '../hooks/UsePokemonSearch'

export default function Home({changePage}) {
  const [query, setQuery] = useState('')
  const { list, loading, error, loadMore, hasMore } = usePokemonList()
  const search = usePokemonSearch(query)

  const isSearching = query.trim() !== ''

  // erro antes de qualquer pokémon carregar: ocupa a tela toda
  if (error && list.length === 0) {
    return (
      <View style={styles.center}>
        <Text>Não foi possível carregar os pokémons.</Text>
        <Text>{error}</Text>
        <Pressable onPress={loadMore}>
          <Text style={styles.link}>Tentar de novo</Text>
        </Pressable>
      </View>
    )
  }

  // só o carregamento INICIAL ocupa a tela toda
  if (list.length === 0) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" />
        <Text>Carregando pokémons...</Text>
      </View>
    )
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>CLEANDEX</Text>
      <TextInput
        style={styles.search}
        placeholder="Buscar por nome ou número"
        value={query}
        onChangeText={setQuery}
        autoCapitalize="none"
        autoCorrect={false}
        clearButtonMode="while-editing" // botão de limpar (só iOS)
      />
      <FlatList
        data={isSearching ? search.results : list}
        keyExtractor={(item) => item.name}
        renderItem={({ item }) => <CardPokemon url={item.url} onPress={() => changePage('details', item.url)} />}
        contentContainerStyle={styles.listContent}
        onEndReached={hasMore ? loadMore : undefined}
        onEndReachedThreshold={0.5}
        ListFooterComponent={() => {
          if (loading) return <ActivityIndicator style={styles.footer} />
          if (error) {
            return (
              <Pressable onPress={loadMore}>
                <Text style={styles.link}>Erro ao carregar mais. Tocar para tentar de novo</Text>
              </Pressable>
            )
          }
          if (!hasMore) return <Text style={styles.footer}>Fim da Pokédex!</Text>
          return null
        }}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
  },
  title: {
    marginTop: 50,
    marginBottom: 20,
    fontSize: 24,
    fontWeight: 'bold',
    alignSelf: 'center',
  },
  listContent: {
    padding: 16,
    alignItems: 'center',
  },
  footer: {
    margin: 16,
    textAlign: 'center',
  },
  link: {
    color: '#3366cc',
    margin: 16,
    textAlign: 'center',
  },
  search: {
  marginHorizontal: 16,
  marginBottom: 8,
  paddingHorizontal: 14,
  paddingVertical: 10,
  borderRadius: 12,
  backgroundColor: '#f0f0f0',
  fontSize: 16,
},
})