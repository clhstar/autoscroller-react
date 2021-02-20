import React, { Component, ReactElement, createRef } from "react";

type PageProps = {
  component: ReactElement;
  speed?: number;
  height?: number | string;
  mouseOverPause?: boolean;
  delayLoad?: number;
};

type PageState = {
  isCopy: boolean;
};

class AutoScroller extends Component<PageProps, PageState> {
  static defaultProps: {};
  mouseEnter: boolean = false;
  animation: number | null = null;
  container = createRef<HTMLDivElement>();
  componentRef = createRef<HTMLDivElement>();
  state = {
    isCopy: false,
  };
  componentDidMount() {
    const { delayLoad } = this.props;
    setTimeout(() => {
      this.registerAutoRun();
    }, delayLoad);
    window.addEventListener("wheel", this.wheelEvenlistener);
  }

  componentWillUnmount() {
    window.removeEventListener("wheel", this.wheelEvenlistener);
  }

  componentDidUpdate(prevProps: PageProps) {
    if (prevProps.component !== this.props.component) {
      if (!this.mouseEnter) {
        this.registerAutoRun();
      }
    }
  }

  registerAutoRun = () => {
    if (this.container.current) {
      this.stopRun();
      this.autoRun();
    }
  };

  autoRun = () => {
    const { speed = 1 } = this.props;
    const { isCopy } = this.state;
    let node = this.container.current;
    let componentNode = this.componentRef.current;
    if (node && componentNode) {
      if (node.clientHeight <= componentNode.scrollHeight) {
        if (!isCopy) {
          this.setState({ isCopy: true });
        }
        node.scrollTop += speed;
        this.wheelEvenlistener();
        this.animation = window.requestAnimationFrame(this.autoRun);
      } else {
        this.setState({ isCopy: false });
      }
    }
  };

  stopRun = () => {
    if (this.animation) {
      window.cancelAnimationFrame(this.animation);
      this.animation = null;
    }
  };

  wheelEvenlistener = () => {
    let node = this.container.current;
    if (node) {
      let runHeight = node.scrollHeight - node.clientHeight;
      if (runHeight <= Math.ceil(node.scrollTop)) {
        let node0 = node.childNodes[0];
        node.appendChild(node0);
      }
    }
  };

  render() {
    const { isCopy } = this.state;
    const { component, mouseOverPause, height } = this.props;
    return (
      <div
        ref={this.container}
        style={{ height: height, overflowY: "scroll" }}
        onMouseLeave={() => {
          if (mouseOverPause) {
            this.mouseEnter = false;
            this.registerAutoRun();
          }
        }}
        onMouseEnter={() => {
          if (mouseOverPause) {
            this.mouseEnter = true;
            this.stopRun();
          }
        }}
      >
        <div ref={this.componentRef}>{component}</div>
        {isCopy && <div>{component}</div>}
      </div>
    );
  }
}
AutoScroller.defaultProps = {
  speed: 1,
  mouseOverPause: true,
  height: "100%",
  delayLoad: 500,
};
export default AutoScroller;
