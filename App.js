import { StyleSheet, Text, View } from 'react-native';
import Home from './pages/Home';
import Details from './pages/Details';
import { useState } from 'react';

export default function App() {
  const [page, setPage] = useState('home');
  const [pokemon, setPokemon] = useState('');
  function changePage(newPage, newPokemon) {
    setPage(newPage);
    setPokemon(newPokemon);
  }
  if(page === 'home'){
    return (
      <Home changePage={changePage}/>
    );
  }
  return (
    <Details changePage={changePage} pokemon={pokemon}/>
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
