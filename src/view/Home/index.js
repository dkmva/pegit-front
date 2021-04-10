import React from 'react'
import { connect } from "react-redux";
import Link from 'redux-first-router-link'

import { FaRegQuestionCircle, FaExternalLinkAlt } from 'react-icons/fa';

import { Container, Row, Col, Card, Form, Button, OverlayTrigger, Popover } from "react-bootstrap";
import { AsyncTypeahead, Typeahead, Highlighter } from 'react-bootstrap-typeahead';

import { setCustomSequence } from "state/customsequence";
import { searchGenes, requestSearchClinVar, clearSearchGenes, selectOrganism,
         removeEdit, resetEditList, requestAddEdit,requestAddMultiple, changeAdvancedOption, tickRunBowtie, tickDesignPrimers, changeProjectName } from "state/home";
import { requestGene } from "state/gene";
import { submitJob, submitClinVar } from "state/job";
import { selectNuclease, selectCloningStrategy, changeNucleaseOption, changeCloningOption } from "state/nucleases";
import { routeGene, routeTranscript, routeCustomSequence, routeRegion } from 'state/routes';

import LogoRow from "view/Home/components/LogoRow";
import TranscriptList from "view/Home/components/TranscriptList";
import ClinVarSelection from "view/Home/components/ClinVarSelection";
import SelectedEdits from "view/Home/components/SelectedEdits";
import { LoadingCard } from 'view/Loading';

