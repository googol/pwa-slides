import { h } from './h.js'

const forwardKeys = [' ', 'Enter', 'Tab', 'ArrowRight', 'ArrowDown'];
const backwardKeys = ['Backspace', 'ArrowLeft', 'ArrowUp'];

function notModified(event) {
  return !event.ctrlKey && !event.shiftKey && !event.altKey && !event.metaKey;
}

export class Presentation extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentSlide: undefined,
    };
  }

  componentDidMount() {
    this.setState({
      currentSlide: this.props.slides.find(s => s.path === document.location.pathname),
    });
    window.addEventListener('popstate', (event) => {
      this.setState({
        currentSlide: this.props.slides.find(s => s.path === document.location.pathname),
      });
    });
  }

  handleKeyDown(event) {
    if (forwardKeys.includes(event.key) && notModified(event)) {
      event.preventDefault();
      const slideId = this.props.slides.indexOf(this.state.currentSlide);

      if (slideId < (this.props.slides.length - 1)) {
        const newSlide = this.props.slides[slideId + 1]
        this.setState({ currentSlide: newSlide });
        window.history.pushState(null, "slide", newSlide.path);
      }
    } else if (backwardKeys.includes(event.key) && notModified(event)) {
      event.preventDefault();
      const slideId = this.props.slides.indexOf(this.state.currentSlide);
      if (slideId > 0) {
        const newSlide = this.props.slides[slideId - 1]
        this.setState({ currentSlide: newSlide });
        window.history.pushState(null, "slide", newSlide.path);
      }
    }
  }

  autoFocus(element) {
    if (element) {
      element.focus()
    }
  }

  render() {
    return h('div', { className: "slideContainer", ref: this.autoFocus, tabIndex: -1, onKeyDown: (e) => this.handleKeyDown(e) }, this.state.currentSlide ? this.state.currentSlide.slide : "Unknown slide path")
  }
}
