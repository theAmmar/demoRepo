import React, { useEffect, useState } from 'react';
import { gql, useQuery } from '@apollo/client';

const COUNTRY = gql`
query Country($id: Int!) {
  country(id: $id) {
    name
    user {
    full_name
    }
  }
}
`;

const Country = (props) => {
    const { location: { state: { userId } } } = props;
    const [ userData, setUserData ] = useState();
    const [ skip, setSkip ] = useState(false);
    const { loading, error, data } = useQuery(COUNTRY, {
        variables : {
            id: userId
        }, 
        skip
    });
    
    // Fetches the data from the graphQL API
    useEffect(() => {
        if(!loading && !error && !!data ) {
            setSkip(true);
            setUserData(data);
        }
    }, [data, loading]);
    if (loading) return 'Loading...';
    if (error) return `Error! ${error.message}`;
    return(
        userData ? <div className='country'>
            <label>Country</label>
            <input readOnly value={userData.country.name} />
            <br />
            <label>Full Name</label>
            <input readOnly value={userData.country.user.full_name} />
        </div> : null
    )
}

export { Country };