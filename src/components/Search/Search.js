import React, { useState } from 'react';
import SearchList from './SearchList';
import '../MemberPopup/MemberPopup.css'
function Search({ details, user_assign_id }) {

  const [searchField, setSearchField] = useState("");
  const [searchShow, setSearchShow] = useState(false);

  const filteredPersons = details.filter(
    person => {
      return (
        person
        .body
        .toLowerCase()
        .includes(searchField.toLowerCase()),person.id
      );
    }
  );

  const handleChange = e => {
    setSearchField(e.target.value);
    if(e.target.value===""){
      setSearchShow(false);
    }
    else {
      setSearchShow(true);
    }
  };

  function searchList() {
    console.log(filteredPersons)
  	if (searchShow) {
	  	return (
	  			<SearchList user_assign_id={user_assign_id} filteredPersons={filteredPersons} />
	  	);
	  }
  }

  return (
    <section >
			<div >
				<p >Search your Ticket to assign</p>
			</div>
			<div className='search-box'>
				<input 
					type = "search" 
					placeholder = "Search Tickets" 
					onChange = {handleChange}
				/>
        {searchList()}
			</div>
			
		</section>
  );
}

export default Search;