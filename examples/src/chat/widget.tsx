import { Component, h, render } from 'preact';
import { initWidget, setPosition, setSize, Widget } from '@widget-kit/container';
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
        widget.send(setSize(`${width}px`, `${height}px`));
        widget.send(
          setPosition(
            `calc(100% - ${height + cornerMargin}px)`,
            `calc(100% - ${width + cornerMargin}px)`,
          ),
        );
      } else {
        widget.send(setSize(`100%`, `100%`));
        widget.send(setPosition('0', `0`));
      }
    } else {
      const labelRect = this.label.getBoundingClientRect();
      widget.send(setSize(`${labelRect.width}px`, `${labelRect.height}px`));
      widget.send(
        setPosition(
          `calc(100% - ${labelRect.height + cornerMargin}px)`,
          `calc(100% - ${labelRect.width + cornerMargin}px)`,
        ),
      );
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
const widget = window.parent !== window ? initWidget(window) : undefined;
render(<App widget={widget} />, document.body);
