import React, { Component } from 'react';

import { Container, Row, Col, Card } from 'react-bootstrap'
import { FaSearch } from 'react-icons/fa';

import { Loading } from 'view/Loading';
import EditsForm from './EditsForm';
import { SeqViz } from 'seqvizcustom/viewer';

import SequenceBox from "../Shared/SequenceBox";
import OrganismBox from "../Shared/OrganismBox";

export class Submission extends Component {

    constructor(props) {
        super(props);
        this.state = {
            selectedEdit: 0,
            selectedSequence: 0,
            selection: {
                start: undefined,
                end: undefined,
                sequence: undefined,
            },
            search: '',
            seqvizActive: false,
        };
        if (this.props.edits.length > 0) {
            this._params = JSON.parse(JSON.stringify(this.props.edits[0].options));
            this._staticOptions = {
                repairMutation: {value: false},
                silencePAM: {value: false},
            }
        } else {
            this._params = {};
            this._staticOptions = {
                repairMutation: {value: false},
                silencePAM: {value: false},
            }
        }

    }

    componentDidUpdate(prevProps) {
        if (this.props.edits.length !== prevProps.edits.length || Object.keys(this._params).length === 0) {
            if(this.props.edits.length !== 0) {
                this._params = JSON.parse(JSON.stringify(this.props.edits[0].options));
            }
        }
    }

    _handleEditChange = (e) =>  {
        const index = e.target.value;
        this.setState({
            selectedEdit: index
        });
        this._params = JSON.parse(JSON.stringify(this.props.edits[index].options));
    };

    _handleSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const { sequenceType, submitJob, sequenceObject } = this.props;
        let jobData = {
            sequenceType: sequenceType.toLowerCase(),
            //objectId: sequenceId,
            sequence: sequenceObject.name,
            edit: this.props.edits[this.state.selectedEdit].name,
            options: Object.entries({...this._params, ...this._staticOptions}).filter(([k, v]) => v.value).map(([k,v]) => k+'='+v.value).join(','),
        };
        submitJob(jobData);
    };

    _handleOptionChange = (option, value) => {
        this._params[option].value = value;

    };

    _handleStaticOptionChange = (option, value) => {
        this._staticOptions[option].value = value;
    };

    _updateSelection = (selection) => {
        const { start, end, seq: sequence } = selection;
        const { upstream=0 } = this.props;
        this.setState({
            selection: {
                start: Math.min(start, end) + 1 + upstream,
                end: Math.max(start, end) + 1 + upstream,
                sequence,
            }
        });
    };

    render() {

        const { loading, submitError, isSubmitting, sequenceObject, sequenceError,
            sequenceType, organism, edits, annotations, translations, canSubmit, upstream=0 } = this.props;

        return (
            <Container fluid>
                <Row>
                    <Col>
                        <Card body>
                            <EditsForm
                                edits={edits}
                                selectedEdit={this.state.selectedEdit}
                                editChange={this._handleEditChange}
                                optionChange={this._handleOptionChange}
                                handleSubmit={this._handleSubmit}
                                staticOptionChange={this._handleStaticOptionChange}
                                canSubmit={canSubmit}
                                isSubmitting={isSubmitting}
                                error={submitError}
                            />
                        </Card>
                    </Col>
                </Row>
                <br/>
                <Row>
                    <Col>
                            <Card body style={{fontFamily: 'monospace', fontSize:12}}>
                            <Row>
                                <Col style={{borderRight: '1px solid #e0e7e9'}}>
                                    <OrganismBox organism={organism}/>
                                </Col>
                                <Col style={{borderRight: '1px solid #e0e7e9'}}>
                                    <SequenceBox baseURL={organism.sequenceSearch} sequenceType={sequenceType} sequenceObject={sequenceObject}/>
                                </Col>
                                <Col style={{overflowY: 'auto', height: '15vh'}}>
                                    <label style={{display: 'block'}}>Selection</label>
                                    Start: {this.state.selection.start} <br/>
                                    End: {this.state.selection.end} <br/>
                                    Selected sequence: {this.state.selection.sequence}
                                </Col>
                            </Row>
                        {loading ?
                            <div style={{ height: '55vh', verticalAlign: 'middle', textAlign: 'center', lineHeight: '55vh'}}>
                                <Loading size={10} />
                            </div> : ( sequenceError ? (sequenceError.response.status === 404 ? 'Sequence not found' : sequenceError.message) :
                            <>
                                <div className="d-flex justify-content-end">
                                    <div className="searchbar">
                                        <input
                                            className="search_input"
                                            type="text"
                                            onChange={e => this.setState({search: e.target.value})}
                                        />
                                        <span className="search_icon">
                                            <FaSearch />
                                        </span>
                                    </div>
                                </div>
                            <div onMouseEnter={e => this.setState({seqvizActive: true})} onMouseLeave={e => this.setState({seqvizActive: false})} >
                            <SeqViz
                                name="SubmissionSeqViz"
                                seq={sequenceObject.sequence && sequenceObject.sequence.toLocaleUpperCase()}
                                annotations={annotations}
                                translations={translations}
                                style={{ height: "55vh", width: "100%" }}
                                viewer="linear"
                                showComplement={false}
                                onSelection={(sele) => {this._updateSelection(sele)}}
                                search={{query: this.state.search, mismatch: 0}}
                                upstream={-upstream}
                                copyEvent={event => event.key === "c" && (event.metaKey || event.ctrlKey) && this.state.seqvizActive}
                            />
                            </div>
                            </> )
                        }
                        </Card>
                    </Col>
                </Row>
            </Container>
        )
    }
}