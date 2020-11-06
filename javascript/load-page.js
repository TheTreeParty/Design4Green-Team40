const DEFERRED_CONTENT = `<div id='deferred'>
<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/5.0.0-alpha2/css/bootstrap.min.css"
        integrity="sha384-DhY6onE6f3zzKbjUPRc2hOzGAdEf4/Dz+WJwBvEYL/lkkIsI3ihufq9hk9K4lVoK" crossorigin="anonymous">
    <div id="container" class="d-flex flex-column mt-5 mb-5">
        <div id="search-box"
            class="d-flex flex-row bg-light p-3 align-items-center rounded shadow-sm justify-content-between">
            <div class="flex-item d-flex flex-row align-items-center">
                <h1 class="h3 mb-0">Indice de fragilité numérique</h1>

                <button id="search-button" class="ml-3 search-button btn btn-outline-secondary rounded dropdown-toggle"
                    data-toggle="modal" data-target="#search-dropdown" aria-haspopup="true">
                    Rechercher
                </button>
            </div>


            <button id="print-page" class="flex-item btn btn-outline-secondary ml-3" onclick="window.print()">
                Imprimer cette page
            </button>
        </div>

        <div id="results" class="mt-2">
            <div id="advice" class=" bg-light mt-3 rounded shadow-sm">
                <div id="scores-table" class="container d-flex flex-row">
                    <div class="col-sm p-3">
                        <div class="lead">Accès à l'information</div>
                        <div class="text-muted"> Identifier des territoires mal couverts par une offre de service
                            d'information ou des populations qui auront des difficultés à comprendre l'information.
                        </div>
                    </div>
                    <div class="col-sm p-3">
                        <div class="lead">Accès aux interfaces numériques</div>
                        <div class="text-muted"> Identifier des territoires mal couverts par les réseaux ou dans
                            lesquels des populations auront des difficultés financières à y accéder. </div>
                    </div>
                    <div class="col-sm p-3">
                        <div class="lead">Compétences numériques</div>
                        <div class="text-muted"> Identifier des populations parmi lesquelles s'observe une fréquence
                            d'illectronisme ou difficulté à utiliser internet. </div>
                    </div>
                    <div class="col-sm p-3">
                        <div class="lead">Compétences administratives</div>
                        <div class="text-muted"> Identifier des populations parmi lesquelles s'observent des difficultés
                            à accomplir des procédures administratives.</div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <div id="search-dropdown" class="modal fade">
        <div class="modal-dialog p-0 shadow">
            <div class="modal-content">
                <input id="search-input" type="text" class="form-control rounded-top"
                    placeholder="Rechercher le nom d'une commune ou son code postal">
                <div id="suggestions" class="">
                </div>
            </div>
        </div>
    </div>

    <div id="prototypes" class="d-none">
        <div id="commune-spinner-prototype" class="p-0 bg-light mt-3 rounded shadow-sm">
            <div class="result-table-head p-3 d-flex flex-row align-items-center justify-content-between">
                <div class="flex-item d-flex flex-row align-items-center">
                    <div class="flex-item">
                        <h1 class="commune-name h3 mb-0">Hello</h1>
                    </div>
                    <div class="flex-item ml-2">
                        <div class="spinner-border text-secondary" role="status">
                            <span class="visually-hidden">Loading...</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div id="suggestion-item-prototype" class="suggestion-item d-flex flex-row align-items-center p-3"
            data-dismiss="modal">
            <div class="flex-item">
                <h5 class="suggestion-item-commune-name mb-0"></h5>
            </div>
            <div class="flex-item ml-2">
                <div class="suggestion-item-post-code lean text-muted"></div>
            </div>
        </div>

        <div id="score-digits-prototype" class="score-digits-display col-sm d-flex flex-column p-3">
            <div class="d-flex flex-row align-items-center">
                <div class="score-digits-value flex-item lead"></div>
                <div class="score-digits-delta flex-item lead text-muted ml-2"></div>
            </div>
        </div>

        <div id="score-digits-no-delta-prototype" class="score-digits-display col-sm d-flex flex-column p-3">
            <div class="score-digits-value flex-item lead">
            </div>
        </div>

        <div id="commune-report-prototype" class="commune-report p-0 bg-light mt-3 rounded shadow-sm">
            <div class="result-table-head p-3 d-flex flex-row align-items-center justify-content-between">
                <div class="flex-item d-flex flex-row align-items-center">
                    <div class="flex-item">
                        <h1 class="commune-name h3 mb-0"></h1>
                    </div>
                    <div class="commune-details ml-2 flex-item lead text-muted">
                    </div>
                </div>

                <div class="flex-item d-flex flex-row align-items-center">
                    <button class="close-button btn btn-outline-secondary">Fermer</button>
                </div>

            </div>

            <div class="scores-table p-0">
                <div class="score-table-head d-flex flex-row border-top">
                    <div class="head-column col-sm p-3 border-right">
                        <span class="lead text-muted">Score</span>
                    </div>
                    <div class="head-column-globale col-sm p-3 lead text-muted">
                        Score globale
                    </div>
                    <div class="head-column-accinformation col-sm p-3 lead text-muted">
                        Accès à l'information
                    </div>
                    <div class="head-column-accnumeriques col-sm p-3 lead text-muted">
                        Accès aux interfaces numériques
                    </div>
                    <div class="head-column-compadministratives col-sm p-3 lead text-muted">
                        Compétences administratives
                    </div>
                    <div class="head-column-compnumeriques col-sm p-3 lead text-muted">
                        Compétences numériques
                    </div>

                </div>
                <div class="score-row-commune d-flex flex-row border-top">
                    <div class="score-row-head col-sm p-3 border-right align-items-center">
                        <span class="lead">Moyenne de la commune</span>
                    </div>
                </div>
                <div class="score-row score-row-departement d-flex flex-row border-top">
                    <div class="score-row-head col-sm p-3 border-right align-items-center">
                        <span class="lead">Moyenne du département</span>
                    </div>
                </div>
                <div class="score-row score-row-region d-flex flex-row border-top border-bottom">
                    <div id="region-score-head-row"
                        class="score-row-head commune-score-item col-sm p-3 border-right align-items-center">
                        <span class="lead">Moyenne de la région</span>
                    </div>
                </div>
            </div>

            <div class="row p-3">
                <span class="conclusion lead text-muted mb-0">
                    Le score globale de cette commune est <span class="font-weight-normal conclusion-departement">plus
                        élevé</span> que
                    celui de son département et, est <span class="font-weight-normal conclusion-region">moins
                        élevé</span> que
                    sa région.
            </div>
        </div>
    </div>
</div>`;

