import React, {Component} from 'react';
import classNames from "classnames/bind";
import { FormControl } from "material-ui/Form";
import Input, { InputAdornment } from "material-ui/Input";
import Icon from "material-ui/Icon";
import PropTypes from "prop-types";

import styles from './search.scss';

export class Search extends Component {
    render() {
        const { searchPlaceholder, searchIcon, searchTerm, onSearchTermChange } = this.props;
        return (
            <FormControl
                className={classNames(
                    styles.list_filter_container
                )}
                fullWidth
            >
                <Input
                    id="search"
                    value={searchTerm}
                    placeholder={searchPlaceholder}
                    onChange={onSearchTermChange}
                    className={styles.input}
                    endAdornment={
                        <InputAdornment position="end">
                            <Icon>{searchIcon}</Icon>
                        </InputAdornment>
                    }
                />
            </FormControl>
        );
    }
}

Search.propTypes = {
    searchPlaceholder: PropTypes.string,
    searchIcon: PropTypes.string,
    searchTerm: PropTypes.string,
    onSearchTermChange: PropTypes.func
};

Search.defaultProps = {
    searchPlaceholder: "Search...",
    searchIcon: "search"
};

export default Search;