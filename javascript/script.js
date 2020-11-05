const DOWN_TRIANGLE = "▼";
const UP_TRIANGLE = "▲";
const HIGHER_TEXT = "plus élevé";
const lOWER_TEXT = "moins élevé";
const HIGHER_CLASS = "text-success";
const LOWER_CLASS = "text-danger";

const suggestions = $('#suggestions');

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
    suggestions.empty();

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
                return deltaScoreGlobalDept < 0 ? lOWER_TEXT : HIGHER_TEXT;
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

$(() => {
    $('#search-input').on('input', () => {
        const inputText = $('#search-input').val();
        fetchSuggestions(inputText);
    });
});


