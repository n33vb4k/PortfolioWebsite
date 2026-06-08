import { FiArrowDown } from 'react-icons/fi';
import BlurText from '../components/ui/BlurText';
import ShinyText from '../components/ui/ShinyText';
import Magnet from '../components/ui/Magnet';

const skills = [
  'Python', 'TypeScript', 'React', 'C#', 'Java',
  'PostgreSQL', 'Redis', 'n8n', 'Docker', 'Azure',
  'Git', 'REST APIs', 'LangChain', 'Tailwind CSS'
];

type HomeProps = {
  onViewProjects: () => void;
};

const Home = ({ onViewProjects }: HomeProps) => {
  return (
    <div className="min-h-screen relative flex flex-col items-center justify-center px-8 font-sans">

      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">

        {/* Heading with BlurText */}
        <BlurText
          text="Hi, I'm Neev Bakshi"
          className="text-5xl font-bold text-indigo-500 justify-center"
          animateBy="words"
          direction="top"
          delay={120}
          stepDuration={0.4}
        />

        {/* Subtitle with ShinyText */}
        <ShinyText
          text="Software Developer & Automation Engineer"
          className="text-xl font-semibold"
          color="#818cf8"
          shineColor="#e0e7ff"
          speed={3}
          delay={0.5}
        />

        {/* Bio */}
        <p className="text-base text-gray-600 dark:text-gray-400 leading-relaxed animate-fade-in-up" style={{ animationDelay: '1.5s' }}>
          I build automated trading systems, web apps, and data tools. Passionate about turning complex problems into clean, reliable software.
        </p>

        {/* Skills chips */}
        <div className="flex flex-wrap justify-center gap-2 animate-fade-in-up" style={{ animationDelay: '1.8s' }}>
          {skills.map((skill, i) => (
            <span
              key={skill}
              className="px-3 py-1 rounded-full text-sm font-medium bg-indigo-100 dark:bg-indigo-900 text-indigo-700 dark:text-indigo-300 animate-fade-in-up"
              style={{ animationDelay: `${1.8 + i * 0.07}s` }}
            >
              {skill}
            </span>
          ))}
        </div>

        {/* CTA button with Magnet */}
        <div className="animate-fade-in-up" style={{ animationDelay: '2.4s' }}>
          <Magnet padding={10} magnetStrength={5}>
            <button onClick={onViewProjects} className="btn-primary">
              View Projects <FiArrowDown />
            </button>
          </Magnet>
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="absolute bottom-8 flex flex-col items-center gap-1 text-gray-400 dark:text-gray-600 animate-bounce-slow">
        <FiArrowDown size={20} />
        <span className="text-xs">scroll</span>
      </div>
    </div>
  );
};

export default Home;
