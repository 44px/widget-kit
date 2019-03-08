import { Component, h, render } from 'preact';
import { initWidget, Widget } from '@widget-kit/container';
import { setPosition } from '@widget-kit/container-plugin-position-fixed';
import { setSize } from '@widget-kit/container-plugin-size';
import './widget.css';

interface AppProps {
  widget?: Widget;
}

interface AppState {
  isOpened: boolean;
}

class App extends Component<AppProps, AppState> {
  state = {
    isOpened: false,
  };
  private label: HTMLElement | null = null;
  private parentMQ: MediaQueryList | null = null;

  componentDidMount(): void {
    this.parentMQ = window.parent.matchMedia('screen and (min-width: 600px)');
    this.parentMQ.addEventListener('change', this.onSizeChange);
    this.onSizeChange();
  }

  componentDidUpdate(): void {
    this.onSizeChange();
  }

  componentWillUnmount(): void {
    if (this.parentMQ) {
      this.parentMQ.removeEventListener('change', this.onSizeChange);
    }
  }

  onSizeChange = () => {
    const cornerMargin = 20;
    const { widget } = this.props;

    if (!widget || !this.label) {
      return;
    }

    if (this.state.isOpened) {
      if (this.parentMQ && this.parentMQ.matches) {
        const width = 300;
        const height = 350;
        widget.send(
          setSize({
            width: `${width}px`,
            height: `${height}px`,
            maxHeight: `calc(100% - ${2 * cornerMargin}px)`,
          }),
        );
        widget.send(setPosition({ right: `${cornerMargin}px`, bottom: `${cornerMargin}px` }));
      } else {
        widget.send(setSize({ width: '100%', height: '100%', maxHeight: 'none' }));
        widget.send(setPosition({ right: '0', bottom: '0' }));
      }
    } else {
      const labelRect = this.label.getBoundingClientRect();
      widget.send(setSize({ width: `${labelRect.width}px`, height: `${labelRect.height}px` }));
      widget.send(setPosition({ right: `${cornerMargin}px`, bottom: `${cornerMargin}px` }));
    }
  };

  onOpen = () => this.setState({ isOpened: true });

  onClose = () => this.setState({ isOpened: false });

  setLabelRef = (ref: HTMLElement | null) => (this.label = ref);

  render() {
    return (
      <div>
        <Chat isOpened={this.state.isOpened} onClose={this.onClose} />
        <Label isOpened={this.state.isOpened} onClick={this.onOpen} onSetRef={this.setLabelRef} />
      </div>
    );
  }
}

interface LabelProps {
  isOpened: boolean;
  onClick: () => void;
  onSetRef: (ref: HTMLElement | null) => void;
}

class Label extends Component<LabelProps> {
  render() {
    const className = this.props.isOpened ? 'label is-opened' : 'label';
    return (
      <div
        ref={(ref) => this.props.onSetRef(ref)}
        className={className}
        onClick={this.props.onClick}
      >
        click to open
      </div>
    );
  }
}

interface ChatProps {
  isOpened: boolean;
  onClose: () => void;
}

class Chat extends Component<ChatProps> {
  render() {
    const className = this.props.isOpened ? 'chat is-opened' : 'chat';
    return (
      <div className={className}>
        {this.props.isOpened ? (
          <div>
            <div className="chat__close" onClick={this.props.onClose}>
              &times;
            </div>
            <div className="chat__content">Hello</div>
          </div>
        ) : null}
      </div>
    );
  }
}

// Start widget
const widget = window.parent !== window ? initWidget() : undefined;
render(<App widget={widget} />, document.body);
