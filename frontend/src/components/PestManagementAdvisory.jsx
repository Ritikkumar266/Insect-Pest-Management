import React from 'react';

const PestManagementAdvisory = ({ pest, confidence }) => {
  // Enhanced pest data with detailed management information
  const getDetailedManagement = (pestName) => {
    const managementData = {
      'Colorado Potato Beetle': {
        lifeCycle: 'Complete metamorphosis: egg → larva → pupa → adult. 2-3 generations per year.',
        damageSymptoms: [
          'Leaf holes and defoliation',
          'Yellowing of leaves',
          'Reduced plant vigor',
          'Decreased tuber yield',
          'Skeletonized leaves'
        ],
        culturalControl: [
          'Crop rotation with non-solanaceous crops',
          'Deep plowing to bury overwintering adults',
          'Remove crop debris after harvest',
          'Plant resistant potato varieties',
          'Maintain field sanitation'
        ],
        mechanicalControl: [
          'Hand picking of adults and larvae',
          'Use of row covers during early season',
          'Flame cultivation for small infestations',
          'Vacuum collection of adults',
          'Trenching around fields'
        ],
        biologicalControl: [
          'Release predatory beetles (Lebia grandis)',
          'Encourage natural enemies like spiders',
          'Apply Bacillus thuringiensis (Bt)',
          'Use entomopathogenic nematodes',
          'Neem oil applications'
        ],
        chemicalControl: [
          'Imidacloprid (soil application)',
          'Spinosad (foliar spray)',
          'Chlorantraniliprole',
          'Thiamethoxam',
          '⚠️ Always follow label instructions and safety precautions'
        ]
      },
      'Aphids': {
        lifeCycle: 'Incomplete metamorphosis: egg → nymph → adult. Multiple generations per year.',
        damageSymptoms: [
          'Yellowing and curling of leaves',
          'Stunted plant growth',
          'Honeydew secretion leading to sooty mold',
          'Virus transmission',
          'Wilting of young shoots'
        ],
        culturalControl: [
          'Remove weeds that harbor aphids',
          'Use reflective mulches',
          'Avoid excessive nitrogen fertilization',
          'Plant trap crops like mustard',
          'Maintain proper plant spacing'
        ],
        mechanicalControl: [
          'Water spray to dislodge aphids',
          'Yellow sticky traps',
          'Aluminum foil mulch',
          'Hand removal of infested parts',
          'Pruning heavily infested shoots'
        ],
        biologicalControl: [
          'Release ladybird beetles',
          'Encourage lacewings and parasitic wasps',
          'Apply neem oil',
          'Use insecticidal soap',
          'Release Aphidius parasitoids'
        ],
        chemicalControl: [
          'Imidacloprid (systemic)',
          'Acetamiprid',
          'Pymetrozine',
          'Spirotetramat',
          '⚠️ Rotate insecticides to prevent resistance'
        ]
      },
      'Armyworm': {
        lifeCycle: 'Complete metamorphosis: egg → larva → pupa → adult. 3-4 generations per year.',
        damageSymptoms: [
          'Defoliation of leaves',
          'Cut stems at soil level',
          'Feeding on growing points',
          'Reduced plant stand',
          'Ragged leaf edges'
        ],
        culturalControl: [
          'Deep plowing to expose pupae',
          'Crop rotation with legumes',
          'Remove grassy weeds',
          'Maintain field bunds',
          'Early planting to avoid peak infestation'
        ],
        mechanicalControl: [
          'Light traps for adult moths',
          'Pheromone traps',
          'Hand picking of larvae',
          'Flooding of fields',
          'Collection and destruction of egg masses'
        ],
        biologicalControl: [
          'Release Trichogramma egg parasitoids',
          'Apply Bacillus thuringiensis',
          'Use nuclear polyhedrosis virus',
          'Encourage birds and spiders',
          'Neem-based biopesticides'
        ],
        chemicalControl: [
          'Chlorantraniliprole',
          'Spinetoram',
          'Emamectin benzoate',
          'Flubendiamide',
          '⚠️ Apply during early larval stages for best results'
        ]
      }
    };

    // Return specific data or default generic data
    return managementData[pestName] || {
      lifeCycle: 'Varies by species. Consult local agricultural extension for specific information.',
      damageSymptoms: [
        'Visible damage to plant parts',
        'Reduced plant vigor',
        'Potential yield loss',
        'Secondary infections possible'
      ],
      culturalControl: [
        'Maintain field sanitation',
        'Practice crop rotation',
        'Remove plant debris',
        'Monitor regularly'
      ],
      mechanicalControl: [
        'Physical removal when possible',
        'Use of traps',
        'Barrier methods',
        'Manual collection'
      ],
      biologicalControl: [
        'Encourage natural enemies',
        'Use biopesticides like neem',
        'Apply beneficial microorganisms',
        'Maintain biodiversity'
      ],
      chemicalControl: [
        'Consult local agricultural extension',
        'Use registered pesticides only',
        'Follow label instructions',
        '⚠️ Always prioritize safety and environmental protection'
      ]
    };
  };

  const managementInfo = getDetailedManagement(pest.name);

  return (
    <div className="bg-gradient-to-br from-green-50 to-blue-50 border-2 border-green-500 rounded-xl p-8 mb-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center">
          <div className="bg-green-600 text-white p-3 rounded-full mr-4">
            <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <div>
            <h2 className="text-3xl font-bold text-green-800">Pest Management Advisory</h2>
            <p className="text-green-600">Comprehensive control strategies</p>
          </div>
        </div>
        <span className="bg-green-600 text-white px-6 py-3 rounded-full font-bold text-lg">
          {confidence.toFixed(1)}% Match
        </span>
      </div>

      {/* Pest Information Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-blue-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">🔹 Pest Information</h3>
          </div>
          <div className="space-y-3">
            <div>
              <span className="font-semibold text-gray-700">Pest Name:</span>
              <p className="text-lg text-gray-800">{pest.name}</p>
            </div>
            {pest.scientificName && (
              <div>
                <span className="font-semibold text-gray-700">Scientific Name:</span>
                <p className="text-lg italic text-gray-600">{pest.scientificName}</p>
              </div>
            )}
            <div>
              <span className="font-semibold text-gray-700">Life Cycle:</span>
              <p className="text-gray-800">{managementInfo.lifeCycle}</p>
            </div>
            {pest.affectedCrops && pest.affectedCrops.length > 0 && (
              <div>
                <span className="font-semibold text-gray-700">Affected Crops:</span>
                <div className="flex flex-wrap gap-2 mt-2">
                  {pest.affectedCrops.map((crop) => (
                    <span key={crop._id} className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-sm">
                      {crop.name}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Damage Symptoms */}
        <div className="bg-white rounded-lg p-6 shadow-md">
          <div className="flex items-center mb-4">
            <div className="bg-red-100 p-2 rounded-lg mr-3">
              <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
              </svg>
            </div>
            <h3 className="text-xl font-bold text-gray-800">🔹 Damage Symptoms</h3>
          </div>
          <ul className="space-y-2">
            {managementInfo.damageSymptoms.map((symptom, idx) => (
              <li key={idx} className="flex items-start">
                <span className="text-red-500 mr-2 mt-1">•</span>
                <span className="text-gray-700">{symptom}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>

      {/* Control Measures */}
      <div className="bg-white rounded-lg p-6 shadow-md">
        <div className="flex items-center mb-6">
          <div className="bg-green-100 p-2 rounded-lg mr-3">
            <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
            </svg>
          </div>
          <h3 className="text-2xl font-bold text-gray-800">🔹 Control Measures</h3>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Cultural Control */}
          <div className="border border-green-200 rounded-lg p-5">
            <h4 className="text-lg font-bold text-green-700 mb-3 flex items-center">
              <span className="bg-green-100 p-1 rounded mr-2">🌱</span>
              Cultural Control
            </h4>
            <ul className="space-y-2">
              {managementInfo.culturalControl.map((method, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-green-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Mechanical Control */}
          <div className="border border-blue-200 rounded-lg p-5">
            <h4 className="text-lg font-bold text-blue-700 mb-3 flex items-center">
              <span className="bg-blue-100 p-1 rounded mr-2">🔧</span>
              Mechanical Control
            </h4>
            <ul className="space-y-2">
              {managementInfo.mechanicalControl.map((method, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-blue-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Biological Control */}
          <div className="border border-purple-200 rounded-lg p-5">
            <h4 className="text-lg font-bold text-purple-700 mb-3 flex items-center">
              <span className="bg-purple-100 p-1 rounded mr-2">🦋</span>
              Biological Control
            </h4>
            <ul className="space-y-2">
              {managementInfo.biologicalControl.map((method, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className="text-purple-500 mr-2 mt-1">✓</span>
                  <span className="text-gray-700">{method}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Chemical Control */}
          <div className="border border-orange-200 rounded-lg p-5">
            <h4 className="text-lg font-bold text-orange-700 mb-3 flex items-center">
              <span className="bg-orange-100 p-1 rounded mr-2">⚗️</span>
              Chemical Control
            </h4>
            <ul className="space-y-2">
              {managementInfo.chemicalControl.map((method, idx) => (
                <li key={idx} className="flex items-start text-sm">
                  <span className={`mr-2 mt-1 ${method.includes('⚠️') ? 'text-red-500' : 'text-orange-500'}`}>
                    {method.includes('⚠️') ? '⚠️' : '✓'}
                  </span>
                  <span className={`${method.includes('⚠️') ? 'text-red-700 font-semibold' : 'text-gray-700'}`}>
                    {method}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Safety Warning */}
        <div className="mt-6 bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-6 h-6 text-red-600 mr-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
            <div>
              <h5 className="font-bold text-red-800">Important Safety Notice</h5>
              <p className="text-red-700 text-sm">Always read and follow pesticide labels. Use protective equipment. Consult local agricultural extension services for region-specific recommendations.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PestManagementAdvisory;