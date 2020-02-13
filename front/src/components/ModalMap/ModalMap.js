import React, { Component } from 'react';
import { Button, Header, Icon, Modal } from 'semantic-ui-react';

class ModalMap extends Component {



    onClickClose = () => {
        this.props.close();
    }

    rederHelper() {
        console.log(this.props.info)
        if (this.props.info) {
            const { temperature , units, season , code, country, city} = this.props.info;
            return (
               <div>
                    <h2>Location: {country}-{code}, {city}</h2>
                    <h2>Temperature: {temperature}º{units}</h2>
                    <h2>Season: {season}</h2>
               </div>
            )
        }
        return null;
    }

    render() {
        return (
            <Modal open={this.props.isOpen} basic size='small'>
                <Header icon='map' content='Location Information' />
                <Modal.Content>
                    {this.rederHelper()}
                </Modal.Content>
                <Modal.Actions>
                    <Button onClick={this.onClickClose} color='green' inverted>
                        <Icon name='checkmark' /> Ok!
                </Button>
                </Modal.Actions>
            </Modal>


        )

    }
}

export default ModalMap