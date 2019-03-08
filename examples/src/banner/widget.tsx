import { Component, h, render } from 'preact';
import { initWidget, Widget } from '@widget-kit/container';
import { setSize } from '@widget-kit/container-plugin-size';
import './widget.css';

interface Props {
  widget?: Widget;
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
    if (this.container && this.props.widget) {
      const rect = this.container.getBoundingClientRect();
      this.props.widget.send(
        setSize({
          width: `${rect.width}px`,
          height: `${rect.height}px`,
        }),
      );
    }
  };

  onClick = () => {
    this.setState({ clicks: this.state.clicks + 1 });
  };

  render() {
    const rows = [];
    for (let i = 0; i < this.state.clicks + 1; i += 1) {
      rows.push(<div>(click to add row)</div>);
    }

    return (
      <div className="banner" ref={(ref) => (this.container = ref)} onClick={this.onClick}>
        <div className="banner__title">Size plugin example</div>
        <div className="banner__description">Iframe size is controlled by widget</div>
        <div className="banner__cta">{rows}</div>
      </div>
    );
  }
}

// Start widget
const widget = window.parent !== window ? initWidget() : undefined;
render(<App widget={widget} />, document.body);
