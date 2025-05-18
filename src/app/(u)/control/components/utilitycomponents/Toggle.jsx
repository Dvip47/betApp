import React, { Component } from 'react';

class Toggle extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isActive: props.initialState || false
    };
  }

  handleToggle = () => {
    const { onToggle } = this.props;
    this.setState(prevState => ({
      isActive: !prevState.isActive
    }), () => {
      if (onToggle) {
        onToggle(this.state.isActive);
      }
    });
  };

  render() {
    return (
      <label className="inline-flex items-center cursor-pointer">
        <input
          type="checkbox"
          className="sr-only peer"
          checked={this.state.isActive}
          onChange={this.handleToggle}
        />
        <div className="relative w-11 h-6 bg-gray-200 rounded-full peer dark:bg-gray-700 peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all dark:border-gray-600 peer-checked:bg-blue-600"></div>
      </label>
    );
  }
}

export default Toggle;
