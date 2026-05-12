import ProgressBar from '../ui/ProgressBar';

export default function RabbitLevel({ balance }) {
  let level = 'Baby Rabbit';
  let progress = 20;

  if (balance > 10000000) {
    level = 'Normal Rabbit';
    progress = 50;
  }

  if (balance > 30000000) {
    level = 'Big Rabbit';
    progress = 80;
  }

  if (balance > 50000000) {
    level = 'Super Rich Rabbit';
    progress = 100;
  }

  return (
    <div className="w-full max-w-md mt-6 bg-[#1E1E1E] rounded-2xl p-5">
      <h3 className="text-xl font-bold text-[#00E5FF]">{level}</h3>
      <ProgressBar value={progress} />
    </div>
  );
}
