import React, { Component } from 'react'

const fetchOptions = {
    method: 'GET',
    headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Pragma': 'no-cache',
        'Expires': '0'
    },
    credentials: 'same-origin'
}

const toJSON = res => res.json()

export default class ProviderModel extends Component {
    constructor () {
        super()
        this.state = {
            providers: [],
            fetchProviders: this.fetchProviders.bind(this),
            updateProvider: this.updateProvider.bind(this)
        }
        this.fetchProviders('DEPOSITS','ALL')
    }

    fetchProviders(type, countryCode) {
        return fetch(`/pay-methods/internal-api/config/providers
            ?type=${type}
            &countryCode=${countryCode}`.replace(/\s+/g, ''), fetchOptions)
        .then(toJSON)
        .then((result) => {
            this.setState({ providers: result.providers, type })
        })
    }

    addProvider = (data) => this.setState({ providers: [ ...this.state.providers, { ...data }]})
    findIndexof = (data) => this.state.providers.findIndex(provider => provider.methodKey === data.methodKey)
    moveProviderUp = (data) => {
        const providers = this.state.providers
        const ix = this.findIndexof(data)
        if (ix > 0) {
            const swapMethod = providers[ix - 1]
            providers[ix - 1] = providers[ix]
            providers[ix] = swapMethod
            this.setState({providers: [...providers]})
        }
    }
    moveProviderDown = (data) => {
        const providers = this.state.providers
        const ix = this.findIndexof(data)
        if (ix < providers.length -1) {
            const swapMethod = providers[ix + 1]
            providers[ix + 1] = providers[ix]
            providers[ix] = swapMethod
            this.setState({providers: [...providers]})
        }
    }
    deleteProvider = (data) => {
        const providers = this.state.providers
        const ix = this.findIndexof(data)
        providers.splice(ix, 1)
        this.setState({providers: [...providers]})
    }

    actOnOperation(operation, data) {
        switch(operation) {
            case 'ADD':
                this.addProvider(data)
                return
            case 'MOVEUP':
                this.moveProviderUp(data)
                return
            case 'MOVEDOWN':
                this.moveProviderDown(data)
                return
            case 'DELETE':
                this.deleteProvider(data)
            default:
        }
    }

    updateProvider(type, operation, data) {
        const postOptions = {
            ...fetchOptions,
            method: 'POST',
            body: JSON.stringify({
                ...data,
                type,
                operation
            })
        }
        return fetch('/pay-methods/internal-api/config/updateProvider', postOptions)
            .then(result => {
                this.actOnOperation(operation, data)
            })
    }

    render() {
        return this.props.children(this.state)
    }
}
