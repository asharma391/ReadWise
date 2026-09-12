import forest from './forest.json';
import type { Passage } from '../types';
export const passages: Passage[] = [
  forest,
  {
    id: 'last-light',
    title: 'The Last Light',
    category: 'Adventure',
    level: 'Narrative',
    description:
      'A storm, a lighthouse, and an unexpected way to guide someone home.',
    paragraphs: [
      'By the time Mara reached the lighthouse, the storm had washed away the narrow path behind her. She had come to bring her grandfather his supper, but now she could see a fishing boat drifting toward the rocks. The lighthouse lamp was dark.',
      'Inside, her grandfather was trying to repair a broken wire. He pointed to a brass mirror on the wall and asked Mara to carry it upstairs. At first, she did not understand. Then she noticed the small emergency lantern beside the window.',
      'Mara held the mirror behind the lantern and turned it slowly toward the sea. The reflected light swept across the water. Once, twice, three times she repeated the movement. The fishing boat changed direction.',
      'When the main lamp finally flickered on, Mara set down the mirror. Her grandfather smiled. The supper was cold, but the boat was heading safely toward the harbour.',
    ],
    questions: [
      {
        id: 'light-1',
        prompt: 'Why did Mara originally go to the lighthouse?',
        options: [
          'To repair the lamp',
          'To bring her grandfather supper',
          'To watch the fishing boats',
          'To find a mirror',
        ],
        answer: 1,
        explanation:
          'The opening paragraph explains that Mara came to bring her grandfather supper.',
      },
      {
        id: 'light-2',
        prompt: 'What caused the immediate danger for the fishing boat?',
        options: [
          'It was drifting toward rocks without the lighthouse lamp',
          'It had run out of food',
          'It was already inside the harbour',
          'Its crew had dropped a mirror',
        ],
        answer: 0,
        explanation:
          'Mara sees the boat drifting toward the rocks while the lighthouse lamp is dark.',
      },
      {
        id: 'light-3',
        prompt: 'How did Mara use the mirror?',
        options: [
          'To repair the broken wire',
          'To signal her grandfather downstairs',
          'To reflect lantern light toward the sea',
          'To protect the window from rain',
        ],
        answer: 2,
        explanation:
          'She held the mirror behind the emergency lantern and swept reflected light across the water.',
      },
      {
        id: 'light-4',
        prompt: 'What does the final sentence suggest?',
        options: [
          'The supper mattered more than the boat',
          'The storm never arrived',
          'Mara regretted visiting',
          'Helping the boat mattered more than a warm meal',
        ],
        answer: 3,
        explanation:
          'The contrast between cold supper and a safe boat emphasizes what mattered most.',
      },
    ],
  },
  {
    id: 'seed-library',
    title: 'The Seed Library',
    category: 'Ideas',
    level: 'Informational',
    description:
      'Discover how a small shelf of seeds helps a neighbourhood grow together.',
    paragraphs: [
      'At the back of the community library, a wooden cabinet holds something different from books. Each drawer contains small envelopes of seeds. Visitors can take an envelope, plant the seeds at home, and return seeds from their harvest at the end of the season. Returning seeds is encouraged, but it is not required.',
      'The project began when a gardener named Sam noticed that neighbours often bought more seeds than they needed. Sharing the extras would reduce waste and make gardening easier to try. Sam asked the librarian for one shelf. Within a month, the shelf had become a cabinet.',
      'Every envelope carries the plant name, the date the seeds were collected, and a short note about growing conditions. These details help gardeners choose plants suited to their space. Volunteers also run workshops for beginners.',
      'The cabinet cannot guarantee that every seed will grow. Weather, soil, and care all make a difference. Its greatest success may be the conversations it starts between people who would otherwise never meet.',
    ],
    questions: [
      {
        id: 'seed-1',
        prompt: 'What is expected of people who borrow seeds?',
        options: [
          'They must pay for a workshop',
          'They are encouraged, but not required, to return seeds',
          'They must return the same envelope immediately',
          'They can only plant at the library',
        ],
        answer: 1,
        explanation:
          'The first paragraph explicitly says returning seeds is encouraged but not required.',
      },
      {
        id: 'seed-2',
        prompt: 'What inspired Sam to start the project?',
        options: [
          'The library had too many books',
          'Every neighbour was already an expert',
          'Neighbours often bought more seeds than they needed',
          'The cabinet was empty',
        ],
        answer: 2,
        explanation:
          'Sam noticed that sharing extra seeds could reduce waste and lower the barrier to gardening.',
      },
      {
        id: 'seed-3',
        prompt: 'Why are growing conditions written on the envelopes?',
        options: [
          'To help people choose plants suited to their space',
          'To guarantee every seed will grow',
          'To replace all workshops',
          'To track who borrowed each seed',
        ],
        answer: 0,
        explanation:
          'The labels provide practical information for choosing suitable plants.',
      },
      {
        id: 'seed-4',
        prompt: 'What is the main idea of the final paragraph?',
        options: [
          'Seed libraries always produce a large harvest',
          'The project should stop when seeds fail',
          'Weather is the only thing that matters',
          'The project creates community as well as sharing seeds',
        ],
        answer: 3,
        explanation:
          'The passage ends by emphasizing new conversations and connections, beyond successful plants.',
      },
    ],
  },
];
