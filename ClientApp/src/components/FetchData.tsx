import * as React from 'react';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Link } from 'react-router-dom';
import { ApplicationState } from '../store';
import * as WeatherForecastsStore from '../store/WeatherForecasts';

// At runtime, Redux will merge together...
type WeatherForecastProps =
  WeatherForecastsStore.WeatherForecastsState // ... state we've requested from the Redux store
  & typeof WeatherForecastsStore.actionCreators // ... plus action creators we've requested
  & RouteComponentProps<{ startDateIndex: string }>; // ... plus incoming routing parameters


class FetchData extends React.PureComponent<WeatherForecastProps> {
  // This method is called when the component is first added to the document
  public componentDidMount() {
    this.ensureDataFetched();
  }

  // This method is called when the route parameters change
  public componentDidUpdate() {
    this.ensureDataFetched();
  }

  public render() {
    return (
      <React.Fragment>
        <h1 id="tabelLabel">Joke List</h1>
        <p>Just to test fetching jokes from an external API in the backend, then returning them here</p>
        {this.renderForecastsTable()}
        {this.renderPagination()}
      </React.Fragment>
    );
  }

  private ensureDataFetched() {
    const startDateIndex = parseInt(this.props.match.params.startDateIndex, 10) || 0;
    this.props.requestWeatherForecasts(startDateIndex);
  }

  private renderForecastsTable() {
    return (
      <table className='table table-striped' aria-labelledby="tabelLabel">
        <thead>
          <tr>
            <th>Date</th>
            <th>Id</th>
            <th>joke</th>
            <th>icon</th>
          </tr>
        </thead>
        <tbody>
          {this.props.forecasts.map((forecast: WeatherForecastsStore.WeatherForecast) =>
            <tr key={forecast.date}>
              <td>{forecast.date}</td>
              <td>{forecast.id}</td>
              <td>{forecast.joke}</td>
                  <td><img
                      src={forecast.icon_url}
                  />{}</td>
            </tr>
          )}
        </tbody>
      </table>
    );
  }

  private renderPagination() {
      const nextStartDateIndex = (this.props.startDateIndex || 0) + 1;

    return (
      <div className="d-flex justify-content-between">
            <Link className='btn btn-outline-secondary btn-sm' to={`/fetch-data/${nextStartDateIndex}`}>Next!</Link>
            {this.props.isLoading && <span>Loading...</span>}

      </div>
    );
  }
}

export default connect(
  (state: ApplicationState) => state.weatherForecasts, // Selects which state properties are merged into the component's props
  WeatherForecastsStore.actionCreators // Selects which action creators are merged into the component's props
)(FetchData as any); // eslint-disable-line @typescript-eslint/no-explicit-any
