import { useState, useEffect } from 'react';
import { FiArrowDown } from 'react-icons/fi';

const skills = ['Python', 'TypeScript', 'React', 'MetaTrader 5', 'REST APIs', 'Tailwind CSS', 'Git', 'pandas'];

type HomeProps = {
  onViewProjects: () => void;
};

const Home = ({ onViewProjects }: HomeProps) => {
  const fullText = "Hi, I'm Neev Bakshi";
  const [displayedText, setDisplayedText] = useState('');
  const [done, setDone] = useState(false);

  useEffect(() => {
    let index = 0;
    setDisplayedText('');
    setDone(false);
    const interval = setInterval(() => {
      setDisplayedText(fullText.slice(0, index + 1));
      index++;
      if (index === fullText.length) {
        clearInterval(interval);
        setDone(true);
      }
    }, 60);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 dark:bg-gray-900 px-8 font-sans">
      <div className="max-w-2xl w-full flex flex-col items-center text-center gap-6">
        {/* Typewriter heading */}
        <h1 className="text-5xl font-bold text-indigo-500 min-h-[3.5rem]">
          {displayedText}
          <span className={`inline-block w-0.5 h-10 bg-indigo-500 ml-1 align-middle ${done ? 'opacity-0' : 'opacity-100'} transition-opacity duration-300`} />
        </h1>

        {/* Subtitle */}
        <p className="text-xl font-semibold text-gray-700 dark:text-gray-300 animate-fade-in-up" style={{ animationDelay: '1.2s' }}>
          Software Developer &amp; Automation Engineer
        </p>

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

        {/* CTA button */}
        <div className="animate-fade-in-up" style={{ animationDelay: '2.4s' }}>
          <button onClick={onViewProjects} className="btn-primary">
            View Projects <FiArrowDown />
          </button>
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
