import { StyleSheet, Text, View } from 'react-native'

const STAT_LABELS = {
  'hp': 'HP',
  'attack': 'Ataque',
  'defense': 'Defesa',
  'special-attack': 'Atq. Esp.',
  'special-defense': 'Def. Esp.',
  'speed': 'Velocidade',
}

const MAX_STAT = 255 // maior valor base possível de um stat

export function PokemonStats({ stats, color }) {
  const total = stats.reduce((sum, { base_stat }) => sum + base_stat, 0)

  return (
    <View style={styles.container}>
      {stats.map(({ stat, base_stat }) => (
        <View key={stat.name} style={styles.row}>
          <Text style={styles.label}>{STAT_LABELS[stat.name] ?? stat.name}</Text>
          <Text style={styles.value}>{base_stat}</Text>
          <View style={styles.barBackground}>
            <View
              style={[
                styles.barFill,
                { width: `${(base_stat / MAX_STAT) * 100}%`, backgroundColor: color },
              ]}
            />
          </View>
        </View>
      ))}

      <View style={styles.row}>
        <Text style={[styles.label, styles.bold]}>Total</Text>
        <Text style={[styles.value, styles.bold]}>{total}</Text>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: { width: '100%', gap: 10 },
  row: { flexDirection: 'row', alignItems: 'center' },
  label: { width: 90, color: '#555' },
  value: { width: 40, textAlign: 'right', marginRight: 10, fontWeight: '600' },
  barBackground: {
    flex: 1,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#e5e5e5',
    overflow: 'hidden',
  },
  barFill: { height: '100%', borderRadius: 4 },
  bold: { fontWeight: 'bold', color: '#000' },
})