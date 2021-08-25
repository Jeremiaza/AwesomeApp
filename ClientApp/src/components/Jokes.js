import React, { useState, useEffect } from 'react'
import { connect } from 'react-redux'
import './Jokes.css';
import { DataGrid } from '@material-ui/data-grid';
import { getRandomJoke } from '../reducers/jokeReducer'
const columns = [
    {
        field: 'joke',
        headerName: 'The Joke',
        width: 500,
        editable: false,
    },
    {
        field: 'date',
        headerName: 'Date',
        width: 240,
        editable: false,

    },
    {
        field: 'id',
        headerName: 'ID',
        width: 150,
        editable: true,
    },
    {
        field: 'icon_url',
        headerName: 'Some Icon',
        width: 100,
        editable: false,
        renderCell: (params) => {
            return (
                <div className="d-flex justify-content-between align-items-center" style={{ cursor: "pointer" }}>
                    <img style={{ marginTop:"10%", height: 40, width: 40 }}
                      src={params.row.icon_url || "https://picsum.photos/40/40"}
                  />
                 </div>
            );
         }
    }
]
const Jokes = (props) => {
    
    if (props.jokes) {
        return (
            <div style={{ height: 600, width: '90%' }}>
                <DataGrid
                    rows={props.jokes}
                    columns={columns}
                    pageSize={10}
                    rowsPerPageOptions={[5]}
                    checkboxSelection
                    disableSelectionOnClick
                />
            </div>
        )
    } else { return <div>Loading</div> }
}

const mapStateToProps = (state) => {
    return { jokes: state.jokes }
}

export default connect(
    mapStateToProps,
    { getRandomJoke }
)(Jokes)