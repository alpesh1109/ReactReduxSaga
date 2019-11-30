import React from 'react';
import { connect } from 'react-redux';
import { noteAction } from './Actions/noteAction';
import PropTypes from 'prop-types';

class Note extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            notedata: [],
            title: '',
            body: '',
            noteid: '',
            notetit: ''
        };
        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
        this.removenote = this.removenote.bind(this);
        this.editnote = this.editnote.bind(this);
    }
    //   simpleAction = (event) => {
    //     this.props.simpleAction();
    //    }
    handleChange(e) {
        this.setState({ [e.target.name]: e.target.value });
    }


    handleSubmit = (event) => {

        var noteid = this.state.noteid;
        var notetit = this.state.notetit;
        var tempd = this.state.notedata;
        var title = this.state.title;
        var body = this.state.body;

        if (noteid !== '') {
            let index = tempd.findIndex(x => x.title === notetit);

            tempd[index].title = title;
            tempd[index].body = body;

            this.setState({
                notedata: tempd,
                title: '',
                body: ''
            });
        }
        else {
            const { note } = this.props;

            if (title !== '' && body !== '') {
                var notedata = [{
                    title,
                    body
                }]
                var temp = [...note, ...notedata];

                this.props.noteAction(temp);
                this.setState({
                    notedata: temp,
                    title: '',
                    body: ''
                })
            }

        }
        event.preventDefault();
    }
    removenote = (id) => {
        let noted = this.state.notedata;
        noted.splice(id, 1);
        this.setState({
            notedata: noted
        })

    }
    editnote = (id, title, body) => {

        this.setState({
            title: title,
            body: body,
            noteid: id,
            notetit: title
        })

    }
    render() {
        const { notedata } = this.state;
        var d = notedata.map((n, index) => {

            return (<div class="card">
                <div class="card-body">
                    <label>{n.title}</label><br />
                    <label>{n.body}</label><br />
                    <span style={{ float: 'right', marginTop: '-15%' }} onClick={() => this.removenote(index)}><i class="fa fa-times" aria-hidden="true"></i></span>
                    <span style={{ float: 'right' }} onClick={() => this.editnote(index, n.title, n.body)}><i class="fa fa-pencil-square-o" aria-hidden="true"></i></span>
                </div>
            </div>);
        })

        return (

            <div class="container">
                <nav class="navbar navbar-expand-sm bg-secondary navbar-dark">
                    <ul class="navbar-nav">
                        <li class="nav-item active">
                            <label> G Note</label>
                        </li>

                    </ul>
                </nav>
                <div class="row">
                    <div class="col-sm-6">
                        <React.Fragment>
                            {
                                d
                            }
                        </React.Fragment>
                    </div>
                    <div class="col-sm-6">
                        <div class="card">
                            <div class="card-body">

                                <div class="form-group">
                                    <label for="title">Title:</label>
                                    <input type="title" class="form-control" name="title" id="title" value={this.state.title} onChange={this.handleChange} />
                                </div>
                                <div class="form-group">
                                    <label for="pwd">Body:</label>
                                    <textarea class="form-control" rows="5" id="body" name="body" value={this.state.body} onChange={this.handleChange}></textarea>
                                </div>

                                <button type="submit" style={{ float: 'right' }} class="btn btn-primary" onClick={this.handleSubmit}>Save</button>

                            </div>
                        </div>
                    </div>
                </div>

            </div>

        );
    }
}
Note.propTypes = {
    note: PropTypes.array.isRequired
};
const mapStateToProps = state => ({
    note: state.noted.notedata
})

export default connect(mapStateToProps, { noteAction })(Note);
