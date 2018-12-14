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

  componentDidMount(): void {
    this.onSizeUpdate();
  }

  componentDidUpdate(): void {
    this.onSizeUpdate();
  }

  onSizeUpdate = () => {
    const { widget } = this.props;

    if (!widget || !this.label) {
      return;
    }

    if (this.state.isOpened) {
      widget.send(setSize({ width: `100%`, height: `100%` }));
      widget.send(setPosition({ top: '0' }));
    } else {
      const labelRect = this.label.getBoundingClientRect();
      widget.send(setSize({ width: `${labelRect.width}px`, height: `${labelRect.height}px` }));
      widget.send(setPosition({ top: `calc(50% - ${labelRect.height / 2}px)`, right: '0' }));
    }
  };

  onOpen = () => {
    this.setState({ isOpened: true });
  };

  onClose = () => {
    this.setState({ isOpened: false });
  };

  setLabelRef = (ref: HTMLElement | null) => (this.label = ref);

  render() {
    const backdropClassName = this.state.isOpened ? 'backdrop is-opened' : 'backdrop';
    return (
      <div>
        <div className={backdropClassName} onClick={this.onClose}>
          &nbsp;
        </div>
        <Popup isOpened={this.state.isOpened} onClosePopup={this.onClose} />
        <Label
          isOpened={this.state.isOpened}
          onOpenPopup={this.onOpen}
          onSetRef={this.setLabelRef}
        />
      </div>
    );
  }
}

interface LabelProps {
  isOpened: boolean;
  onOpenPopup: () => void;
  onSetRef: (ref: HTMLElement | null) => void;
}

class Label extends Component<LabelProps> {
  render() {
    const className = this.props.isOpened ? 'label is-opened' : 'label';
    return (
      <div
        ref={(ref) => this.props.onSetRef(ref)}
        className={className}
        onClick={this.props.onOpenPopup}
      >
        click to open
      </div>
    );
  }
}

interface PopupProps {
  isOpened: boolean;
  onClosePopup: () => void;
}

class Popup extends Component<PopupProps> {
  render() {
    const className = this.props.isOpened ? 'popup is-opened' : 'popup';
    return (
      <div className={className}>
        <div className="popup__close" onClick={this.props.onClosePopup}>
          &times;
        </div>
        {this.props.isOpened ? <div className="popup__content">Hello</div> : null}
      </div>
    );
  }
}

// Start widget
const widget = window.parent !== window ? initWidget(window) : undefined;
render(<App widget={widget} />, document.body);
