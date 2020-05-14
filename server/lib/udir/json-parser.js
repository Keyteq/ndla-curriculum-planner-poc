
const keyMapFromUdir = {
  versjon: 'version',
  navn: 'name',
  klasse_gruppe_informasjon: 'classGroupInfo',
  fradato: 'fromDate',
  tildato: 'toDate',
  spraak_kode: 'languagCode',
  aarstrinn_kode: 'gradeCode',
  laereplan_data_liste: 'curriculumList',
  laereplan_kode: 'curriculumCode',
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
  underveisvurdering_liste: 'assessmentList',
  laeringsressurser_liste: 'learningResourcesList',
  tittel: 'title',
  beskrivelse: 'description',
  laeringsarenaer_liste: 'learningArenasList',
  arbeidsaktiviteter_liste: 'tasksActivitiesList',
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

function getcurriculumList(data) {
  const { curriculumList } = transformUdir(data, keyMapFromUdir);
  return curriculumList;
}

function getCompetenceGoals(data) {
  const curriculumList = getcurriculumList(data);
  return curriculumList
    .map(({ competenceGoalList }) => competenceGoalList
      .map(({ competenceGoalCodeList }) => competenceGoalCodeList)
      .flat())
    .flat();
}

function getCoreElements(data) {
  const curriculumList = getcurriculumList(data);
  return curriculumList
    .map(({ coreElementCodeList }) => coreElementCodeList)
    .flat();
}

module.exports = {
  getCompetenceGoals,
  getCoreElements,
  transformUdir,
};
