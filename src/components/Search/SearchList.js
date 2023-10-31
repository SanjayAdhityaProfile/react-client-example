import React from 'react';
import Card from './Card';

function SearchList({ filteredPersons, user_assign_id }) {
  const filtered = filteredPersons.map( person =>  <Card user_assign_id={user_assign_id} key={person.id} person={person} />); 
  return (
    <div>
      {filtered}
    </div>
  );
}

export default SearchList;