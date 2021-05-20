import React from 'react';
import Search from './Search';
import Sort from './Sort';
class Control extends React.Component {
    render() {
        return (
            <div className="row mt-3">
                {/* search */}
                <Search onSearch={this.props.onSearch} />
                {/* sort */}
                <Sort onSort={this.props.onSort}/>
            </div>
        )
    }
}

export default Control;