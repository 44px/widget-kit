import { Component, h, render } from 'preact';
import { initWidget, setSize, Widget } from '@widget-kit/container';

interface Props {
  widget: Widget;
}

class App extends Component<Props> {
  state = {
    clicks: 0,
  };
  container: HTMLElement | null = null;

  componentDidMount(): void {
    this.onSizeUpdate();
  }

  componentDidUpdate(): void {
    this.onSizeUpdate();
  }

  onSizeUpdate = () => {
    if (this.container) {
      const rect = this.container.getBoundingClientRect();
      this.props.widget.send(setSize(`${rect.width}px`, `${rect.height}px`));
    }
  };

  onClick = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  render() {
    const rows = [];
    for (let i = 0; i < this.state.clicks + 1; i++) {
      rows.push(<div>(click to add row)</div>);
    }

    return (
      <div style={styles.container} ref={(ref) => (this.container = ref)} onClick={this.onClick}>
        <div style={styles.title}>Size plugin example</div>
        <div style={styles.description}>Iframe size is controlled by widget</div>
        <div style={styles.cta}>{rows}</div>
      </div>
    );
  }
}

const commonStyles = {
  margin: '0',
  boxSizing: 'border-box',
  fontFamily: 'sans-serif',
};

const styles = {
  container: {
    ...commonStyles,
    display: 'inline-block',
    minWidth: '200px',
    maxWidth: '250px',
    padding: '15px 10px',
    borderRadius: '5px',
    background: '#FADDD4',
  },
  title: {
    ...commonStyles,
    fontSize: '20px',
    lineHeight: '1.2',
    color: '#D86838',
  },
  description: {
    ...commonStyles,
    fontSize: '16px',
    lineHeight: '1.2',
    color: '#444',
  },
  cta: {
    ...commonStyles,
    fontSize: '14px',
    lineHeight: '2',
    color: '#444',
  },
};

// Start widget
const widget = initWidget(window);
render(<App widget={widget} />, document.body);
