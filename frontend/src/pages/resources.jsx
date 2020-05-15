import React from 'react';

import Container from '../components/Container';
import ResourceItem from '../components/ResourceItem';
import PlanLinkModal from '../components/PlanLinkModal';

const ResourcesPage = () => {
  const [curriculum] = React.useState({ name: 'Skriveprosjekt' });
  const [resources, setResources] = React.useState([]);
  const [aggregatedTags, setAggregatedTags] = React.useState(null);
  const [showPlanLinkModal, setShowPlanLinkModal] = React.useState(false);
  const [modalResourceItem, setModalResourceItem] = React.useState(null);

  React.useEffect(() => {
    setResources([
      {
        id: 'dd8129ee35e913ed1f008346',
        type: 'path',
        items: [
          {
            id: '34a8e181e3c4c328adec05c1',
            label: 'Filmanalyse i tre steg',
            tags: {
              subject: [
                {
                  id: '68aba6bbdf3507defda627b2',
                  label: 'Norsk',
                },
                {
                  id: '8180524703066bd02f160617',
                  label: 'Samfunnsfag',
                },
              ],
              type: [
                {
                  id: 'b00629af3d9d67f5f9ad1742',
                  label: 'Film og filmklipp',
                },
              ],
            },
          },
        ],
      },
      {
        id: '191b2ac6a1489761dd4f011c',
        type: 'resource',
        items: [
          {
            id: 'a38b0f4f8e0f755639042014',
            label: 'Kva og kvifor i filmanalysen',
            tags: {
              subject: [
                {
                  id: '40649424598387785552e0f8',
                  label: 'Norsk',
                },
              ],
            },
          },
        ],
      },
      {
        id: '48495af11b75890f1eea3fa0',
        type: 'tasks',
        items: [
          {
            id: 'ad716a84e1dabcd9ef52e7fe',
            label: 'Analyse av dramaserien Halvbroren del 1',
            tags: {
              subject: [
                {
                  id: 'e07adc85f6007b75ac29e89a',
                  label: 'Norsk',
                },
              ],
            },
          },
        ],
      },
    ]);
  }, []);

  React.useEffect(() => {
    if (resources.length) {
      const rTags = [].concat(
        ...resources.map((resource) => resource.items.map((item) => item.tags)),
      );

      const allTags = {};
      rTags.forEach((rTag) => {
        Object.entries(rTag).forEach(([key, tags]) => {
          allTags[key] = [...(allTags[key] || []), ...tags];
        });
      });

      Object.entries(allTags).forEach(([key, tags]) => {
        allTags[key] = tags.filter((tag, i, self) => (
          i === self.findIndex((t) => t.label === tag.label)
        ));
      });

      setAggregatedTags(allTags);
    }
  }, [resources]);

  const mountPlanLinkModal = (resourceId, resourceItemId) => {
    const resource = resources.find((r) => r.id === resourceId);
    const item = resource.items.find((i) => i.id === resourceItemId);
    setModalResourceItem({
      ...item,
      benchmarks: [
        {
          id: '885147432aa0a0f54cf6be44',
          text: 'utføre arbeidsoppgaver innen produksjon og høsting eller fangst',
        },
      ],
      coreElements: [
        {
          id: '0c1b734512aad27a6f49c429',
          name: 'Språklæring',
          description: 'Det finnes mange rare forestillinger om det kinesiske språket. På grunn av skrifttegnene tror mange at kineserne går rundt og snakker i bilder. Det er i og for seg riktig at kinesisk har et frodig bildespråk, men det skyldes ikke skrifttegnene, det skyldes lange og rike språktradisjoner.',
        },
        {
          id: 'a756da74ee01181c4335b71d',
          name: 'Muntlig kommunikasjon',
          description: 'Det finnes mange rare forestillinger om det kinesiske språket. På grunn av skrifttegnene tror mange at kineserne går rundt og snakker i bilder. Det er i og for seg riktig at kinesisk har et frodig bildespråk, men det skyldes ikke skrifttegnene, det skyldes lange og rike språktradisjoner.',
        },
      ],
      type: resource.type,
    });
    setShowPlanLinkModal(true);
  };

  return (
    <Container>
      <header>
        <p>
          {`Velkommen til dine ressurser fra NDLA for ${curriculum.name}.`}
          {aggregatedTags && ' Under finner du ressurser av type:'}
        </p>

        {aggregatedTags && (
          <ul>
            {Object.entries(aggregatedTags)?.map(([key, tags]) => (
              <li key={key}>
                <p>{key}</p>
                <ul>
                  {tags?.map((tag) => (
                    <li key={tag.id}>{tag.label}</li>
                  ))}
                </ul>
              </li>
            ))}
          </ul>
        )}
      </header>

      <main>
        <header>
          <p>Læringsressursar</p>
          <h1>Statistikk</h1>
        </header>

        {resources?.map((resource) => (
          <section key={resource.id}>
            <header>
              <h1>{resource.type}</h1>

              {Array.isArray(resource.items) && resource.items.map((item) => (
                <ResourceItem
                  key={item.id}
                  resourceGroup={resource.type}
                  title={item.label}
                  tags={item.tags}
                  shareable
                  showPlanLink={() => mountPlanLinkModal(resource.id, item.id)}
                />
              ))}

              {showPlanLinkModal && (
                <PlanLinkModal
                  resourceItem={modalResourceItem}
                  setShowModal={setShowPlanLinkModal}
                />
              )}
            </header>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default ResourcesPage;
