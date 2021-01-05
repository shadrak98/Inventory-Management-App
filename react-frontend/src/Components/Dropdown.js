import React from 'react';
import { Dropdown } from 'semantic-ui-react';


const Dropdownmenu = ({changeHandler, options}) => {

    let lol = []

    return (
        <Dropdown
            placeholder='Select Location'
            compact
            selection
            options={lol = options.map(items => ({
                key:items[0],
                text:items[1],
                value:items[1]
            }))}
            onChange={changeHandler}
        />
    );
}

export default Dropdownmenu;