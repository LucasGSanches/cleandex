import { StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import Details from './pages/Details';
import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('home');
  const [pokemon, setPokemon] = useState('');
  if(page === 'home'){
    return (
      <Home/>
    );
  }
  return (
    <Details/>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