const deferredElements = $($.parseHTML(DEFERRED_CONTENT));
$('#temp').replaceWith(deferredElements.children());
$('#search-input').on('input', () => {
    const inputText = $('#search-input').val();
    fetchSuggestions(inputText);
});

const modal = new bootstrap.Modal(document.getElementById('search-dropdown'));
modal.show();

const DOWN_TRIANGLE = "▼";
const UP_TRIANGLE = "▲";
const HIGHER_TEXT = "plus élevé";
const lOWER_TEXT = "moins élevé";
const HIGHER_CLASS = "text-success";
const LOWER_CLASS = "text-danger";
let jsPDFloaded = false;

function getIdClone(id) {
    const clone = $(id).clone();
    clone.removeAttr('id');
    return clone;
}

function populateCommuneRowDOM(communeRow, statistics) {
    const {
        score_global,
        acces_information,
        acces_interface_numeriques,
        competences_administratives,
        competences_numeriques
    } = statistics;

    function cloneScoreDigitsDisplay() {
        return getIdClone('#score-digits-no-delta-prototype');
    }

    function setScoreDigitsText(scoreDigits, text) {
        scoreDigits.find('.score-digits-value').text(Math.round(text));
    }

    const cScoreGlobale = cloneScoreDigitsDisplay();
    const cAccesInformation = cloneScoreDigitsDisplay();
    const cAccesInterfaceNumeriques = cloneScoreDigitsDisplay();
    const cCompetenceAdministratives = cloneScoreDigitsDisplay();
    const cCompetenceNumeriques = cloneScoreDigitsDisplay();

    setScoreDigitsText(cScoreGlobale, score_global);
    setScoreDigitsText(cAccesInformation, acces_information);
    setScoreDigitsText(cAccesInterfaceNumeriques, acces_interface_numeriques);
    setScoreDigitsText(cCompetenceAdministratives, competences_administratives);
    setScoreDigitsText(cCompetenceNumeriques, competences_numeriques);

    [
        cScoreGlobale,
        cAccesInformation,
        cAccesInterfaceNumeriques,
        cCompetenceAdministratives,
        cCompetenceNumeriques
    ].forEach(cScoreDigit => {
        communeRow.append(cScoreDigit);
    });
}