export class Home extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            pasteSequence: false,
            showSelectedGene: false,
            query: '',
            dnaSeq: '',
            clinVarQuery: '',
            dnaSeqInvalid: false,
            open: false,
        };
    }

    _handleOrganismChange = (organism) => {
        this._geneSelector && this._geneSelector.getInstance().clear();
        this.props.clearSearchGenes();
        this.props.selectOrganism(organism[0]);
        this.setState( {
            showSelectedGene: false,
        });
    };

    _setCustomSequence = () => {
        let {dnaSeq, selectedOrganism} = this.state;
        let name = 'customSequence';
        let match = dnaSeq.match(/^(>.*\n)?([actgACTG\n]+)$/);
        if (match) {
            if(match[1]) {
                name = match[1].substring(1, match[1].length-1);
                name = name.split(/\s+/)[0]
            }
            dnaSeq = match[2].replace(/(\r\n|\n|\r)/gm, "");
            this.props.setCustomSequence(name, dnaSeq, selectedOrganism);
        } else {
            this.setState({dnaSeqInvalid: true});
        }
    };

    _handleClinVarSearch = () => {
        this.props.searchClinVar(this.state.clinVarQuery);
    };

    _handleAddClinvar = (clinvarId, repair) => {
        this.props.requestAddEdit({
            clinvarId,
            repair: repair ? 'true' : 'false',
        })

    };

    _handleSearch = (query) => {
        this.setState({query});
        this.props.searchGenes(this.props.selectedOrganism, query);
    };

    _handleGeneSelect = (s) => {
        let selectedGene = s[0];
        if(selectedGene){
            this.props.loadGene(selectedGene.id);
            this.setState({showSelectedGene: true})
        } else {
            this.setState({showSelectedGene: false});
        }
    };

    _handleJobSubmit = (event) => {
        event.preventDefault();
        event.stopPropagation();
        const { selectedOrganism, edits, submitJob, submitClinVar,
            advancedOptions, nucleaseOptions, cloningOptions,
            selectedNuclease, selectedCloningStrategy,
            runBowtie, designPrimers, projectName } = this.props;
        let jobData = {
            edits,
            advancedOptions,
            jobName: projectName,
            nucleaseOptions: Object.fromEntries(Object.entries(nucleaseOptions).map(([k, v]) => [k, v.value])),
            cloningOptions: Object.fromEntries(Object.entries(cloningOptions).map(([k, v]) => [k, v.value])),
            nuclease: selectedNuclease,
            cloningStrategy: selectedCloningStrategy,
            runBowtie,
            designPrimers,
        }
        if(selectedOrganism.name === 'ClinVar') {
            submitClinVar(jobData)
        } else {
            jobData.organism = selectedOrganism.id;
            submitJob(jobData);
        }

    };

    _parseImportFile = (e) => {

        const { requestAddMultiple, selectedOrganism } = this.props;
        const file = e.target.files[0];
        const reader = new FileReader();
        let edits = [];
        let error = undefined;
        reader.onload = function (e) {
            const lines = e.target.result.split(/\r?\n/).filter(l => l.length > 0);
            if(selectedOrganism && selectedOrganism.name === 'ClinVar'){
                lines.forEach((l) => {
                    l = l.split(/\s+/);
                    if(l.length !== 2) {
                        error = 'Invalid clinVar edits file, file should contain two tab-separated columns (clinvarID\trepair)';
                    }
                    let [ clinvarId, repair] = l;
                    edits.push({clinvarId, repair})
                });
            } else {
                lines.forEach((l) => {
                    l = l.split(/\s+/);
                    if(l.length !== 4) {
                        error = 'Invalid edits file, file should contain four tab-separated columns (sequence_type\tsequence\tedit\toptions)';
                    }
                    let [ sequenceType, sequence, edit, options] = l;
                    edits.push({sequenceType, sequence, edit, options})
                });
            }
            if(error) {
                alert(error);
            } else {
                requestAddMultiple(edits)
            }
        };
        reader.readAsText(file);
        e.target.value = null;
    };


    render() {
        let { organisms, organismsLoading, selectedOrganism,
            gene: selectedGene, geneLoading,
            edits, invalid, nucleases, selectedNuclease, selectNuclease, selectedCloningStrategy, selectCloningStrategy,
            removeEdit, resetEditList, isParsing, isSubmitting,
            advancedOptions, changeAdvancedOption,
            nucleaseOptions, changeNucleaseOption,
            cloningOptions, changeCloningOption,
            designPrimers, changeDesignPrimers,
            runBowtie, changeRunBowtie,
            projectName, changeProjectName } = this.props;
        const { searching: clinVarSearching, results: clinVarResults } = this.props.clinvar;
        const { query, pasteSequence, dnaSeq, clinVarQuery, dnaSeqInvalid } = this.state;
        let { showSelectedGene } = this.state;
        organisms = [{id: null, name: 'ClinVar', annotation: 'ClinVar'}, ...organisms ];
        showSelectedGene = showSelectedGene && selectedGene.transcripts;
        const clinVar = selectedOrganism && selectedOrganism.name === 'ClinVar';
        const genes = this.props.genes.values.hasOwnProperty(query) ? this.props.genes.values[query] : [];

        let selectRegion = false;
        if (dnaSeq.match(/^.+:\d+-\d+/)) {
            selectRegion = true;
        }


        return (
            <Container>
                <LogoRow />
                <Row>
                    <Col>
                        <Card body>
                            <Form>
                                <Row>
                                    <Col md={5}>
                                        <label>Genome <OverlayTrigger
                                            placement="right"
                                            overlay={
                                                <Popover id="nucleaseTooltip">
                                                    <Popover.Content>
                                                        If your desired organism is not available, you can select any organism and paste custom sequences for your desired edits. <br/>
                                                        Check the FAQ if you would like us to add a specific organism
                                                    </Popover.Content>
                                                </Popover>
                                            }
                                        >
                                            <FaRegQuestionCircle/>
                                        </OverlayTrigger>
                                            <Typeahead
                                                id="organism"
                                                clearButton
                                                labelKey="name"
                                                filterBy={['name', 'assembly']}
                                                options={organisms}
                                                isLoading={organismsLoading}
                                                placeholder="Type a genome name or ID"
                                                disabled={edits.length > 0}
                                                selected={selectedOrganism ? [selectedOrganism] : []}
                                                onChange={this._handleOrganismChange}
                                                renderMenuItemChildren={(option, props) => (
                                                    <React.Fragment key={option.name}>
                                                        <Highlighter search={props.text}>
                                                            {option.name}
                                                        </Highlighter>
                                                        <br/>
                                                        <small>
                                                            <Highlighter search={props.text}>
                                                                {option.annotation}
                                                            </Highlighter>
                                                        </small>
                                                    </React.Fragment>
                                                )}
                                            />
                                        </label>
                                        {selectedOrganism && selectedOrganism.source && <a href={selectedOrganism.source} target="_blank" rel="noopener noreferrer"><small style={{display: 'block'}}>{selectedOrganism.annotation} <FaExternalLinkAlt/></small></a>}
                                    </Col>
                                    <Col md={5}>
                                        <label> {clinVar && <React.Fragment>Search ClinVar <OverlayTrigger
                                            placement="right"
                                            overlay={
                                                <Popover id="editTooltip1">
                                                    <Popover.Content>Click me for help</Popover.Content>
                                                </Popover>
                                            }
                                        >
                                        <span>
                                            <OverlayTrigger
                                                placement="right"
                                                trigger="click"
                                                overlay={
                                                    <Popover id="editTooltip2">
                                                        <Popover.Content>Perform a text search in ClinVar. For info on how to construct queries, see <a href="https://www.ncbi.nlm.nih.gov/clinvar/docs/help/" target="_blank"  rel="noopener noreferrer">here</a></Popover.Content>
                                                    </Popover>
                                                }
                                            >
                                                <FaRegQuestionCircle />
                                            </OverlayTrigger>
                                        </span>
                                        </OverlayTrigger></React.Fragment>}
                                                { !clinVar && pasteSequence && <React.Fragment>Target sequence <OverlayTrigger
                                                    placement="right"
                                                    overlay={
                                                        <Popover id="editTooltip1">
                                                            <Popover.Content>Input a custom DNA sequence. Use FASTA format to name the sequence.<br/>
                                                                Or enter genetic coordinates in the format "CHROMOSOME:START-END"</Popover.Content>
                                                        </Popover>
                                                    }
                                                >
                                                    <FaRegQuestionCircle />
                                                </OverlayTrigger></React.Fragment> }
                                                { !clinVar && !pasteSequence && 'Gene' }
                                            {clinVar && <Form.Control placeholder="Search ClinVar" value={clinVarQuery} onChange={(e) => this.setState({ clinVarQuery: e.target.value })} onKeyPress={e => {if (e.key === "Enter") {this._handleClinVarSearch();}}}/>}
                                            { !clinVar && pasteSequence && <><Form.Control as="textarea" isInvalid={dnaSeqInvalid}  value={dnaSeq} onChange={(e) => this.setState({ dnaSeq: e.target.value, dnaSeqInvalid: false })}/>
                                            {!clinVar && pasteSequence && selectedOrganism && <OverlayTrigger
                                                placement="bottom"
                                                trigger="click"
                                                overlay={
                                                    <Popover id="editTooltip2">
                                                        <Popover.Content>
                                                            {selectedOrganism.scaffolds.map(s => <p key={s}>{s}</p>)}
                                                        </Popover.Content>
                                                    </Popover>
                                                }
                                            >
                                                <Button variant="link">Available sequences</Button>
                                            </OverlayTrigger>}
                                            <Form.Control.Feedback type="invalid">
                                                Only DNA sequences or genetic coordinates(format "CHROMOSOME:START-END") are allowed
                                            </Form.Control.Feedback></> }
                                            {!clinVar && !pasteSequence &&<AsyncTypeahead
                                                id="gene"
                                                clearButton
                                                minLength={1}
                                                useCache={false}
                                                isLoading={this.props.genes.loading}
                                                disabled={!selectedOrganism}
                                                labelKey="name"
                                                filterBy={['name', 'geneId']}
                                                options={genes}
                                                placeholder={!selectedOrganism ? "Select a genome first" : "Type a gene name or ID"}
                                                onChange={this._handleGeneSelect}
                                                onSearch={this._handleSearch}
                                                ref={(ref) => this._geneSelector = ref}
                                                renderMenuItemChildren={(option, props, index) => (
                                                    <React.Fragment key={option.geneId}>
                                                        <Highlighter search={props.text}>
                                                            {option.name}
                                                        </Highlighter>
                                                        <br/>
                                                        <small>
                                                            <Highlighter search={props.text}>
                                                                {option.geneId}
                                                            </Highlighter>
                                                        </small>
                                                    </React.Fragment>
                                                )}
                                            /> }
                                        </label>
                                    </Col>
                                    <Col md={2}>
                                        <br/>
                                        { !clinVar && pasteSequence && (dnaSeq.length && selectedOrganism ? (
                                            selectRegion ? <Link className="btn btn-outline-success" to={routeRegion(dnaSeq)}>Select</Link> : <Button variant="outline-success" onClick={this._setCustomSequence}>Select</Button>
                                        ) : <Button variant="outline-success" disabled>Select</Button>) }
                                        { !clinVar && !pasteSequence && (showSelectedGene ? <Link className="btn btn-outline-success" to={routeGene(selectedGene.id)}>Select</Link> : <Button variant="outline-success" disabled>Select</Button>) }
                                        { clinVar && <Button onClick={this._handleClinVarSearch} variant="outline-success" disabled={!clinVarQuery}>Search</Button>}
                                    </Col>
                                </Row>
                            </Form>
                            <Row className="justify-content-center">
                                <Col md="auto">
                                    {!clinVar && <Button onClick={() => this.setState({pasteSequence: !pasteSequence, showSelectedGene: false})}>{pasteSequence ? 'Gene search' : 'Custom sequence / Genomic coordinates'}</Button>}
                                </Col>
                            </Row>
                        </Card>
                    </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                        {(geneLoading || clinVarSearching) && <LoadingCard size={10} style={{ textAlign: 'center', lineHeight: "calc(30vh - 40px)", height: "30vh" }}/> }
                        { !clinVarSearching && clinVar && clinVarResults.length > 0 && <ClinVarSelection clinVarResults={clinVarResults} handleClinVarSubmit={this._handleAddClinvar}/> }
                        {!clinVar && showSelectedGene && <TranscriptList selectedGene={selectedGene} selectedOrganism={selectedOrganism} routeTranscript={routeTranscript} />
                        }
                        </Col>
                </Row>
                <Row>
                    <Col>
                        <br/>
                        <SelectedEdits
                            edits={edits}
                            invalid={invalid}
                            editColumns={ clinVar ? [
                                {dataField: 'idx', text: '#', csvExport: false},
                                {dataField: 'clinvarId', text: 'ClinVar ID', csvType: 'Number'},
                                {dataField: 'repair', text: 'Repair', csvType: 'Number'}
                            ] : [
                                {dataField: 'idx', text: '#', csvExport: false},
                                {dataField: 'sequenceType', text: 'Sequence Type', csvType: 'Number'},
                                {dataField: 'sequence', text: 'Sequence', csvType: 'Number'},
                                {dataField: 'edit', text: 'Edit', csvType: 'Number'},
                                {dataField: 'options', text: 'Options', csvType: 'Number'},
                            ]}
                            removeEdit={removeEdit}
                            resetEditList={resetEditList}
                            selectedOrganism={selectedOrganism}
                            advancedOptions={advancedOptions} changeAdvancedOption={changeAdvancedOption}
                            nucleaseOptions={nucleaseOptions} changeNucleaseOption={changeNucleaseOption}
                            cloningOptions={cloningOptions} changeCloningOption={changeCloningOption}
                            runBowtie={runBowtie} changeRunBowtie={changeRunBowtie}
                            designPrimers={designPrimers} changeDesignPrimers={changeDesignPrimers}
                            handleJobSubmit={this._handleJobSubmit}
                            parseImportFile={this._parseImportFile}
                            isParsing={isParsing}
                            isSubmitting={isSubmitting}
                            nucleases={nucleases}
                            selectedNuclease={selectedNuclease}
                            selectNuclease={selectNuclease}
                            selectedCloningStrategy={selectedCloningStrategy}
                            selectCloningStrategy={selectCloningStrategy}
                            projectName={projectName}
                            changeProjectName={changeProjectName}
                        />
                    </Col>
                </Row>
            </Container>
        )
    }
}

