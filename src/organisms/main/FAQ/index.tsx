import { AccordionComponent } from '@/atoms/Accordion';
import { CustomEndLine } from '@/atoms/endLine';
import { messages } from '@/constants/messages';
import styles from './styles.module.scss';

const accordionItems = [
  {
    question: 'How do I play Wizards Chess?',
    answer:
      "Start by creating a game. Enter your name and receive a unique game code by clicking the 'Generate new game code' button. Share this code with your opponent, who, by entering their name and the provided code, seamlessly joins the game. Wizards Chess provides an interactive multiplayer environment, allowing players to communicate through built-in audio and video features, enhancing the overall gaming immersion.",
  },
  {
    question: 'Is Wizards Chess suitable for children?',
    answer:
      "Absolutely! Wizards Chess is designed without violence, making it family-friendly. It's an ideal platform for children to learn chess. Additionally, kids can share the game with mentors, even those far away, and leverage video and audio capabilities for interactive communication during gameplay.",
  },
  {
    question: 'Can I play Wizards Chess on my mobile device?',
    answer:
      'Wizards Chess is a 3D multiplayer game, and while the pages are mobile friendly, playing in 3D mode on a mobile phone might be challenging due to the small screen size. However, a user-friendly 2D version is currently in development. Soon, mobile users will have the option to enjoy the game in 2D mode for an optimized experience on their phones.',
  },
  {
    question: 'What makes Wizards Chess unique in the Harry Potter universe?',
    answer: `Wizards Chess stands out by offering a 3D multiplayer chess experience featuring exact replicas of the iconic pieces from the movie "Harry Potter and the Sorcerer's Stone." What sets it apart is the integration of video and audio communication, making it a truly one-of-a-kind gaming adventure in the wizarding world.`,
  },
  {
    question: 'Is Wizards Chess free to play?',
    answer: `Yes, Wizards Chess is currently free to play. It's important to note that this status is subject to potential changes in the future, especially if Google decides to remove the free tier for Firebase services. As of now, users can enjoy the game at no cost.`,
  },
  {
    question: 'How can I report an issue or provide feedback?',
    answer: `Reporting issues or sharing feedback is simple! You can either message me directly on LinkedIn, Email or, for technical matters, create an issue on the GitHub repository. Your input is invaluable, and I'm here to ensure Wizards Chess continues to evolve based on your feedback.`,
  },
  {
    question: 'How long will my data be stored?',
    answer: `Your data, limited to your name, is only stored temporarily and will be promptly removed once both users exit the game inorder to prioritize data privacy and strive to keep your information secure.`,
  },
];

export const FAQ = () => {
  return (
    <div className={styles.intro__description}>
      <div className={styles.intro__content}>
        <h2 className={styles.intro__content__title}>{messages.faqTitle}</h2>
        <CustomEndLine />
        <AccordionComponent items={accordionItems} />
      </div>
    </div>
  );
};
