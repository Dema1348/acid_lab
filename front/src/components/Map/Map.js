import React, { Component } from 'react';
import GoogleMapReact from 'google-map-react';
import ModalMap from '../ModalMap/ModalMap';
import getForecast from '../../api';
import './Map.css';

import { Dimmer, Loader, Modal, Button } from 'semantic-ui-react';

class Map extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false
    };
  }

  static defaultProps = {
    apiKey: { key: 'AIzaSyDeLRRKZWYCrTTxBRpXmdIvGJcaWMYmiFo' },
    center: {
      lat: 33.458262,
      lng: -70.673619
    },
    zoom: 3,
    options: {
      disableDefaultUI: true,
      draggable: true,
      minZoom: 3,
      maxZoom: 3,
      scrollwheel: false,
      zoomControl: false
    }
  };

  onClickMap = async ({ lat, lng }) => {
    try {
      this.setState({ loading: true, isOpen: false, info: null, error: null });
      const { data } = await getForecast(lat, lng);
      this.setState({ loading: false, isOpen: true, info: data, error: null });
    } catch (error) {
      console.log(error);
      this.setState({
        loading: false,
        isOpen: false,
        info: null,
        error: true
      });
    }
  };

  isLoading() {
    if (this.state.loading) {
      return (
        <Dimmer active>
          <Loader>Loading..</Loader>
        </Dimmer>
      );
    }

    return null;
  }

  closeModal = () => {
    this.setState({ isOpen: false });
  };

  closeError = () => {
    this.setState({ error: false });
  };

  render() {
    return (
      <div>
        {this.isLoading()}
        <div className="size">
          <GoogleMapReact
            bootstrapURLKeys={this.props.apiKey}
            defaultCenter={this.props.center}
            defaultZoom={this.props.zoom}
            options={this.props.options}
            onClick={this.onClickMap}
          ></GoogleMapReact>
          <ModalMap
            info={this.state.info}
            isOpen={this.state.isOpen}
            close={this.closeModal}
          />
          <Modal
            open={this.state.error}
          >
            <Modal.Header>Error!</Modal.Header>
            <Modal.Content>
                <p>An error has occurred, try again</p>
            </Modal.Content>
            <Modal.Actions>
              <Button
                icon="check"
                content="All Done"
                onClick={this.closeError}
              />
            </Modal.Actions>
          </Modal>
          />
        </div>
      </div>
    );
  }
}

export default Map;
