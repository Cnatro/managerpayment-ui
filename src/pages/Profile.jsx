import { useEffect, useState } from 'react';

import AchievementSection from '../components/profile/AchievementSection';
import ActivityTimeline from '../components/profile/ActivityTimeline';
import FloatingBackground from '../components/profile/FloatingBackground';
import GoalSection from '../components/profile/GoalSection';
import MoodSection from '../components/profile/MoodSection';
import ProfileHero from '../components/profile/ProfileHero';
import ProfileStats from '../components/profile/ProfileStats';
import RabbitStatusCard from '../components/profile/RabbitStatusCard';
import { apiAuth } from '../services/api';

export default function Profile() {
  const [profileData, setProfileData] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    try {
      const res = await apiAuth.profile();

      setProfileData(res.data.data);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-white text-xl">
        Đang đánh thức thỏ của bạn... 🐰
      </div>
    );
  }

  if (!profileData) {
    return (
      <div className="min-h-screen bg-[#0F172A] flex items-center justify-center text-red-400">
        Không thể tải hồ sơ người dùng
      </div>
    );
  }

  return (
    <div className="min-h-screen relative overflow-hidden bg-gradient-to-br from-[#0F172A] via-[#1E1B4B] to-[#312E81] text-white p-6">
      <FloatingBackground />

      <div className="relative z-10 space-y-8">
        <ProfileHero
          user={profileData.user}
          rabbit={profileData.rabbit}
          financialStats={profileData.financialStats}
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <ProfileStats
            financialStats={profileData.financialStats}
            streak={profileData.streak}
          />

          <RabbitStatusCard rabbit={profileData.rabbit} />

          <MoodSection rabbit={profileData.rabbit} />
        </div>

        <AchievementSection achievements={profileData.achievements} />

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ActivityTimeline activities={profileData.recentActivities} />

          <GoalSection goals={profileData.goals} />
        </div>
      </div>
    </div>
  );
}
