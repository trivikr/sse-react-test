import React from "react";

class Home extends React.Component {
  state = {
    data: []
  };

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    this.eventSource = new EventSource("http://localhost:3000/sse");
    this.eventSource.addEventListener("myEvent", event => {
      const data = this.state.data.concat({
        id: event.lastEventId,
        data: event.data
      });
      this.setState({ data });
    });
  }

  render() {
    return (
      <div>
        The event stream can be viewed below (updates every 0.5-5 seconds):
        <ul>
          {this.state.data.map(event => (
            <li key={event.id}>{event.data}</li>
          ))}
        </ul>
      </div>
    );
  }
}

export default Home;
