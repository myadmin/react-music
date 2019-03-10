import React, { PureComponent } from 'react';
import { SearchBoxWrapper } from './style';

export default class SearchBox extends PureComponent {
    constructor(props) {
        super(props);

        this.state = {
            query: ''
        };

        this.onChangeValue = this.onChangeValue.bind(this);
        this.onClickClear = this.onClickClear.bind(this);
    }

    render () {
        return (
            <SearchBoxWrapper>
                <i className="icon-search" />
                <input value={this.state.query} onChange={this.onChangeValue} placeholder={this.props.placeholder || '搜索歌曲、歌手'} type="text" className="box"/>
                {
                    this.state.query.length ? <i onClick={this.onClickClear} className="icon-dismiss" /> : null
                }
            </SearchBoxWrapper>
        )
    }

    onChangeValue(e) {
        this.updateValue(e.target.value);
    }

    onClickClear() {
        this.updateValue('');
    }

    updateValue(val) {
        this.setState({
            query: val
        }, () => {
            this.props.queryValue(this.state.query);
        });
    }
}