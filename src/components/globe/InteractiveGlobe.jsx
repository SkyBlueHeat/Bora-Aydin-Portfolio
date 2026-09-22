import React, {
  Suspense,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';

import * as THREE from 'three';

import {
  Canvas,
  useFrame,
  useThree,
} from '@react-three/fiber';

import {
  OrbitControls as ThreeOrbitControls,
} from 'three/examples/jsm/controls/OrbitControls.js';

import R3fGlobe from 'r3f-globe';

import {
  AnimatePresence,
  motion,
} from 'motion/react';

import {
  FaBriefcase,
  FaCheckCircle,
  FaCompass,
  FaGlobeAmericas,
  FaMapMarkerAlt,
  FaPlane,
  FaRoute,
  FaSatellite,
} from 'react-icons/fa';

import {
  GEOJSON_SOURCES,
  getContinentColor,
  getCountryIso3,
  getFeatureIso3,
  getFeatureName,
} from './globeConfig';

/* =========================================================
   LOCALIZED UI COPY
========================================================= */

const UI_COPY = {
  en: {
    loading: 'Building 3D world',
    loadingDetail:
      'Loading geographic boundaries and preparing the interactive scene…',
    unavailable: 'Country boundaries unavailable',
    unavailableDetail:
      'The 3D globe is still interactive. Country polygons could not be loaded from the map source.',
    drag: 'Drag to rotate',
    zoom: 'Scroll to zoom',
    select: 'Select a highlighted country',
    live: 'Interactive 3D',
    globalMobility: 'Global Mobility',
    professionalFocus: 'Professional Focus',
    mobility: 'Mobility',
    currentBase: 'Current Base',
    selected: 'Selected',
    countryExplorer: 'Country Explorer',
    mapSource: 'Natural Earth geometry',
    globeAria:
      'Interactive 3D globe showing countries of professional interest',
  },

  tr: {
    loading: '3D dünya hazırlanıyor',
    loadingDetail:
      'Ülke sınırları yükleniyor ve interaktif sahne hazırlanıyor…',
    unavailable:
      'Ülke sınırları yüklenemedi',
    unavailableDetail:
      '3D dünya kullanılabilir durumda. Harita kaynağından ülke polygonları alınamadı.',
    drag:
      'Döndürmek için sürükle',
    zoom:
      'Yakınlaştırmak için kaydır',
    select:
      'Vurgulanan bir ülke seç',
    live:
      'Interaktif 3D',
    globalMobility:
      'Global Mobilite',
    professionalFocus:
      'Profesyonel Odak',
    mobility:
      'Mobilite',
    currentBase:
      'Mevcut Konum',
    selected:
      'Seçili',
    countryExplorer:
      'Ülke Gezgini',
    mapSource:
      'Natural Earth geometrisi',
    globeAria:
      'Profesyonel ilgi duyulan ülkeleri gösteren interaktif 3D dünya',
  },

  de: {
    loading:
      '3D-Welt wird vorbereitet',
    loadingDetail:
      'Ländergrenzen werden geladen und die interaktive Szene wird vorbereitet…',
    unavailable:
      'Ländergrenzen nicht verfügbar',
    unavailableDetail:
      'Der 3D-Globus bleibt interaktiv. Die Länderpolygone konnten nicht geladen werden.',
    drag:
      'Zum Drehen ziehen',
    zoom:
      'Zum Zoomen scrollen',
    select:
      'Ein hervorgehobenes Land auswählen',
    live:
      'Interaktives 3D',
    globalMobility:
      'Globale Mobilität',
    professionalFocus:
      'Beruflicher Fokus',
    mobility:
      'Mobilität',
    currentBase:
      'Aktueller Standort',
    selected:
      'Ausgewählt',
    countryExplorer:
      'Länder-Explorer',
    mapSource:
      'Natural-Earth-Geometrie',
    globeAria:
      'Interaktiver 3D-Globus mit Ländern von beruflichem Interesse',
  },
};

/* =========================================================
   GEOJSON LOADER
========================================================= */

const useWorldGeoJson = () => {
  const [
    features,
    setFeatures,
  ] = useState([]);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState(null);

  useEffect(() => {
    const controller =
      new AbortController();

    let cancelled = false;

    const load = async () => {
      setLoading(true);
      setError(null);

      let lastError = null;

      for (
        const source
        of GEOJSON_SOURCES
      ) {
        try {
          const response =
            await fetch(
              source,
              {
                signal:
                  controller.signal,
                cache:
                  'force-cache',
              }
            );

          if (!response.ok) {
            throw new Error(
              `Map source returned ${response.status}`
            );
          }

          const json =
            await response.json();

          if (
            !json ||
            !Array.isArray(
              json.features
            )
          ) {
            throw new Error(
              'Invalid GeoJSON response'
            );
          }

          if (!cancelled) {
            setFeatures(
              json.features
            );

            setLoading(
              false
            );
          }

          return;
        } catch (
          loadError
        ) {
          if (
            loadError?.name ===
            'AbortError'
          ) {
            return;
          }

          lastError =
            loadError;
        }
      }

      if (!cancelled) {
        setError(
          lastError ||
            new Error(
              'Unable to load map geometry'
            )
        );

        setLoading(false);
      }
    };

    load();

    return () => {
      cancelled = true;

      controller.abort();
    };
  }, []);

  return {
    features,
    loading,
    error,
  };
};

/* =========================================================
   SCENE
========================================================= */

const GlobeScene = ({
  features,
  countries,
  activeCountry,
  hoveredCountryId,
  setHoveredCountryId,
  setHoveredFeatureName,
  onSelectCountry,
  reducedMotion,
  onReady,
  onInteractionChange,
}) => {
  const globeRef =
    useRef(null);

  const controlsRef =
    useRef(null);

  const flyTargetRef =
    useRef(null);

  const [
    globeReady,
    setGlobeReady,
  ] = useState(false);

  const [
    flying,
    setFlying,
  ] = useState(false);

  const {
    camera,
    gl,
    invalidate,
  } = useThree();

  /* =======================================================
     SAFE THREE.JS ORBIT CONTROLS
     ======================================================= */

  useEffect(() => {
    if (
      !camera ||
      !gl?.domElement
    ) {
      return undefined;
    }

    const controls =
      new ThreeOrbitControls(
        camera,
        gl.domElement
      );

    controls.enablePan =
      false;

    controls.enableZoom =
      true;

    controls.enableRotate =
      true;

    // Performance-first: disable damping so we do not need
    // a continuous render loop while the globe is idle.
    controls.enableDamping =
      false;

    controls.rotateSpeed =
      0.48;

    controls.zoomSpeed =
      0.72;

    controls.minDistance =
      240;

    controls.maxDistance =
      420;

    controls.autoRotate =
      false;

    controls.target.set(
      0,
      0,
      0
    );

    const handleStart =
      () => {
        onInteractionChange?.(
          true
        );
      };

    const handleEnd =
      () => {
        onInteractionChange?.(
          false
        );
      };

    const handleChange =
      () => {
        globeRef.current
          ?.setPointOfView?.(
            camera
          );

        invalidate();
      };

    controls.addEventListener(
      'start',
      handleStart
    );

    controls.addEventListener(
      'end',
      handleEnd
    );

    controls.addEventListener(
      'change',
      handleChange
    );

    controls.update();

    controlsRef.current =
      controls;

    return () => {
      controls.removeEventListener(
        'start',
        handleStart
      );

      controls.removeEventListener(
        'end',
        handleEnd
      );

      controls.removeEventListener(
        'change',
        handleChange
      );

      controls.dispose();

      if (
        controlsRef.current ===
        controls
      ) {
        controlsRef.current =
          null;
      }
    };
  }, [
    camera,
    gl,
    onInteractionChange,
    invalidate,
  ]);

  /* =======================================================
     COUNTRY DATA
     ======================================================= */

  const countriesByIso =
    useMemo(
      () =>
        new Map(
          countries.map(
            (
              country
            ) => [
              getCountryIso3(
                country
              ),
              country,
            ]
          )
        ),
      [
        countries,
      ]
    );

  const activeIso =
    getCountryIso3(
      activeCountry
    );

  const hoveredCountry =
    countries.find(
      (
        country
      ) =>
        country.id ===
        hoveredCountryId
    );

  const hoveredIso =
    getCountryIso3(
      hoveredCountry
    );

  /* =======================================================
     GLOBE MATERIAL
     ======================================================= */

  const globeMaterial =
    useMemo(
      () =>
        new THREE
          .MeshPhongMaterial(
            {
              color:
                '#07182f',

              emissive:
                '#020617',

              emissiveIntensity:
                0.62,

              shininess:
                32,

              specular:
                new THREE.Color(
                  '#38bdf8'
                ),

              transparent:
                true,

              opacity:
                0.985,
            }
          ),
      []
    );

  useEffect(
    () => () => {
      globeMaterial.dispose();
    },
    [
      globeMaterial,
    ]
  );

  /* =======================================================
     POINTS
     ======================================================= */

  const pointsData =
    useMemo(
      () =>
        countries.map(
          (
            country
          ) => ({
            ...country,

            lng:
              country.lon,

            color:
              country.id ===
              'turkey'
                ? '#22c55e'
                : country
                    .priority ===
                    'high'
                  ? '#a855f7'
                  : '#38bdf8',
          })
        ),
      [
        countries,
      ]
    );

  /* =======================================================
     LABELS
     ======================================================= */

  const labelsData =
    useMemo(
      () => {
        const important =
          countries.filter(
            (
              country
            ) =>
              country.id ===
                'turkey' ||
              country.id ===
                activeCountry
                  ?.id
          );

        return important.map(
          (
            country
          ) => ({
            ...country,

            lng:
              country.lon,

            text:
              country.id ===
              'turkey'
                ? `${country.name} · BASE`
                : country.name,
          })
        );
      },
      [
        countries,
        activeCountry,
      ]
    );

  /* =======================================================
     RINGS
     ======================================================= */

  const ringsData =
    useMemo(
      () =>
        countries
          .filter(
            (
              country
            ) =>
              country.id ===
                'turkey' ||
              country.id ===
                activeCountry
                  ?.id
          )
          .map(
            (
              country
            ) => ({
              ...country,

              lng:
                country.lon,
            })
          ),
      [
        countries,
        activeCountry,
      ]
    );

  /* =======================================================
     ROUTE ARC
     ======================================================= */

  const arcsData =
    useMemo(
      () => {
        const turkey =
          countries.find(
            (
              country
            ) =>
              country.id ===
              'turkey'
          );

        if (
          !turkey ||
          !activeCountry ||
          activeCountry
            .id ===
            'turkey'
        ) {
          return [];
        }

        return [
          {
            id:
              `${turkey.id}-${activeCountry.id}`,

            startLat:
              turkey.lat,

            startLng:
              turkey.lon,

            endLat:
              activeCountry
                .lat,

            endLng:
              activeCountry
                .lon,

            colors: [
              '#22c55e',
              '#38bdf8',

              activeCountry
                .id ===
                'norway'
                ? '#a855f7'
                : '#8b5cf6',
            ],
          },
        ];
      },
      [
        countries,
        activeCountry,
      ]
    );

  /* =======================================================
     COUNTRY FLY-TO
     ======================================================= */

  useEffect(() => {
    if (
      !globeReady ||
      !globeRef.current ||
      !activeCountry
    ) {
      return;
    }

    const position =
      globeRef.current
        .getCoords(
          activeCountry.lat,
          activeCountry.lon,
          2.45
        );

    flyTargetRef.current =
      new THREE.Vector3(
        position.x,
        position.y,
        position.z
      );

    setFlying(true);
    invalidate();

    if (
      controlsRef.current
    ) {
      controlsRef
        .current
        .enabled =
        false;
    }

    onInteractionChange?.(
      true
    );
  }, [
    globeReady,
    activeCountry,
    onInteractionChange,
    invalidate,
  ]);

  /* =======================================================
     FRAME LOOP
     ======================================================= */

  useFrame(() => {
    if (
      !flyTargetRef.current ||
      !flying
    ) {
      return;
    }

    camera.position.lerp(
      flyTargetRef.current,
      reducedMotion
        ? 1
        : 0.11
    );

    camera.lookAt(
      0,
      0,
      0
    );

    globeRef.current
      ?.setPointOfView?.(
        camera
      );

    const distance =
      camera.position
        .distanceTo(
          flyTargetRef.current
        );

    if (
      distance <
      0.45
    ) {
      camera.position.copy(
        flyTargetRef.current
      );

      flyTargetRef.current =
        null;

      setFlying(false);

      if (
        controlsRef.current
      ) {
        controlsRef
          .current
          .enabled =
          true;

        controlsRef
          .current
          .update();
      }

      onInteractionChange?.(
        false
      );

      invalidate();
      return;
    }

    // In demand mode, request only the next fly-to frame.
    invalidate();
  });

  /* =======================================================
     HOVER
     ======================================================= */

  const handleHover = (
    layer,
    elementData
  ) => {
    if (
      layer ===
        'polygons' &&
      elementData
    ) {
      const iso =
        getFeatureIso3(
          elementData
        );

      const country =
        countriesByIso.get(
          iso
        );

      setHoveredFeatureName(
        getFeatureName(
          elementData
        )
      );

      setHoveredCountryId(
        country?.id ||
          null
      );

      gl.domElement
        .style.cursor =
        country
          ? 'pointer'
          : 'grab';

      return;
    }

    if (
      layer ===
        'points' &&
      elementData?.id
    ) {
      setHoveredCountryId(
        elementData.id
      );

      setHoveredFeatureName(
        elementData.name
      );

      gl.domElement
        .style.cursor =
        'pointer';

      return;
    }

    setHoveredCountryId(
      null
    );

    setHoveredFeatureName(
      ''
    );

    gl.domElement
      .style.cursor =
      'grab';
  };

  /* =======================================================
     CLICK
     ======================================================= */

  const handleClick = (
    layer,
    elementData
  ) => {
    if (
      layer ===
        'points' &&
      elementData?.id
    ) {
      onSelectCountry(
        elementData
      );

      return;
    }

    if (
      layer ===
        'polygons' &&
      elementData
    ) {
      const iso =
        getFeatureIso3(
          elementData
        );

      const country =
        countriesByIso.get(
          iso
        );

      if (country) {
        onSelectCountry(
          country
        );
      }
    }
  };

  /* =======================================================
     THREE SCENE
     ======================================================= */

  return (
    <>
      <color
        attach="background"
        args={[
          '#020617',
        ]}
      />

      <fog
        attach="fog"
        args={[
          '#020617',
          310,
          620,
        ]}
      />

      <ambientLight
        intensity={
          0.72
        }
      />

      <directionalLight
        position={[
          180,
          150,
          220,
        ]}
        intensity={
          2.35
        }
        color="#ffffff"
      />

      <directionalLight
        position={[
          -170,
          -80,
          -160,
        ]}
        intensity={
          0.72
        }
        color="#4f46e5"
      />

      <pointLight
        position={[
          0,
          120,
          180,
        ]}
        intensity={
          1.2
        }
        color="#22d3ee"
      />
      <R3fGlobe
        ref={
          globeRef
        }

        polygonsData={
          features
        }

        polygonCapColor={(
          feature
        ) => {
          const iso =
            getFeatureIso3(
              feature
            );

          if (
            iso ===
            activeIso
          ) {
            return '#e0f2fe';
          }

          if (
            iso ===
            hoveredIso
          ) {
            return '#c4b5fd';
          }

          const interest =
            countriesByIso.has(
              iso
            );

          if (
            interest
          ) {
            const country =
              countriesByIso.get(
                iso
              );

            if (
              country?.id ===
              'turkey'
            ) {
              return '#34d399';
            }

            if (
              country?.priority ===
              'high'
            ) {
              return '#a78bfa';
            }

            return '#67e8f9';
          }

          return (
            getContinentColor(
              feature
            )
          );
        }}

        polygonSideColor={(
          feature
        ) => {
          const iso =
            getFeatureIso3(
              feature
            );

          return (
            countriesByIso.has(
              iso
            )
              ? 'rgba(255,255,255,0.24)'
              : 'rgba(2,6,23,0.45)'
          );
        }}

        polygonStrokeColor={(
          feature
        ) => {
          const iso =
            getFeatureIso3(
              feature
            );

          return (
            countriesByIso.has(
              iso
            )
              ? 'rgba(255,255,255,0.88)'
              : 'rgba(255,255,255,0.20)'
          );
        }}

        polygonAltitude={(
          feature
        ) => {
          const iso =
            getFeatureIso3(
              feature
            );

          if (
            iso ===
            activeIso
          ) {
            return 0.045;
          }

          if (
            iso ===
            hoveredIso
          ) {
            return 0.032;
          }

          if (
            countriesByIso.has(
              iso
            )
          ) {
            return 0.018;
          }

          return 0.007;
        }}

        polygonsTransitionDuration={0}

        pointsData={
          pointsData
        }

        pointLat="lat"

        pointLng="lng"

        pointColor="color"

        pointAltitude={(
          point
        ) =>
          point.id ===
          activeCountry
            ?.id
            ? 0.12
            : 0.065
        }

        pointRadius={(
          point
        ) =>
          point.id ===
          activeCountry
            ?.id
            ? 0.72
            : point.id ===
                'turkey'
              ? 0.62
              : 0.48
        }

        pointResolution={8}

        pointsTransitionDuration={0}

        ringsData={[]}

        ringLat="lat"

        ringLng="lng"

        ringColor={(
          ring
        ) =>
          ring.id ===
          'turkey'
            ? [
                '#22c55e',
                '#22c55e00',
              ]
            : [
                '#a855f7',
                '#38bdf800',
              ]
        }

        ringMaxRadius={
          4.4
        }

        ringPropagationSpeed={0}

        ringRepeatPeriod={0}

        arcsData={
          arcsData
        }

        arcStartLat="startLat"

        arcStartLng="startLng"

        arcEndLat="endLat"

        arcEndLng="endLng"

        arcColor="colors"

        arcAltitude={
          0.22
        }

        arcStroke={
          0.34
        }

        arcDashLength={
          0.42
        }

        arcDashGap={
          0.12
        }

        arcDashInitialGap={0}

        arcDashAnimateTime={0}

        arcsTransitionDuration={0}

        labelsData={
          labelsData
        }

        labelLat="lat"

        labelLng="lng"

        labelText="text"

        labelColor={(
          label
        ) =>
          label.id ===
          'turkey'
            ? '#86efac'
            : '#e0f2fe'
        }

        labelAltitude={
          0.08
        }

        labelSize={
          1.08
        }

        labelDotRadius={
          0.18
        }

        labelDotOrientation="bottom"

        labelsTransitionDuration={0}

        showGlobe

        showGraticules

        globeMaterial={
          globeMaterial
        }

        showAtmosphere

        atmosphereColor="#38bdf8"

        atmosphereAltitude={
          0.17
        }

        globeCurvatureResolution={10}

        onHover={
          handleHover
        }

        onClick={
          handleClick
        }

        onGlobeReady={() => {
          setGlobeReady(
            true
          );

          onReady?.();
        }}
      />
    </>
  );
};

/* =========================================================
   DETAIL CARD
========================================================= */

const CountryDetailCard = ({
  activeCountry,
  copy,
  reducedMotion,
}) => (
  <AnimatePresence
    mode="wait"
  >
    <motion.div
      key={
        activeCountry.id
      }

      initial={{
        opacity:
          0,

        y:
          reducedMotion
            ? 0
            : 18,

        scale:
          reducedMotion
            ? 1
            : 0.975,
      }}

      animate={{
        opacity:
          1,

        y:
          0,

        scale:
          1,
      }}

      exit={{
        opacity:
          0,

        y:
          reducedMotion
            ? 0
            : -12,

        scale:
          reducedMotion
            ? 1
            : 0.985,
      }}

      transition={{
        duration:
          reducedMotion
            ? 0
            : 0.34,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}

      className="
        relative
        overflow-hidden
        rounded-[1.85rem]
        border
        border-white/10
        bg-white/[0.055]
        p-6
        shadow-[0_14px_45px_rgba(0,0,0,0.24)]
        backdrop-blur-sm

        sm:p-7
      "
    >
      <div
        aria-hidden="true"
        className="
          pointer-events-none
          absolute
          -right-20
          -top-20
          h-56
          w-56
          rounded-full
          bg-cyan-400/10
          blur-[60px]
        "
      />

      <div
        className="
          relative
          z-10
        "
      >
        <div
          className="
            flex
            items-start
            justify-between
            gap-4
          "
        >
          <div>
            <div
              className="
                flex
                flex-wrap
                items-center
                gap-2
              "
            >
              <span
                className={`
                  h-2.5
                  w-2.5
                  rounded-full

                  ${
                    activeCountry
                      .id ===
                    'turkey'
                      ? 'bg-emerald-400'
                      : activeCountry
                            .priority ===
                          'high'
                        ? 'bg-violet-400'
                        : 'bg-cyan-400'
                  }
                `}
              />

              <span
                className="
                  text-[10px]
                  font-black
                  uppercase
                  tracking-[0.14em]
                  text-white/50
                "
              >
                {
                  activeCountry
                    .tag
                }
              </span>

              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-white/[0.05]
                  px-2
                  py-1
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.12em]
                  text-white/55
                "
              >
                {
                  copy.selected
                }
              </span>
            </div>

            <h4
              className="
                mt-2
                text-3xl
                font-black
                tracking-[-0.04em]
                text-white
              "
            >
              {
                activeCountry
                  .name
              }
            </h4>

            <p
              className="
                mt-1
                text-sm
                font-bold
                text-cyan-300
              "
            >
              {
                activeCountry
                  .short
              }
            </p>
          </div>

          <span
            className="
              flex
              h-12
              w-12
              flex-shrink-0
              items-center
              justify-center
              rounded-2xl
              border
              border-cyan-300/20
              bg-cyan-300/10
              text-cyan-300
              shadow-[0_0_30px_rgba(34,211,238,0.10)]
            "
          >
            <FaMapMarkerAlt
              size={
                17
              }
            />
          </span>
        </div>

        <p
          className="
            mt-5
            leading-relaxed
            text-slate-300
          "
        >
          {
            activeCountry
              .description
          }
        </p>

        <div
          className="
            mt-6
            grid
            gap-3

            sm:grid-cols-2
          "
        >
          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-black/10
              p-4
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-blue-400/10
                text-blue-300
              "
            >
              <FaBriefcase
                size={
                  13
                }
              />
            </span>

            <p
              className="
                mt-3
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-white/40
              "
            >
              {
                copy
                  .professionalFocus
              }
            </p>

            <p
              className="
                mt-1.5
                text-sm
                font-semibold
                leading-relaxed
                text-slate-200
              "
            >
              {
                activeCountry
                  .focus
              }
            </p>
          </div>

          <div
            className="
              rounded-2xl
              border
              border-white/[0.08]
              bg-black/10
              p-4
            "
          >
            <span
              className="
                flex
                h-9
                w-9
                items-center
                justify-center
                rounded-xl
                bg-emerald-400/10
                text-emerald-300
              "
            >
              <FaPlane
                size={
                  13
                }
              />
            </span>

            <p
              className="
                mt-3
                text-[9px]
                font-black
                uppercase
                tracking-[0.13em]
                text-white/40
              "
            >
              {
                copy
                  .mobility
              }
            </p>

            <p
              className="
                mt-1.5
                text-sm
                font-semibold
                leading-relaxed
                text-slate-200
              "
            >
              {
                activeCountry
                  .mobility
              }
            </p>
          </div>
        </div>

        {
          activeCountry
            .note &&
          (
            <div
              className="
                mt-4
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-violet-400/15
                bg-violet-400/[0.07]
                p-4
              "
            >
              <FaCheckCircle
                className="
                  mt-0.5
                  flex-shrink-0
                  text-violet-300
                "

                size={
                  13
                }
              />

              <p
                className="
                  text-sm
                  leading-relaxed
                  text-slate-300
                "
              >
                {
                  activeCountry
                    .note
                }
              </p>
            </div>
          )
        }
      </div>
    </motion.div>
  </AnimatePresence>
);

/* =========================================================
   MAIN INTERACTIVE GLOBE
========================================================= */

const InteractiveGlobe = ({
  countries,
  labels,
  language = 'en',
  reducedMotion,
}) => {
  const copy =
    UI_COPY[
      language
    ] ||
    UI_COPY.en;

  const {
    features,
    loading,
    error,
  } =
    useWorldGeoJson();

  const [
    activeId,
    setActiveId,
  ] =
    useState(
      'norway'
    );

  const [
    hoveredCountryId,
    setHoveredCountryId,
  ] =
    useState(
      null
    );

  const [
    hoveredFeatureName,
    setHoveredFeatureName,
  ] =
    useState(
      ''
    );

  const [
    globeReady,
    setGlobeReady,
  ] =
    useState(
      false
    );

  const [
    interacting,
    setInteracting,
  ] =
    useState(
      false
    );

  const tooltipRef =
    useRef(null);

  const activeCountry =
    countries.find(
      (
        country
      ) =>
        country.id ===
        activeId
    ) ||
    countries[0];

  const enhancedCountries =
    useMemo(
      () =>
        countries.map(
          (
            country
          ) => ({
            ...country,

            iso3:
              getCountryIso3(
                country
              ),
          })
        ),
      [
        countries,
      ]
    );

  const handleSelectCountry =
    (
      country
    ) => {
      if (
        !country?.id
      ) {
        return;
      }

      setActiveId(
        country.id
      );

      setHoveredCountryId(
        country.id
      );
    };

  const handlePointerMove =
    (
      event
    ) => {
      if (!tooltipRef.current) {
        return;
      }

      const rect =
        event
          .currentTarget
          .getBoundingClientRect();

      tooltipRef.current.style.left =
        `${event.clientX - rect.left + 16}px`;

      tooltipRef.current.style.top =
        `${event.clientY - rect.top + 16}px`;
    };

  return (
    <motion.div
      initial={{
        opacity:
          0,

        y:
          reducedMotion
            ? 0
            : 60,
      }}

      whileInView={{
        opacity:
          1,

        y:
          0,
      }}

      viewport={{
        once:
          true,

        amount:
          0.16,
      }}

      transition={{
        duration:
          reducedMotion
            ? 0
            : 1,

        ease: [
          0.16,
          1,
          0.3,
          1,
        ],
      }}

      className="
        relative
        mx-auto
        max-w-7xl
        [content-visibility:auto]
        [contain-intrinsic-size:900px]
      "
    >
      <div
        aria-hidden="true"
        className="
          absolute
          -inset-[1px]
          rounded-[2.65rem]
          bg-gradient-to-r
          from-blue-600
          via-cyan-400
          to-violet-600
          opacity-65
        "
      />

      <div
        className="
          relative
          overflow-hidden
          rounded-[2.6rem]
          bg-[#020617]
          shadow-[0_24px_70px_rgba(2,6,23,0.38)]
        "
      >
        <div
          aria-hidden="true"

          className="
            pointer-events-none
            absolute
            inset-0
            z-0
            opacity-50
          "

          style={{
            backgroundImage:
              'radial-gradient(circle at 16% 20%, rgba(59,130,246,0.18), transparent 30%), radial-gradient(circle at 84% 70%, rgba(139,92,246,0.16), transparent 30%)',
          }}
        />

        {/* =================================================
            TOP CONSOLE
        ================================================= */}

        <div
          className="
            relative
            z-30
            flex
            flex-col
            gap-3
            border-b
            border-white/[0.07]
            bg-white/[0.035]
            px-5
            py-4


            sm:flex-row
            sm:items-center
            sm:justify-between
            sm:px-7
          "
        >
          <div
            className="
              flex
              items-center
              gap-3
            "
          >
            <div
              aria-hidden="true"

              className="
                flex
                items-center
                gap-1.5
              "
            >
              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-red-400/90
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-amber-400/90
                "
              />

              <span
                className="
                  h-2.5
                  w-2.5
                  rounded-full
                  bg-emerald-400/90
                "
              />
            </div>

            <div
              className="
                flex
                items-center
                gap-2
                font-mono
                text-[10px]
                font-black
                uppercase
                tracking-[0.14em]
                text-white/50
              "
            >
              <FaSatellite
                className="
                  text-cyan-300
                "

                size={
                  11
                }
              />

              global-mobility.scene
            </div>
          </div>

          <div
            className="
              flex
              flex-wrap
              items-center
              gap-2
            "
          >
            <span
              className="
                inline-flex
                items-center
                gap-2
                rounded-full
                border
                border-emerald-300/15
                bg-emerald-300/[0.07]
                px-3
                py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.11em]
                text-emerald-300
              "
            >
              <span
                className="
                  relative
                  flex
                  h-1.5
                  w-1.5
                "
              >
<span
                  className="
                    relative
                    h-1.5
                    w-1.5
                    rounded-full
                    bg-emerald-300
                  "
                />
              </span>

              {
                copy.live
              }
            </span>

            <span
              className="
                rounded-full
                border
                border-white/[0.08]
                bg-white/[0.04]
                px-3
                py-1.5
                text-[9px]
                font-black
                uppercase
                tracking-[0.11em]
                text-white/45
              "
            >
              {
                enhancedCountries
                  .length
              }{' '}
              destinations
            </span>
          </div>
        </div>

        {/* =================================================
            MAIN GRID
        ================================================= */}

        <div
          className="
            relative
            z-10
            grid

            lg:grid-cols-[1.22fr_0.78fr]
          "
        >
          {/* ===============================================
              WEBGL GLOBE
          =============================================== */}

          <div
            className="
              relative
              h-[400px]
              overflow-hidden
              border-b
              border-white/[0.07]

              sm:h-[450px]

              lg:h-[520px]
              lg:border-b-0
              lg:border-r
            "

            onPointerMove={
              handlePointerMove
            }
          >
            <Canvas
              camera={{
                position: [
                  0,
                  0,
                  340,
                ],

                fov:
                  42,

                near:
                  0.1,

                far:
                  1200,
              }}

              frameloop="demand"

              dpr={1}

              gl={{
                antialias:
                  false,

                alpha:
                  true,

                powerPreference:
                  'high-performance',
              }}

              onCreated={({
                gl:
                  renderer,
              }) => {
                renderer
                  .outputColorSpace =
                  THREE
                    .SRGBColorSpace;

                renderer
                  .toneMapping =
                  THREE
                    .ACESFilmicToneMapping;

                renderer
                  .toneMappingExposure =
                  1.05;
              }}
            >
              <Suspense
                fallback={
                  null
                }
              >
                <GlobeScene
                  features={
                    features
                  }

                  countries={
                    enhancedCountries
                  }

                  activeCountry={
                    activeCountry
                  }

                  hoveredCountryId={
                    hoveredCountryId
                  }

                  setHoveredCountryId={
                    setHoveredCountryId
                  }

                  setHoveredFeatureName={
                    setHoveredFeatureName
                  }

                  onSelectCountry={
                    handleSelectCountry
                  }

                  reducedMotion={
                    reducedMotion
                  }

                  onReady={() => {
                    setGlobeReady(
                      true
                    );
                  }}

                  onInteractionChange={
                    setInteracting
                  }
                />
              </Suspense>
            </Canvas>

            {/* =============================================
                LOADING
            ============================================= */}

            <AnimatePresence>
              {
                (
                  loading ||
                  !globeReady
                ) &&
                !error &&
                (
                  <motion.div
                    initial={{
                      opacity:
                        1,
                    }}

                    exit={{
                      opacity:
                        0,
                    }}

                    className="
                      pointer-events-none
                      absolute
                      inset-0
                      z-30
                      flex
                      items-center
                      justify-center
                      bg-[#020617]/75

                    "
                  >
                    <div
                      className="
                        text-center
                      "
                    >
                      <div
                        className="
                          mx-auto
                          flex
                          h-14
                          animate-spin
                          w-14
                          items-center
                          justify-center
                          rounded-full
                          border
                          border-cyan-300/20
                          border-t-cyan-300
                          bg-cyan-300/[0.05]
                          text-cyan-300
                        "
                      >
                        <FaGlobeAmericas
                          size={
                            19
                          }
                        />
                      </div>

                      <p
                        className="
                          mt-4
                          text-sm
                          font-black
                          uppercase
                          tracking-[0.13em]
                          text-white
                        "
                      >
                        {
                          copy
                            .loading
                        }
                      </p>

                      <p
                        className="
                          mx-auto
                          mt-2
                          max-w-xs
                          px-4
                          text-xs
                          leading-relaxed
                          text-white/45
                        "
                      >
                        {
                          copy
                            .loadingDetail
                        }
                      </p>
                    </div>
                  </motion.div>
                )
              }
            </AnimatePresence>

            {/* =============================================
                LOAD ERROR
            ============================================= */}

            {
              error &&
              (
                <div
                  className="
                    pointer-events-none
                    absolute
                    left-4
                    right-4
                    top-4
                    z-40
                    rounded-2xl
                    border
                    border-amber-300/20
                    bg-amber-300/[0.08]
                    p-4
        

                    sm:left-6
                    sm:right-auto
                    sm:max-w-sm
                  "
                >
                  <p
                    className="
                      text-xs
                      font-black
                      uppercase
                      tracking-[0.1em]
                      text-amber-200
                    "
                  >
                    {
                      copy
                        .unavailable
                    }
                  </p>

                  <p
                    className="
                      mt-1
                      text-xs
                      leading-relaxed
                      text-white/55
                    "
                  >
                    {
                      copy
                        .unavailableDetail
                    }
                  </p>
                </div>
              )
            }

            {/* =============================================
                TOOLTIP
            ============================================= */}

            <AnimatePresence>
              {
                hoveredFeatureName &&
                !interacting &&
                (
                  <motion.div
                    key={
                      hoveredFeatureName
                    }

                    initial={{
                      opacity:
                        0,

                      scale:
                        0.94,

                      y:
                        4,
                    }}

                    animate={{
                      opacity:
                        1,

                      scale:
                        1,

                      y:
                        0,
                    }}

                    exit={{
                      opacity:
                        0,

                      scale:
                        0.96,
                    }}

                    transition={{
                      duration:
                        0.16,
                    }}

                    ref={
                      tooltipRef
                    }

                    className="
                      pointer-events-none
                      absolute
                      z-50
                      hidden
                      max-w-[210px]
                      rounded-xl
                      border
                      border-white/10
                      bg-gray-950/90
                      px-3
                      py-2
                      text-xs
                      font-bold
                      text-white
                      shadow-2xl
          

                      md:block
                    "
                  >
                    {
                      hoveredFeatureName
                    }
                  </motion.div>
                )
              }
            </AnimatePresence>

            {/* =============================================
                CONTROLS HELP
            ============================================= */}

            <div
              className="
                pointer-events-none
                absolute
                bottom-4
                left-1/2
                z-40
                flex
                -translate-x-1/2
                flex-wrap
                items-center
                justify-center
                gap-2
              "
            >
              <span
                className="
                  rounded-full
                  border
                  border-white/10
                  bg-gray-950/65
                  px-3
                  py-1.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.11em]
                  text-white/70
      
                "
              >
                ↔{' '}
                {
                  copy.drag
                }
              </span>

              <span
                className="
                  hidden
                  rounded-full
                  border
                  border-white/10
                  bg-gray-950/65
                  px-3
                  py-1.5
                  text-[8px]
                  font-black
                  uppercase
                  tracking-[0.11em]
                  text-white/70
      

                  sm:inline-flex
                "
              >
                ↕{' '}
                {
                  copy.zoom
                }
              </span>
            </div>

            {/* Lightweight decorative orbit */}

            <div
              aria-hidden="true"

              className="
                pointer-events-none
                absolute
                left-1/2
                top-1/2
                z-0
                h-[82%]
                w-[82%]
                -translate-x-1/2
                -translate-y-1/2
                rounded-full
                border
                border-dashed
                border-cyan-300/[0.05]
              "
            />
          </div>

          {/* ===============================================
              COUNTRY EXPLORER
          =============================================== */}

          <div
            className="
              relative
              flex
              min-h-[480px]
              flex-col
              p-5

              sm:p-6

              lg:min-h-[520px]
              lg:p-7
            "
          >
            <div
              aria-hidden="true"

              className="
                pointer-events-none
                absolute
                -right-24
                top-1/4
                h-72
                w-72
                rounded-full
                bg-violet-500/10
                blur-[70px]
              "
            />

            <div
              className="
                relative
                z-10
              "
            >
              <div
                className="
                  mb-4
                  inline-flex
                  items-center
                  gap-2
                  rounded-full
                  border
                  border-cyan-300/15
                  bg-cyan-300/[0.07]
                  px-3
                  py-1.5
                  text-[9px]
                  font-black
                  uppercase
                  tracking-[0.13em]
                  text-cyan-300
                "
              >
                <FaCompass
                  size={
                    10
                  }
                />

                {
                  copy
                    .countryExplorer
                }
              </div>

              <h3
                className="
                  text-3xl
                  font-black
                  tracking-[-0.045em]
                  text-white

                  sm:text-4xl
                "
              >
                {
                  labels
                    .worldTitle
                }
              </h3>

              <p
                className="
                  mt-3
                  leading-relaxed
                  text-slate-400
                "
              >
                {
                  labels
                    .worldText
                }
              </p>

              <div
                className="
                  mt-6
                  flex
                  flex-wrap
                  gap-2
                "
              >
                {
                  enhancedCountries
                    .map(
                      (
                        country,
                        index
                      ) => (
                        <motion.button
                          key={
                            country.id
                          }

                          type="button"

                          onClick={() =>
                            handleSelectCountry(
                              country
                            )
                          }

                          initial={{
                            opacity:
                              0,

                            y:
                              reducedMotion
                                ? 0
                                : 10,
                          }}

                          whileInView={{
                            opacity:
                              1,

                            y:
                              0,
                          }}

                          viewport={{
                            once:
                              true,
                          }}

                          transition={{
                            delay:
                              reducedMotion
                                ? 0
                                : index *
                                  0.025,
                          }}

                          whileHover={
                            reducedMotion
                              ? undefined
                              : {
                                  y:
                                    -2,
                                }
                          }

                          whileTap={{
                            scale:
                              0.96,
                          }}

                          className={`
                            rounded-full
                            border
                            px-3
                            py-1.5
                            text-[11px]
                            font-bold
                            transition-all
                            duration-300

                            ${
                              activeId ===
                              country.id
                                ? 'border-cyan-300/35 bg-cyan-300/10 text-cyan-200 shadow-[0_0_24px_rgba(34,211,238,0.08)]'
                                : 'border-white/[0.08] bg-white/[0.035] text-slate-400 hover:border-white/15 hover:text-white'
                            }
                          `}
                        >
                          {
                            country
                              .name
                          }
                        </motion.button>
                      )
                    )
                }
              </div>
            </div>

            <div
              className="
                relative
                z-10
                mt-7
                flex-1
              "
            >
              <CountryDetailCard
                activeCountry={
                  activeCountry
                }

                copy={{
                  ...copy,

                  professionalFocus:
                    labels
                      .professionalFocus,

                  mobility:
                    labels
                      .mobility,
                }}

                reducedMotion={
                  reducedMotion
                }
              />
            </div>

            <div
              className="
                relative
                z-10
                mt-5
                flex
                items-start
                gap-3
                rounded-2xl
                border
                border-white/[0.07]
                bg-white/[0.025]
                p-4
              "
            >
              <FaRoute
                className="
                  mt-0.5
                  flex-shrink-0
                  text-cyan-300
                "

                size={
                  12
                }
              />

              <div>
                <p
                  className="
                    text-xs
                    leading-relaxed
                    text-slate-400
                  "
                >
                  {
                    labels
                      .mobilityNote
                  }
                </p>

                <p
                  className="
                    mt-2
                    text-[9px]
                    font-black
                    uppercase
                    tracking-[0.1em]
                    text-white/25
                  "
                >
                  {
                    copy
                      .mapSource
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default InteractiveGlobe;