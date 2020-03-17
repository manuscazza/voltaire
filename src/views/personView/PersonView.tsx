import React from 'react';
import PersonsListView from '../../components/person/personslist/PersonsListView';
import personsList from '../../components/person/personslist/dummyPersonsList';

const PersonView: React.FunctionComponent<{}> = () => {
  return (
    <div>
      <PersonsListView personList={personsList} />
    </div>
  );
};

export default PersonView;
