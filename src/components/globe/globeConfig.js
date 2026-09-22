/*
 * globeConfig.js
 *
 * InteractiveGlobe.jsx için:
 * - GeoJSON kaynakları
 * - Country ID -> ISO3 eşleştirmesi
 * - GeoJSON feature -> ISO3 bulma
 * - Ülke adı bulma
 * - Kıtalara göre renk belirleme
 */

/* =========================================================
   GEOJSON SOURCES
========================================================= */

export const GEOJSON_SOURCES = [
  'https://cdn.jsdelivr.net/gh/nvkelso/natural-earth-vector@master/geojson/ne_110m_admin_0_countries.geojson',
  'https://raw.githubusercontent.com/nvkelso/natural-earth-vector/master/geojson/ne_110m_admin_0_countries.geojson',
];


/* =========================================================
   COUNTRY ID -> ISO3
========================================================= */

const COUNTRY_ID_TO_ISO3 = {
  turkey: 'TUR',
  turkiye: 'TUR',

  usa: 'USA',
  us: 'USA',
  unitedstates: 'USA',

  norway: 'NOR',

  iceland: 'ISL',

  sweden: 'SWE',

  denmark: 'DNK',

  finland: 'FIN',

  germany: 'DEU',

  uk: 'GBR',
  gb: 'GBR',
  unitedkingdom: 'GBR',

  canada: 'CAN',

  netherlands: 'NLD',
  holland: 'NLD',
};


/* =========================================================
   COUNTRY NAME -> ISO3
========================================================= */

const COUNTRY_NAME_TO_ISO3 = {
  turkey: 'TUR',
  türkiye: 'TUR',
  türkei: 'TUR',

  usa: 'USA',
  abd: 'USA',
  'united states': 'USA',
  'united states of america': 'USA',

  norway: 'NOR',
  norveç: 'NOR',
  norwegen: 'NOR',

  iceland: 'ISL',
  izlanda: 'ISL',
  island: 'ISL',

  sweden: 'SWE',
  isveç: 'SWE',
  schweden: 'SWE',

  denmark: 'DNK',
  danimarka: 'DNK',
  dänemark: 'DNK',

  finland: 'FIN',
  finlandiya: 'FIN',
  finnland: 'FIN',

  germany: 'DEU',
  almanya: 'DEU',
  deutschland: 'DEU',

  uk: 'GBR',
  'united kingdom': 'GBR',
  'birleşik krallık': 'GBR',
  'vereinigtes königreich': 'GBR',

  canada: 'CAN',
  kanada: 'CAN',

  netherlands: 'NLD',
  'the netherlands': 'NLD',
  hollanda: 'NLD',
  niederlande: 'NLD',
};


/* =========================================================
   STRING HELPERS
========================================================= */

const cleanString = (value) => {
  if (typeof value !== 'string') {
    return '';
  }

  return value.trim();
};


const normalizeLookupKey = (value) => {
  return cleanString(value)
    .toLocaleLowerCase('en-US')
    .replace(/[._-]+/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();
};


const normalizeCompactKey = (value) => {
  return normalizeLookupKey(value)
    .replace(/\s+/g, '');
};


const normalizeIso3 = (value) => {
  const iso = cleanString(value)
    .toUpperCase();

  if (
    !iso ||
    iso === '-99'
  ) {
    return '';
  }

  if (
    /^[A-Z]{3}$/.test(iso)
  ) {
    return iso;
  }

  return '';
};


/* =========================================================
   COUNTRY -> ISO3
========================================================= */

export const getCountryIso3 = (country) => {
  if (!country) {
    return '';
  }

  /*
   * Eğer ileride country objelerine direkt iso3
   * eklenirse öncelikle onu kullanır.
   */

  const explicitIso =
    normalizeIso3(
      country.iso3
    ) ||
    normalizeIso3(
      country.isoA3
    ) ||
    normalizeIso3(
      country.iso_a3
    ) ||
    normalizeIso3(
      country.code
    );

  if (explicitIso) {
    return explicitIso;
  }


  /*
   * Mevcut country.id değerlerinden ISO3 üret.
   */

  const idKey =
    normalizeCompactKey(
      country.id
    );

  if (
    idKey &&
    COUNTRY_ID_TO_ISO3[idKey]
  ) {
    return COUNTRY_ID_TO_ISO3[idKey];
  }


  /*
   * ID bulunamazsa ülke adına bak.
   */

  const nameKey =
    normalizeLookupKey(
      country.name
    );

  if (
    nameKey &&
    COUNTRY_NAME_TO_ISO3[nameKey]
  ) {
    return COUNTRY_NAME_TO_ISO3[
      nameKey
    ];
  }


  return '';
};


/* =========================================================
   GEOJSON FEATURE -> ISO3
========================================================= */

export const getFeatureIso3 = (feature) => {
  if (!feature) {
    return '';
  }

  const properties =
    feature.properties || {};


  /*
   * Natural Earth verisinin farklı sürümlerinde
   * ISO alanlarının isimleri değişebildiği için
   * birkaç olası alanı kontrol ediyoruz.
   */

  const candidates = [
    properties.ISO_A3_EH,
    properties.iso_a3_eh,

    properties.ISO_A3,
    properties.iso_a3,

    properties.ADM0_A3,
    properties.adm0_a3,

    properties.SOV_A3,
    properties.sov_a3,

    properties.GU_A3,
    properties.gu_a3,

    properties.SU_A3,
    properties.su_a3,

    properties.BRK_A3,
    properties.brk_a3,

    properties.WB_A3,
    properties.wb_a3,

    feature.id,
  ];


  for (
    const candidate of candidates
  ) {
    const iso =
      normalizeIso3(candidate);

    if (iso) {
      return iso;
    }
  }


  return '';
};


/* =========================================================
   FEATURE COUNTRY NAME
========================================================= */

export const getFeatureName = (feature) => {
  if (!feature) {
    return 'Unknown country';
  }

  const properties =
    feature.properties || {};


  const candidates = [
    properties.NAME_EN,
    properties.name_en,

    properties.NAME_LONG,
    properties.name_long,

    properties.ADMIN,
    properties.admin,

    properties.NAME,
    properties.name,

    properties.SOVEREIGNT,
    properties.sovereignt,

    properties.FORMAL_EN,
    properties.formal_en,
  ];


  for (
    const candidate of candidates
  ) {
    const name =
      cleanString(candidate);

    if (name) {
      return name;
    }
  }


  return 'Unknown country';
};


/* =========================================================
   CONTINENT COLORS
========================================================= */

const CONTINENT_COLORS = {
  Africa: '#18304f',

  Asia: '#23345f',

  Europe: '#17395c',

  'North America':
    '#203254',

  'South America':
    '#173c4c',

  Oceania: '#283052',

  Antarctica: '#334155',
};


const DEFAULT_CONTINENT_COLOR =
  '#16243d';


/* =========================================================
   FEATURE -> CONTINENT COLOR
========================================================= */

export const getContinentColor = (
  feature
) => {
  if (!feature) {
    return DEFAULT_CONTINENT_COLOR;
  }


  const properties =
    feature.properties || {};


  const continent =
    cleanString(
      properties.CONTINENT ??
        properties.continent
    );


  if (
    continent &&
    CONTINENT_COLORS[continent]
  ) {
    return CONTINENT_COLORS[
      continent
    ];
  }


  return DEFAULT_CONTINENT_COLOR;
};