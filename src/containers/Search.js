import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { search, addToWatch, reset } from 'redux/modules/movie';

@connect(
    state => ({
        loading: state.movie.loading,
        movieData: state.movie.movieData,
        movieError: state.movie.movieError,
        watchedData: state.movie.watchedData
    }), { search, addToWatch, reset })

export default class Search extends Component {
    static propTypes = {
        search: PropTypes.func,
        movieData: PropTypes.object,
        addToWatch: PropTypes.func,
        watchedData: PropTypes.array,
        loading: PropTypes.bool,
        reset: PropTypes.func
    };
    constructor(props) {
        super(props);
        this.state = {
            watchText: null,
            inputname: null
        };
    }
    componentWillReceiveProps(nextProps) {
        if (!this.props.movieData && nextProps.movieData) {
            nextProps.watchedData.map(data => {
                if (data.Title === nextProps.movieData.Title) {
                    this.setState({
                        watchText: 'Already Watched'
                    });
                }
            });
        }
    }
    performSearch(event) {
        event.preventDefault();
        this.props.search(this.state.inputname);
        this.setState({
            watchText: null
        });
    }
    addToWatch() {
        const watchedData = [...this.props.watchedData];
        if (watchedData.length === 0) {
            watchedData.push(this.props.movieData);
        } else {
            let count = 0;
            watchedData.map(data => {
                if (data.Title === this.props.movieData.Title) {
                    count++;
                }
            });
            if (count === 0) watchedData.push(this.props.movieData);
        }
        this.props.addToWatch(watchedData);
        if (!this.state.watchText) {
            this.setState({
                watchText: 'Watched'
            });
        }
    }
    removeWatch(data) {
        const watchedData = [...this.props.watchedData];
        watchedData.map((item, index) => {
            if (item.Title === data.Title) {
                if (data.Title === this.props.movieData.Title) {
                    this.setState({
                        watchText: null
                    });
                }
                watchedData.splice(index, 1);
                this.props.addToWatch(watchedData);
            }
        });
    }
    reset() {
        this.props.reset();
        this.setState({
            inputname: null
        });
    }
    render() {
        const searchForm = (val) => (<form onSubmit={this.performSearch.bind(this)} className={'navbar-form ' + val}>
            <div className="input-group">
                <input type="text" value={this.state.inputname} onChange={(event) => { this.setState({ inputname: event.target.value }); }} className="serachMe" placeholder="Search Movies" />
                <div className="input-group-btn">
                    <button className="btn btn-default" style={{ display: 'none' }} type="submit">
                        <i className="glyphicon glyphicon-search"></i>
                    </button>
                </div>
            </div>
        </form>);
        console.log(this.props.movieData, this.props.watchedData);
        return (
            <div>
                <nav className="navbar navbar-inverse myHeader">
                    <div className="container">
                        <div className="navbar-header">
                            <a className="navbar-brand" onClick={this.reset.bind(this)}>MovieFlix : TLKN</a>
                        </div>
                        {searchForm('navbar-right')}
                    </div>
                </nav>
                {!this.props.movieData && !this.props.loading && <div className="text-center col-sm-12">
                    <i className="glyphicon glyphicon-facetime-video myhome"></i>
                    <h2>Start by searching movie name</h2>
                    <br />
                    {searchForm('')}
                </div>}
                {this.props.movieData && this.props.movieData.Response === 'True' && <div className="container">
                    <div className="col-sm-3">
                        <div className="thumbnail">
                            <img src={this.props.movieData.Poster === 'N/A' ? 'noimage.jpg' : this.props.movieData.Poster} onClick={this.addToWatch.bind(this)} />
                        </div>
                    </div>
                    <div className="col-sm-9">
                        <h3>{this.props.movieData.Title}</h3>
                        <p className="dimColor">{this.props.movieData.Released}</p>
                        <div className="row col-sm-12">
                            {this.props.movieData.Ratings.map(data => {
                                return (<div className="row col-sm-3">
                                    <p>{data.Value}</p>
                                    <p className="dimColor">{data.Source}</p>
                                </div>);
                            })}
                            {this.state.watchText && <div className="watched">
                                {this.state.watchText}
                            </div>}
                        </div>
                        <div className="clearfix"></div>
                        <h4>Description</h4>
                        <p className="dimColor">{this.props.movieData.Plot}</p>
                    </div>
                    <div className="clearfix"></div>
                    <hr />
                </div>}
                {this.props.movieData && this.props.movieData.Response === 'False' && <div className="col-sm-12 text-center">
                    <h2>{this.props.movieData.Error}</h2>
                </div>}
                {this.props.loading && <div className="loader"></div>}
                {this.props.watchedData.length > 0 && <div className="container">
                    <div className="col-sm-12">
                        <h4>Watched</h4>
                        <div className="row col-sm-12">
                            {this.props.watchedData.map(data => {
                                return (<div className="col-sm-2">
                                    <div className="thumbnail">
                                        <img className="visited" src={data.Poster === 'N/A' ? 'noimage.jpg' : data.Poster} onClick={this.removeWatch.bind(this, data)} />
                                        <i className="glyphicon glyphicon-thumbs-up likes left"></i>
                                        <i className="glyphicon glyphicon-thumbs-down likes right"></i>
                                    </div>
                                </div>);
                            })}
                        </div>
                    </div>
                </div>}
            </div>
        );
    }
}
