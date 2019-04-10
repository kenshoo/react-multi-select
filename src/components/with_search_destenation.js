import React from "react";

export default Component => ({ showRightSearch, selectedItems, ...others }) => {
  class App extends React.Component {
    constructor(props) {
      super(props);

      this.state = {
        searchValue: ""
      };

      this.onChange = this.onChange.bind(this);
    }

    onChange(e) {
      this.setState({ searchValue: e.target.value });
    }

    render() {
      const { searchValue } = this.state;

      const filteredSelectedItems = selectedItems.filter(item =>
        item.label.toLowerCase().match(searchValue)
      );

      return (
        <Component
          searchValue={searchValue}
          onChange={this.onChange}
          selectedItems={filteredSelectedItems}
          showRightSearch={showRightSearch}
          {...others}
        />
      );
    }
  }

  return showRightSearch ? (
    <App {...others} />
  ) : (
    <Component selectedItems={selectedItems} {...others} />
  );
};