function populateDeltaRowDOM(deltaRow, statistics, communeStatistics) {
    const {
        score_global,
        acces_information,
        acces_interface_numeriques,
        competences_administratives,
        competences_numeriques
    } = statistics;
    const {
        score_global: c_score_global,
        acces_information: c_acces_information,
        acces_interface_numeriques: c_acces_interface_numeriques,
        competences_administratives: c_competences_administratives,
        competences_numeriques: c_competences_numeriques
    } = communeStatistics;

    function cloneScoreDigitsDisplay() {
        return getIdClone('#score-digits-prototype');
    }

    function setScoreDigitsValue(scoreDigits, value, cValue) {
        const valueRounded = Math.round(value);
        const cValueRounded = Math.round(cValue);

        scoreDigits.find('.score-digits-value').text(valueRounded);

        const delta = valueRounded - cValueRounded;
        if (delta != 0) {
            const marker = delta < 0 ? DOWN_TRIANGLE : UP_TRIANGLE;
            const symbol = delta < 0 ? "-" : "+";
            scoreDigits.find('.score-digits-delta').text(`${symbol}${Math.abs(delta)}${marker}`);
        }
    }

    const scoreGlobale = cloneScoreDigitsDisplay();
    const accesInformation = cloneScoreDigitsDisplay();
    const accesInterfaceNumeriques = cloneScoreDigitsDisplay();
    const competenceAdministratives = cloneScoreDigitsDisplay();
    const competenceNumeriques = cloneScoreDigitsDisplay();

    setScoreDigitsValue(scoreGlobale, score_global, c_score_global);
    setScoreDigitsValue(accesInformation, acces_information, c_acces_information);
    setScoreDigitsValue(accesInterfaceNumeriques, acces_interface_numeriques, c_acces_interface_numeriques);
    setScoreDigitsValue(competenceAdministratives, competences_administratives, c_competences_administratives);
    setScoreDigitsValue(competenceNumeriques, competences_numeriques, c_competences_numeriques);

    [
        scoreGlobale,
        accesInformation,
        accesInterfaceNumeriques,
        competenceAdministratives,
        competenceNumeriques
    ].forEach(scoreDigit => {
        deltaRow.append(scoreDigit);
    });
}

function onSuggestionItemClick({ _id, commune_name, postal_code }) {
    const results = $('#results');
    const modal = new bootstrap.Modal(document.getElementById('search-dropdown'));
    modal.dispose();

    const spinner = getIdClone('#commune-spinner-prototype');
    spinner.find('h1.commune-name').text(commune_name);
    results.prepend(spinner);

    $('#search-input').val('');
    $('#suggestions').empty();

    fetch('/commune-report', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            id: _id
        })
    })
        .then(data => data.json())
        .then(data => {
            const copy = getIdClone('#commune-report-prototype');
            copy.find('h1.commune-name').text(data.commune_name);
            copy.find('.commune-details').text(`${data.postal_code} ${data.department_name}, ${data.region_name}`);

            const { commune, departement, region } = data.statistics;

            populateCommuneRowDOM(copy.find('.score-row-commune'), commune);
            populateDeltaRowDOM(copy.find('.score-row-departement'), departement, commune);
            populateDeltaRowDOM(copy.find('.score-row-region'), region, commune);

            function getConclusionTextForDelta(delta) {
                return delta < 0 ? lOWER_TEXT : HIGHER_TEXT;
            }

            function getSpanClassForDelta(delta) {
                return delta < 0 ? LOWER_CLASS : HIGHER_CLASS;
            }

            const deltaScoreGlobalDept = Math.round(commune.score_global - departement.score_global);
            const deltaScoreGlobalRegion = Math.round(commune.score_global - region.score_global);

            const conclusionDepartment = copy.find('.conclusion-departement');
            conclusionDepartment.text(getConclusionTextForDelta(deltaScoreGlobalDept));
            conclusionDepartment.addClass(getSpanClassForDelta(deltaScoreGlobalDept));

            const conclusionRegion = copy.find('.conclusion-region');
            conclusionRegion.text(getConclusionTextForDelta(deltaScoreGlobalRegion));
            conclusionRegion.addClass(getSpanClassForDelta(deltaScoreGlobalRegion));

            copy.find('.close-button').click(() => {
                copy.remove();
            });

            spinner.replaceWith(copy);
        });
}

function fetchSuggestions(inputText) {
    const suggestions = $('#suggestions');

    fetch(`/search?query=${inputText}`)
        .then(data => data.json())
        .then(data => {
            suggestions.empty();

            data.map((data) => {
                const { _id, commune_name, postal_code } = data;
                const copy = getIdClone("#suggestion-item-prototype");
                copy.find('h5.suggestion-item-commune-name').text(commune_name);
                copy.find('div.suggestion-item-post-code').text(postal_code);
                suggestions.append(copy);
                copy.click(() => onSuggestionItemClick(data));
            });
        });
}

function onSaveToPDFClick() {
    if (!jsPDFloaded) {
        getScript('')
    }
}