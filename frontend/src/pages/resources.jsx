import React from 'react';

import Container from '../components/Container';
import ResourceItem from '../components/ResourceItem';


const ResourcesPage = () => {
  const [resources, setResources] = React.useState([]);

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

  return (
    <Container>
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
                />
              ))}
            </header>
          </section>
        ))}
      </main>
    </Container>
  );
};

export default ResourcesPage;