const mapStateToProps = (state) => {
    let { values: organisms, loading: organismsLoading } = state.organisms;
    let { gene, loading: geneLoading } = state.gene;
    let { nucleases, selectedNuclease, selectedCloningStrategy, nucleaseOptions, cloningOptions } = state.nucleases;
    let { clinvar, edits, genes, selectedOrganism, advancedOptions, addEdit, designPrimers, runBowtie, projectName } = state.home;

    return {
        advancedOptions,
        clinvar,
        edits: edits.validated || [],
        gene,
        genes,
        geneLoading,
        invalid: edits.errors || [],
        isParsing: addEdit.submitting,
        isSubmitting: state.job.submitting,
        nucleases,
        nucleaseOptions,
        cloningOptions,
        organisms,
        organismsLoading,
        selectedNuclease,
        selectedOrganism,
        selectedCloningStrategy,
        runBowtie,
        designPrimers,
        projectName,
    }
};

const mapDispatchToProps = (dispatch) => {
    return {
        searchGenes: (organism, query) => dispatch(searchGenes(organism, query)),
        loadGene: (id) => dispatch(requestGene(id)),
        clearSearchGenes: () => dispatch(clearSearchGenes()),
        setCustomSequence: (name, sequence, organism) => {
            dispatch(setCustomSequence(name, sequence, organism));
            dispatch(routeCustomSequence());
        },
        searchClinVar: (query) => dispatch(requestSearchClinVar(query)),
        submitClinVar: (jobData) => dispatch(submitClinVar(jobData)),
        submitJob: (jobData) => dispatch(submitJob(jobData)),
        selectOrganism: (organism) => dispatch(selectOrganism(organism)),
        removeEdit: (idx) => dispatch(removeEdit(idx)),
        resetEditList: () => dispatch(resetEditList()),
        requestAddEdit: (edit) => dispatch(requestAddEdit(edit)),
        requestAddMultiple: (edits) => dispatch(requestAddMultiple(edits)),
        changeAdvancedOption: (option, value) => dispatch(changeAdvancedOption(option, value)),
        changeNucleaseOption: (option, value) => dispatch(changeNucleaseOption(option, value)),
        changeCloningOption: (option, value) => dispatch(changeCloningOption(option, value)),
        selectNuclease: (e) => dispatch(selectNuclease(e.target.value)),
        selectCloningStrategy: (e) => dispatch(selectCloningStrategy(e.target.value)),
        changeRunBowtie: () => dispatch(tickRunBowtie()),
        changeDesignPrimers: () => dispatch(tickDesignPrimers()),
        changeProjectName: (e) => dispatch(changeProjectName(e.target.value)),
    }
};

export const ConnectedHome = connect(mapStateToProps, mapDispatchToProps)(Home);
