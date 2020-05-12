
const keyMapFromUdir = {
  versjon: 'version',
  navn: 'name',
  klasse_gruppe_informasjon: 'classGroupeInfo',
  fradato: 'fromDate',
  tildato: 'toDate',
  spraak_kode: 'languagCode',
  aarstrinn_kode: 'yearLevelCode',
  laereplan_data_liste: 'learnPlanList',
  laereplan_kode: 'learnPlanCode',
  kompetansemaalsett_data_liste: 'competenceGoalList',
  kompetansemaalsett_kode: 'competenceGoalCode',
  kompetansemaal_kode_liste: 'competenceGoalCodeList',
  kjerneelement_kode_liste: 'coreElementCodeList',
  tverrfagligtema_kode_liste: 'interdisciplinaryCodeList',
  grunnleggendeferdighet_kode_liste: 'basicSkillCodeList',
  evaluering_nivaa: 'evaluationLevel',
  evaluering_beskrivelse: 'evaluationDescription',
  hvorfor_beskrivelse: 'whyDescription',
  kompetanse_beskrivelse: 'competenceDescription',
  underveisvurdering_liste: 'routeAssessmentList',
  laeringsressurser_liste: 'learningResourcesList',
  tittel: 'title',
  beskrivelse: 'description',
  laeringsarenaer_liste: 'learningArenasList',
  arbeidsaktiviteter_liste: 'workActivitiesList',
};

function transformUdir(data, keyMap = keyMapFromUdir) {
  const entries = Object.entries(data);
  const root = entries.map(([keyRaw, valRaw]) => {
    const key = keyMap[keyRaw] || keyRaw;
    let value = valRaw;
    if (valRaw && valRaw.toString() === '[object Object]') {
      value = transformUdir(valRaw);
    }
    if (valRaw && Array.isArray(valRaw) && valRaw.length > 0) {
      value = valRaw.map((item) => {
        if (item && item.toString() === '[object Object]') {
          return transformUdir(item);
        }
        return item;
      });
    }
    return [key, value];
  });
  return Object.fromEntries(root);
}

function getLearnPlanList(data) {
  const { learnPlanList } = transformUdir(data, keyMapFromUdir);
  return learnPlanList;
}

function getCompetenceGoals(data) {
  const learnPlanList = getLearnPlanList(data);
  return learnPlanList
    .map(({ competenceGoalList }) => competenceGoalList
      .map(({ competenceGoalCodeList }) => competenceGoalCodeList)
      .flat())
    .flat();
}

function getCoreElements(data) {
  const learnPlanList = getLearnPlanList(data);
  return learnPlanList
    .map(({ coreElementCodeList }) => coreElementCodeList)
    .flat();
}

module.exports = {
  getCompetenceGoals,
  getCoreElements,
  transformUdir,
};
